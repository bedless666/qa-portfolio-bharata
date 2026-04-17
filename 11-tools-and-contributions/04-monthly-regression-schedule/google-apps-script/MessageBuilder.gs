/**
 * Message building and formatting functions
 */

function buildMessages(validSchedule, allQAEmails) {
  Logger.log("\n=== PREPARING MESSAGE ===");
  
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
  
  return messageChunks;
}

