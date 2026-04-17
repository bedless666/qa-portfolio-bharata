const { google } = require('googleapis');
const axios = require('axios');
const config = require('./config');

// Google Sheets API setup
const sheets = google.sheets('v4');

async function getSheetData() {
  const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json', // Download from Google Cloud Console
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const authClient = await auth.getClient();
  
  // Find header row "RN Live Regression QA"
  const findResult = await sheets.spreadsheets.values.get({
    auth: authClient,
    spreadsheetId: config.SPREADSHEET_ID,
    range: `${config.SHEET_NAME}!A1:F100`,
  });
  
  const rows = findResult.data.values || [];
  let startRow = 0;
  
  // Find the header row
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] && rows[i][0] && rows[i][0].includes('RN Live Regression QA')) {
      startRow = i + 3; // +3 to skip header and get to data
      break;
    }
  }
  
  if (startRow === 0) {
    throw new Error('Schedule header not found');
  }
  
  // Get all data from startRow to end
  const dataResult = await sheets.spreadsheets.values.get({
    auth: authClient,
    spreadsheetId: config.SPREADSHEET_ID,
    range: `${config.SHEET_NAME}!A${startRow + 1}:F1000`,
  });
  
  return dataResult.data.values || [];
}

function validateAndProcessData(data) {
  const validSchedule = [];
  const allQAEmails = new Set();
  
  data.forEach((row, index) => {
    const [week, month, version, subteam, assignedQA, status] = row;
    
    // Skip empty rows or headers
    if (!row.some(cell => cell) || 
        week === 'Week' || 
        (typeof week === 'string' && week.includes('RN Live Regression'))) {
      return;
    }
    
    // Validate required fields (QA boleh kosong)
    if (!week || !month || !version || !subteam || !status) {
      return;
    }
    
    // Validate status
    const statusLower = status.toString().toLowerCase().trim();
    const isValidStatus = statusLower.includes('pending') || statusLower.includes('not started');
    const isCompleted = statusLower.includes('complete');
    
    if (!isValidStatus || isCompleted) {
      return;
    }
    
    // Process valid data
    const isQAAssigned = !!assignedQA;
    
    if (isQAAssigned) {
      allQAEmails.add(assignedQA);
    }
    
    validSchedule.push({
      week,
      month,
      version,
      subteam,
      qaName: isQAAssigned ? assignedQA.split('@')[0] : null,
      qaEmail: isQAAssigned ? assignedQA : null,
      status,
      originalIndex: index,
      isQAAssigned
    });
  });
  
  return { validSchedule, allQAEmails };
}

function buildMessages(validSchedule, allQAEmails) {
  const currentYear = new Date().getFullYear();
  
  // Group by Month
  const scheduleByMonth = {};
  const monthOrder = [];
  
  validSchedule.forEach(item => {
    if (!scheduleByMonth[item.month]) {
      scheduleByMonth[item.month] = [];
      monthOrder.push(item.month);
    }
    scheduleByMonth[item.month].push(item);
  });
  
  // Build messages per month
  const monthMessages = [];
  
  monthOrder.forEach(month => {
    let monthMessage = `📅 ${month} ${currentYear}\n\n`;
    
    // Group by version
    const scheduleByVersion = {};
    const versionOrder = [];
    
    scheduleByMonth[month].forEach(item => {
      if (!scheduleByVersion[item.version]) {
        scheduleByVersion[item.version] = [];
        versionOrder.push(item.version);
      }
      scheduleByVersion[item.version].push(item);
    });
    
    // Build message per version
    versionOrder.forEach(version => {
      monthMessage += `📱 Version ${version}\n\`\`\`\n`;
      
      // Sort by original index
      scheduleByVersion[version].sort((a, b) => a.originalIndex - b.originalIndex);
      
      scheduleByVersion[version].forEach(item => {
        if (item.isQAAssigned) {
          monthMessage += `• ${item.qaName} (${item.subteam}) - Week ${item.week}\n`;
        } else {
          monthMessage += `• Please Assigned QA (${item.subteam}) - Week ${item.week}\n`;
        }
        monthMessage += `  Status: ${item.status}\n`;
      });
      
      monthMessage += "\`\`\`\n\n";
    });
    
    monthMessages.push(monthMessage.trim());
  });
  
  // Build mention section (mention all)
  const mentionSection = '\n\n<mention-tag target="team-chat://user?id=0"/>';
  
  // Split into chunks
  const messageChunks = [];
  let currentChunk = '';
  
  monthMessages.forEach((monthMsg) => {
    const testChunk = currentChunk + (currentChunk ? '\n\n' : '') + monthMsg;
    
    if (testChunk.length > config.MAX_DESCRIPTION_LENGTH) {
      if (currentChunk.trim()) {
        messageChunks.push(currentChunk.trim());
      }
      currentChunk = monthMsg;
    } else {
      currentChunk = testChunk;
    }
  });
  
  if (currentChunk.trim()) {
    messageChunks.push(currentChunk.trim());
  }
  
  // Add reminders + mentions
  const reminders = `\n\n📋 Reminders\n\`\`\`\n• Coordinate with your team if you have any changes in the schedule\n\`\`\`\n\nHappy testing! 🚀`;
  const footer = reminders + mentionSection;
  
  if (messageChunks.length > 0) {
    const lastIndex = messageChunks.length - 1;
    
    if ((messageChunks[lastIndex] + footer).length <= config.MAX_DESCRIPTION_LENGTH) {
      messageChunks[lastIndex] += footer;
    } else {
      messageChunks.push(footer.trim());
    }
  }
  
  return messageChunks;
}

async function sendToWebhook(messageChunks) {
  const elements = [
    {
      element_type: 'title',
      title: {
        text: '🗓️ RN Live Regression Schedule'
      }
    }
  ];
  
  // Add all description chunks
  messageChunks.forEach(chunk => {
    elements.push({
      element_type: 'description',
      description: {
        text: chunk
      }
    });
  });
  
  // Add button
  elements.push({
    element_type: 'button',
    button: {
      button_type: 'redirect',
      text: '📊 View Full Schedule',
      mobile_link: {
        type: 'web',
        path: config.BUTTON_LINK
      },
      desktop_link: {
        type: 'web',
        path: config.BUTTON_LINK
      }
    }
  });
  
  const payload = {
    tag: 'interactive_message',
    interactive_message: {
      elements
    }
  };
  
  try {
    console.log('📤 Sending to webhook...');
    const response = await axios.post(config.WEBHOOK_URL, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Message sent successfully!');
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error sending message:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Starting Monthly Regression Schedule...\n');
    
    // 1. Get data from Google Sheets
    console.log('📊 Fetching data from Google Sheets...');
    const data = await getSheetData();
    console.log(`   Found ${data.length} rows\n`);
    
    // 2. Validate and process data
    console.log('✅ Validating data...');
    const { validSchedule, allQAEmails } = validateAndProcessData(data);
    console.log(`   Valid items: ${validSchedule.length}`);
    console.log(`   Unique QAs: ${allQAEmails.size}\n`);
    
    if (validSchedule.length === 0) {
      console.log('⚠️  No valid schedule found');
      return;
    }
    
    // 3. Build messages
    console.log('📝 Building messages...');
    const messageChunks = buildMessages(validSchedule, allQAEmails);
    console.log(`   Created ${messageChunks.length} message chunk(s)\n`);
    
    messageChunks.forEach((chunk, index) => {
      console.log(`   Chunk ${index + 1}: ${chunk.length} chars`);
    });
    console.log();
    
    // 4. Send to webhook
    await sendToWebhook(messageChunks);
    
    console.log('\n✨ Done!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };

