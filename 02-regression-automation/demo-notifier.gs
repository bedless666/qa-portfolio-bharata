/**
 * RN Live Regression Schedule Notifier V2 - Demo Version (Sanitized for Portfolio)
 * Version: 3.0 - Current week only with Calendar integration
 * 
 * NOTE: This is a sanitized demo version for portfolio showcase.
 * All sensitive data has been replaced with placeholders.
 * This script uses the CONFIG object from demo-config.gs
 * 
 * Features:
 * - Detects current week from Google Calendar
 * - Filters schedule for current week only
 * - Mentions specific team members instead of @all
 * - Sends formatted notifications to team chat via webhook
 * 
 * Configuration is in demo-config.gs
 * Uses global CONFIG object
 */

// ============================================================================
// CALENDAR INTEGRATION
// ============================================================================

/**
 * Get current week/version from RN Regression Calendar
 * Returns an object with month and version (e.g., {month: "2", version: "1"}) or null if not found
 */
function getCurrentWeekFromCalendar() {
  try {
    const calendar = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
    
    if (!calendar) {
      Logger.log("❌ Calendar not found or no access");
      return null;
    }
    
    const today = new Date();
    Logger.log(`\n=== CALENDAR DETECTION ===`);
    Logger.log(`Today: ${Utilities.formatDate(today, Session.getScriptTimeZone(), "yyyy-MM-dd (EEEE)")}`);
    
    // Get events for today
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
    
    const events = calendar.getEvents(todayStart, todayEnd);
    Logger.log(`Found ${events.length} event(s) for today`);
    
    if (events.length === 0) {
      Logger.log("⚠️ No calendar event found for today");
      return null;
    }
    
    // Look for event with format YYYY.MM.vX
    for (const event of events) {
      const title = event.getTitle();
      Logger.log(`\nChecking event: "${title}"`);
      Logger.log(`  Start: ${event.getStartTime()}`);
      Logger.log(`  End: ${event.getEndTime()}`);
      
      // Extract month and version from title 
      // Supports formats:
      // - "2026.01.v1" → month: "1", version: "1"
      // - "2026.02.v1 [Regular Deployment]" → month: "2", version: "1"
      // - "[RN] - 2026.02.v1 [Regular Deployment]" → month: "2", version: "1"
      const fullMatch = title.match(/\.(\d{2})\.v(\d+)/);
      
      if (fullMatch) {
        const month = parseInt(fullMatch[1], 10).toString(); // Remove leading zero
        const version = fullMatch[2];
        Logger.log(`✅ Found current version: ${month}.v${version} (from event: "${title}")`);
        return { month, version };
      }
    }
    
    Logger.log("⚠️ No version pattern found in today's events");
    return null;
    
  } catch (error) {
    Logger.log(`❌ Error accessing calendar: ${error.message}`);
    return null;
  }
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function sendWeeklySchedule() {
  Logger.log("=== START EXECUTION (V2 - WEEKLY) ===");
  
  // Get current week from calendar
  const currentVersionInfo = getCurrentWeekFromCalendar();
  
  if (!currentVersionInfo) {
    Logger.log("\n❌ Cannot detect current week from calendar. Aborting.");
    return;
  }
  
  const { month, version } = currentVersionInfo;
  Logger.log(`\n📅 Current Version: ${month}.v${version}`);
  Logger.log(`Will filter schedule for version "${month}.v${version}"`);
  
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
  
  // Find header
  const scheduleRange = sheet.createTextFinder("RN Live Regression QA").findNext();
  if (!scheduleRange) {
    Logger.log("❌ Schedule header not found");
    return;
  }
  
  Logger.log(`✅ Header found at row: ${scheduleRange.getRow()}`);
  
  const startRow = scheduleRange.getRow() + 3;
  const lastRow = sheet.getLastRow();
  const numRows = lastRow - startRow + 1;
  
  Logger.log(`Start Row: ${startRow}`);
  Logger.log(`Last Row: ${lastRow}`);
  Logger.log(`Number of Rows to check: ${numRows}`);
  
  const data = sheet.getRange(startRow, 1, numRows, 6).getValues();
  
  Logger.log("\n=== VALIDATING DATA ===");
  
  // Validate data and filter by current version
  const validSchedule = [];
  const allQAEmails = new Set();
  let skippedEmptyRow = 0;
  let skippedMissingField = 0;
  let skippedInvalidStatus = 0;
  let skippedDifferentVersion = 0;
  
  const targetVersion = `${month}.v${version}`;
  
  data.forEach((row, index) => {
    const week = row[0];
    const month = row[1];
    const version = row[2];
    const subteam = row[3];
    const assignedQA = row[4];
    const status = row[5];
    
    // Skip empty rows or headers
    if (!row.some(cell => cell !== "") || 
        week === "Week" || 
        typeof week === "string" && week.includes("RN Live Regression")) {
      skippedEmptyRow++;
      return;
    }
    
    Logger.log(`\n--- Row ${startRow + index} ---`);
    Logger.log(`Week: "${week}" | Month: "${month}" | Version: "${version}"`);
    Logger.log(`Subteam: "${subteam}" | QA: "${assignedQA}" | Status: "${status}"`);
    
    // Validate required fields
    if (!week || !month || !version || !subteam || !status) {
      Logger.log(`  ❌ Skipped: Missing required field(s)`);
      skippedMissingField++;
      return;
    }
    
    // Filter by current version
    if (version.toString() !== targetVersion) {
      Logger.log(`  ⏭️ Skipped: Different version (want ${targetVersion}, got ${version})`);
      skippedDifferentVersion++;
      return;
    }
    
    // Validate status - Accept all valid statuses including Completed
    const statusLower = status.toString().toLowerCase().trim();
    const isValidStatus = statusLower.includes('pending') || 
                         statusLower.includes('not started') ||
                         statusLower.includes('complete');
    
    if (!isValidStatus) {
      Logger.log(`  ❌ Skipped: Invalid status ("${status}")`);
      skippedInvalidStatus++;
      return;
    }
    
    // Valid data for current week
    const isQAAssigned = !!assignedQA;
    
    if (isQAAssigned) {
      allQAEmails.add(assignedQA);
    }
    
    Logger.log(`  ✅ VALID: Added to THIS WEEK's schedule ${isQAAssigned ? '' : '(QA NOT ASSIGNED)'}`);
    
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
  Logger.log(`Skipped (different version): ${skippedDifferentVersion}`);
  Logger.log(`Skipped (invalid status): ${skippedInvalidStatus}`);
  Logger.log(`Valid schedule items for THIS WEEK: ${validSchedule.length}`);
  Logger.log(`Total unique QAs: ${allQAEmails.size}`);
  
  if (validSchedule.length === 0) {
    Logger.log(`\n❌ No valid schedule found for current week (${month}.v${version})`);
    return;
  }
  
  Logger.log("\n=== PREPARING MESSAGE ===");
  
  const currentYear = new Date().getFullYear();
  
  // Build message for current week only
  const monthName = validSchedule[0].month;
  const versionNumber = validSchedule[0].version;
  
  let message = `📅 ${monthName} ${currentYear}\n\n`;
  message += `📱 Version ${versionNumber}\n\`\`\`\n`;
  
  // Sort by original index
  validSchedule.sort((a, b) => a.originalIndex - b.originalIndex);
  
  validSchedule.forEach(item => {
    // Add status emoji for better visibility
    const statusLower = item.status.toString().toLowerCase();
    let statusEmoji = '';
    if (statusLower.includes('complete')) {
      statusEmoji = '✅ ';
    } else if (statusLower.includes('pending')) {
      statusEmoji = '🔄 ';
    } else if (statusLower.includes('not started')) {
      statusEmoji = '⏸️ ';
    }
    
    if (item.isQAAssigned) {
      message += `• ${item.qaName} (${item.subteam}) - Week ${item.week}\n`;
    } else {
      message += `• Please Assigned QA (${item.subteam}) - Week ${item.week}\n`;
    }
    message += `  Status: ${statusEmoji}${item.status}\n`;
  });
  
  message += `\`\`\`\n\n`;
  
  // Add reminders + specific mentions
  message += `📋 Reminders\n\`\`\`\n• Coordinate with your team if you have any changes in the schedule\n\`\`\`\n\nHappy testing! 🚀\n\n`;
  
  // Add specific mentions instead of @all
  CONFIG.MENTION_EMAILS.forEach(email => {
    message += `<mention-tag target="team-chat://user?email=${email}"/>`;
  });
  
  Logger.log(`\n✅ Message length: ${message.length} chars`);
  Logger.log(`Message preview:\n${message.substring(0, 200)}...`);
  
  Logger.log("\n=== SENDING TO WEBHOOK ===");
  sendToWebhookV2([message]);
  Logger.log("\n=== EXECUTION COMPLETE ===");
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function sendToWebhookV2(messageChunks) {
  const elements = [
    {
      "element_type": "title",
      "title": {
        "text": "📅 This Week's RN Live Regression Schedule"
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
    Logger.log("Payload:");
    Logger.log(JSON.stringify(payload, null, 2));
    
    const response = UrlFetchApp.fetch(CONFIG.WEBHOOK_URL, options);
    const responseCode = response.getResponseCode();
    const responseContent = response.getContentText();
    
    Logger.log(`\nStatus Code: ${responseCode}`);
    Logger.log(`Response: ${responseContent}`);
    
    if (responseCode === 200) {
      try {
        const parsedResponse = JSON.parse(responseContent);
        
        if (parsedResponse.code && parsedResponse.code !== 0) {
          Logger.log("\n❌ Message failed!");
          Logger.log(`Error Code: ${parsedResponse.code}`);
          Logger.log(`Error Message: ${parsedResponse.message}`);
          
          if (parsedResponse.validation_errors) {
            Logger.log("Validation Errors:");
            parsedResponse.validation_errors.forEach((err, index) => {
              Logger.log(`  ${index + 1}. ${err.field}: ${err.reason}`);
            });
          }
        } else {
          Logger.log("\n✅ Message sent successfully!");
        }
      } catch (parseError) {
        Logger.log("\n✅ Message sent successfully!");
      }
    } else {
      Logger.log(`\n❌ Unexpected response code: ${responseCode}`);
    }
  } catch (error) {
    Logger.log("\n❌ Error:");
    Logger.log(`${error.name}: ${error.message}`);
    if (error.stack) Logger.log(error.stack);
  }
}

// ============================================================================
// TEST & TRIGGER FUNCTIONS
// ============================================================================

function testSendWeeklySchedule() {
  Logger.log("=== MANUAL TEST (V2 - WEEKLY) ===\n");
  sendWeeklySchedule();
}

function testCalendarDetection() {
  Logger.log("=== TEST CALENDAR DETECTION ===\n");
  const currentVersionInfo = getCurrentWeekFromCalendar();
  
  if (currentVersionInfo) {
    const { month, version } = currentVersionInfo;
    Logger.log(`\n✅ Successfully detected current version: ${month}.v${version}`);
    Logger.log(`Sheet will be filtered for version "${month}.v${version}"`);
  } else {
    Logger.log("\n❌ Failed to detect current version from calendar");
  }
}

function createWeeklyTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'sendWeeklySchedule') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Run every Monday at 9 AM
  ScriptApp.newTrigger('sendWeeklySchedule')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(9)
    .create();
  
  Logger.log("✅ Trigger created: Run every Monday at 9 AM");
}

function createCustomWeeklyTriggers() {
  // Delete existing triggers for sendWeeklySchedule
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'sendWeeklySchedule') {
      ScriptApp.deleteTrigger(trigger);
      Logger.log("Deleted existing trigger");
    }
  });
  
  // Create Trigger 1: Tuesday at 3 PM (15:00)
  ScriptApp.newTrigger('sendWeeklySchedule')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.TUESDAY)
    .atHour(15)
    .create();
  
  Logger.log("✅ Trigger 1 created: Run every Tuesday at 3 PM");
  
  // Create Trigger 2: Wednesday at 10 AM (10:00)
  ScriptApp.newTrigger('sendWeeklySchedule')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.WEDNESDAY)
    .atHour(10)
    .create();
  
  Logger.log("✅ Trigger 2 created: Run every Wednesday at 10 AM");
  Logger.log("\n📅 Schedule Summary:");
  Logger.log("  - Tuesday 3 PM: Send current week schedule");
  Logger.log("  - Wednesday 10 AM: Send current week schedule");
}

function removeWeeklyTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  let removed = 0;
  
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'sendWeeklySchedule') {
      ScriptApp.deleteTrigger(trigger);
      removed++;
    }
  });
  
  Logger.log(`✅ Removed ${removed} weekly trigger(s)`);
}

function listTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  
  Logger.log("=== ACTIVE TRIGGERS ===");
  
  if (triggers.length === 0) {
    Logger.log("No triggers found");
    return;
  }
  
  triggers.forEach((trigger, index) => {
    Logger.log(`\nTrigger ${index + 1}:`);
    Logger.log(`  Function: ${trigger.getHandlerFunction()}`);
    Logger.log(`  Type: ${trigger.getEventType()}`);
  });
}
