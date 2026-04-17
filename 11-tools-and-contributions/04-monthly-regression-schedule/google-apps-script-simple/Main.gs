/**
 * Monthly Regression Schedule - Main Script
 * All-in-one execution logic
 */

function sendMonthlySchedule() {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
  
  Logger.log("=== START EXECUTION ===");
  
  // Mencari posisi header "RN Live Regression QA"
  const scheduleRange = sheet.createTextFinder("RN Live Regression QA").findNext();
  if (!scheduleRange) {
    Logger.log("❌ Schedule header not found");
    return;
  }
  
  Logger.log(`✅ Header found at row: ${scheduleRange.getRow()}`);
  
  // Ambil data mulai dari 3 baris setelah header
  const startRow = scheduleRange.getRow() + 3;
  const lastRow = sheet.getLastRow();
  const numRows = lastRow - startRow + 1;
  
  Logger.log(`Start Row: ${startRow}`);
  Logger.log(`Last Row: ${lastRow}`);
  Logger.log(`Number of Rows to check: ${numRows}`);
  
  const data = sheet.getRange(startRow, 1, numRows, 6).getValues();
  
  Logger.log("\n=== VALIDATING DATA ===");
  
  // Filter dan validasi data
  const validSchedule = [];
  const allQAEmails = new Set();
  let skippedEmptyRow = 0;
  let skippedMissingField = 0;
  let skippedInvalidStatus = 0;
  
  data.forEach((row, index) => {
    const week = row[0];
    const month = row[1];
    const version = row[2];
    const subteam = row[3];
    const assignedQA = row[4];
    const status = row[5];
    
    // Skip jika baris kosong atau header
    if (!row.some(cell => cell !== "") || 
        week === "Week" || 
        typeof week === "string" && week.includes("RN Live Regression")) {
      skippedEmptyRow++;
      return;
    }
    
    Logger.log(`\n--- Row ${startRow + index} ---`);
    Logger.log(`Week: "${week}" | Month: "${month}" | Version: "${version}"`);
    Logger.log(`Subteam: "${subteam}" | QA: "${assignedQA}" | Status: "${status}"`);
    
    // Validasi: Week, Month, Version, Subteam, Status wajib terisi
    if (!week || !month || !version || !subteam || !status) {
      Logger.log(`  ❌ Skipped: Missing required field(s):`);
      Logger.log(`     Week: ${!!week}, Month: ${!!month}, Version: ${!!version}`);
      Logger.log(`     Subteam: ${!!subteam}, Status: ${!!status}`);
      skippedMissingField++;
      return;
    }
    
    // Validasi status: Harus mengandung "Pending" atau "Not Started"
    const statusLower = status.toString().toLowerCase().trim();
    const isValidStatus = statusLower.includes('pending') || statusLower.includes('not started');
    const isCompleted = statusLower.includes('complete');
    
    if (!isValidStatus || isCompleted) {
      Logger.log(`  ❌ Skipped: Invalid status ("${status}")`);
      skippedInvalidStatus++;
      return;
    }
    
    // Jika lolos validasi
    const isQAAssigned = !!assignedQA;
    
    if (isQAAssigned) {
      allQAEmails.add(assignedQA);
    }
    
    Logger.log(`  ✅ VALID: Added to schedule ${isQAAssigned ? '' : '(QA NOT ASSIGNED - WARNING)'}`);
    
    validSchedule.push({
      week: week,
      month: month,
      version: version,
      subteam: subteam,
      qaName: isQAAssigned ? (typeof assignedQA === 'string' ? assignedQA.split('@')[0] : assignedQA) : null,
      qaEmail: isQAAssigned ? assignedQA : null,
      status: status,
      originalIndex: index,
      isQAAssigned: isQAAssigned
    });
  });
  
  Logger.log("\n=== VALIDATION SUMMARY ===");
  Logger.log(`Total rows checked: ${data.length}`);
  Logger.log(`Skipped (empty/header): ${skippedEmptyRow}`);
  Logger.log(`Skipped (missing field): ${skippedMissingField}`);
  Logger.log(`Skipped (invalid status): ${skippedInvalidStatus}`);
  Logger.log(`Valid schedule items: ${validSchedule.length}`);
  Logger.log(`Total unique QAs: ${allQAEmails.size}`);
  
  if (validSchedule.length === 0) {
    Logger.log(`\n❌ No valid schedule found`);
    Logger.log("EXECUTION STOPPED - No data to send");
    return;
  }
  
  Logger.log("\n=== PREPARING MESSAGE ===");
  
  // Get current year
  const currentYear = new Date().getFullYear();
  
  // Group by Month FIRST
  const scheduleByMonth = {};
  const monthOrder = [];
  
  validSchedule.forEach(item => {
    if (!scheduleByMonth[item.month]) {
      scheduleByMonth[item.month] = [];
      monthOrder.push(item.month);
    }
    scheduleByMonth[item.month].push(item);
  });
  
  Logger.log(`Months in order: ${monthOrder.join(', ')}`);
  Logger.log(`Total months: ${monthOrder.length}`);
  
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
    
    Logger.log(`  ${month} - Versions: ${versionOrder.join(', ')}`);
    
    // Build message untuk setiap version
    versionOrder.forEach(version => {
      monthMessage += `📱 Version ${version}\n\`\`\`\n`;
      
      // Sort by originalIndex
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
    
    if (testChunk.length > CONFIG.MAX_DESCRIPTION_LENGTH) {
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
    
    if ((messageChunks[lastIndex] + footer).length <= CONFIG.MAX_DESCRIPTION_LENGTH) {
      messageChunks[lastIndex] += footer;
    } else {
      messageChunks.push(footer.trim());
    }
  }
  
  Logger.log("\n=== MESSAGE PREVIEW ===");
  messageChunks.forEach((chunk, index) => {
    Logger.log(`\nDescription ${index + 1} length: ${chunk.length} chars`);
    Logger.log(`Description ${index + 1}:`);
    Logger.log(chunk);
  });
  
  Logger.log("\n=== SENDING TO WEBHOOK ===");
  
  // Send to webhook
  sendToWebhook(messageChunks);
  
  Logger.log("\n=== EXECUTION COMPLETE ===");
}

function sendToWebhook(messageChunks) {
  // Build elements array
  const elements = [
    {
      "element_type": "title",
      "title": {
        "text": "🗓️ RN Live Regression Schedule"
      }
    }
  ];
  
  // Add all description chunks
  messageChunks.forEach(chunk => {
    elements.push({
      "element_type": "description",
      "description": {
        "text": chunk
      }
    });
  });
  
  // Add button
  elements.push({
    "element_type": "button",
    "button": {
      "button_type": "redirect",
      "text": "📊 View Full Schedule",
      "mobile_link": {
        "type": "web",
        "path": CONFIG.BUTTON_LINK
      },
      "desktop_link": {
        "type": "web",
        "path": CONFIG.BUTTON_LINK
      }
    }
  });
  
  const payload = {
    "tag": "interactive_message",
    "interactive_message": {
      "elements": elements
    }
  };
  
  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  };
  
  try {
    Logger.log("Sending message to webhook...");
    Logger.log("Payload being sent:");
    Logger.log(JSON.stringify(payload, null, 2));
    
    const response = UrlFetchApp.fetch(CONFIG.WEBHOOK_URL, options);
    const responseCode = response.getResponseCode();
    const responseContent = response.getContentText();
    
    Logger.log("\nWebhook Response Details:");
    Logger.log(`Status Code: ${responseCode}`);
    Logger.log("Response Headers:");
    Logger.log(JSON.stringify(response.getAllHeaders(), null, 2));
    Logger.log("Response Content:");
    Logger.log(responseContent);
    
    if (responseCode === 200) {
      Logger.log("\n✅ Message sent successfully!");
      
      try {
        const parsedResponse = JSON.parse(responseContent);
        Logger.log("Parsed Response:");
        Logger.log(JSON.stringify(parsedResponse, null, 2));
      } catch (parseError) {
        Logger.log("Response is not in JSON format");
      }
    } else {
      Logger.log(`\n❌ Unexpected response code: ${responseCode}`);
    }
  } catch (error) {
    Logger.log("\n❌ Error sending message:");
    Logger.log(`Error name: ${error.name}`);
    Logger.log(`Error message: ${error.message}`);
    if (error.stack) {
      Logger.log(`Stack trace: ${error.stack}`);
    }
  }
}

/**
 * Test function - run this manually to test
 */
function testSendSchedule() {
  sendMonthlySchedule();
}

