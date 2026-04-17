/**
 * RN Regression PIC Reminder Script V2 - Demo Version (Sanitized for Portfolio)
 * Automatically sends reminder on first weekday of new month
 * to fill PIC schedule for current month release
 * 
 * NOTE: This is a sanitized demo version for portfolio showcase.
 * All sensitive data has been replaced with placeholders.
 * This script uses the CONFIG object from demo-config.gs
 * 
 * Features:
 * - Detects first weekday of month
 * - Sends automated reminder to fill schedule
 * - Mentions specific team members
 * - Formatted interactive message with button
 * 
 * Configuration is in demo-config.gs
 * Uses global CONFIG object
 */

/**
 * Main function: Send reminder to fill PIC schedule on first weekday of new month
 */
function sendMonthlyPICReminderV2() {
  const today = new Date();
  
  Logger.log("=== PIC REMINDER CHECK (V2) ===");
  Logger.log(`Today: ${Utilities.formatDate(today, Session.getScriptTimeZone(), "yyyy-MM-dd (EEEE)")}`);
  
  // Check if today is first weekday of the month
  if (!isFirstWeekdayOfMonth(today)) {
    Logger.log("❌ Not first weekday of month, skipping reminder");
    return;
  }
  
  Logger.log("✅ First weekday of month detected! Sending PIC reminder...");
  
  const currentMonth = Utilities.formatDate(today, Session.getScriptTimeZone(), "MMMM yyyy");
  
  // Build reminder message with specific mentions
  let message = `📋 Monthly Schedule Reminder\n\n` +
    `Hi Team! 👋\n\n` +
    `It's the first weekday of ${currentMonth}. ` +
    `Please fill in the RN Live Regression QA schedule for **${currentMonth}** release.\n\n` +
    `⏰ Action Required:\n\`\`\`\n` +
    `• Assign QA for each subteam\n` +
    `• Set week numbers and versions\n` +
    `• Update status to "Pending" or "Not Started"\n\`\`\`\n\n` +
    `👉 Please complete this by end of week!\n\n`;
  
  // Add specific mentions instead of @all
  CONFIG.MENTION_EMAILS.forEach(email => {
    message += `<mention-tag target="team-chat://user?email=${email}"/>`;
  });
  
  const elements = [
    {
      "element_type": "title",
      "title": {
        "text": "⚠️ Action Required: Fill RN Regression Schedule"
      }
    },
    {
      "element_type": "description",
      "description": {
        "text": message
      }
    },
    {
      "element_type": "button",
      "button": {
        "button_type": "redirect",
        "text": "📝 Fill Schedule Now",
        "mobile_link": {
          "type": "web",
          "path": CONFIG.BUTTON_LINK
        },
        "desktop_link": {
          "type": "web",
          "path": CONFIG.BUTTON_LINK
        }
      }
    }
  ];
  
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
    Logger.log("\n=== SENDING TO WEBHOOK (V2) ===");
    Logger.log(`Mentioning: ${CONFIG.MENTION_EMAILS.join(', ')}`);
    Logger.log("Payload:");
    Logger.log(JSON.stringify(payload, null, 2));
    
    const response = UrlFetchApp.fetch(CONFIG.WEBHOOK_URL, options);
    const responseCode = response.getResponseCode();
    const responseContent = response.getContentText();
    
    Logger.log(`\nResponse code: ${responseCode}`);
    Logger.log(`Response: ${responseContent}`);
    
    if (responseCode === 200) {
      Logger.log("\n✅ PIC reminder sent successfully!");
    } else {
      Logger.log(`\n❌ Unexpected response: ${responseCode}`);
    }
  } catch (error) {
    Logger.log("\n❌ Error sending PIC reminder:");
    Logger.log(`Error: ${error.message}`);
    if (error.stack) {
      Logger.log(`Stack: ${error.stack}`);
    }
  }
  
  Logger.log("\n=== PIC REMINDER EXECUTION COMPLETE ===");
}

/**
 * Helper: Check if today is the first weekday of the month
 * Returns true if:
 * - Today is 1st and it's weekday (Mon-Fri)
 * - Today is 2nd (Mon) and 1st was Sunday
 * - Today is 3rd (Mon) and 1st was Saturday
 */
function isFirstWeekdayOfMonth(date) {
  const day = date.getDate();
  const dayOfWeek = date.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
  
  Logger.log(`Checking: Day ${day}, Day of week: ${dayOfWeek} (0=Sun, 1=Mon, ..., 6=Sat)`);
  
  // Must be weekday (Mon-Fri)
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    Logger.log("  Not a weekday (weekend)");
    return false;
  }
  
  // If today is 1st and it's weekday, this is first weekday
  if (day === 1) {
    Logger.log("  ✓ 1st of month and is weekday");
    return true;
  }
  
  // If today is 2nd (Monday), check if 1st was Sunday
  if (day === 2 && dayOfWeek === 1) { // Monday
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = firstDay.getDay();
    Logger.log(`  Checking 2nd: First day was ${firstDayOfWeek}`);
    if (firstDayOfWeek === 0) { // Sunday
      Logger.log("  ✓ 2nd (Monday) and 1st was Sunday");
      return true;
    }
  }
  
  // If today is 3rd (Monday), check if 1st was Saturday
  if (day === 3 && dayOfWeek === 1) { // Monday
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = firstDay.getDay();
    Logger.log(`  Checking 3rd: First day was ${firstDayOfWeek}`);
    if (firstDayOfWeek === 6) { // Saturday
      Logger.log("  ✓ 3rd (Monday) and 1st was Saturday");
      return true;
    }
  }
  
  Logger.log("  Not first weekday");
  return false;
}

/**
 * Test function - run this manually to test the reminder
 * This bypasses the date validation and sends immediately
 */
function testPICReminderV2() {
  Logger.log("=== MANUAL TEST - PIC REMINDER V2 (BYPASSING DATE CHECK) ===\n");
  
  const today = new Date();
  const currentMonth = Utilities.formatDate(today, Session.getScriptTimeZone(), "MMMM yyyy");
  
  Logger.log(`Current month: ${currentMonth}`);
  Logger.log(`Target reminder for: ${currentMonth}`);
  Logger.log(`Will mention: ${CONFIG.MENTION_EMAILS.join(', ')}`);
  
  // Build reminder message with specific mentions
  let message = `📋 Monthly Schedule Reminder\n\n` +
    `Hi Team! 👋\n\n` +
    `It's the first weekday of ${currentMonth}. ` +
    `Please fill in the RN Live Regression QA schedule for **${currentMonth}** release.\n\n` +
    `⏰ Action Required:\n\`\`\`\n` +
    `• Assign QA for each subteam\n` +
    `• Set week numbers and versions\n` +
    `• Update status to "Pending" or "Not Started"\n\`\`\`\n\n` +
    `👉 Please complete this by end of week!\n\n`;
  
  // Add specific mentions instead of @all
  CONFIG.MENTION_EMAILS.forEach(email => {
    message += `<mention-tag target="team-chat://user?email=${email}"/>`;
  });
  
  const elements = [
    {
      "element_type": "title",
      "title": {
        "text": "⚠️ Action Required: Fill RN Regression Schedule"
      }
    },
    {
      "element_type": "description",
      "description": {
        "text": message
      }
    },
    {
      "element_type": "button",
      "button": {
        "button_type": "redirect",
        "text": "📝 Fill Schedule Now",
        "mobile_link": {
          "type": "web",
          "path": CONFIG.BUTTON_LINK
        },
        "desktop_link": {
          "type": "web",
          "path": CONFIG.BUTTON_LINK
        }
      }
    }
  ];
  
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
    Logger.log("\n=== SENDING TO WEBHOOK (TEST MODE V2) ===");
    Logger.log(`Webhook URL: ${CONFIG.WEBHOOK_URL}`);
    Logger.log("\nPayload:");
    Logger.log(JSON.stringify(payload, null, 2));
    
    const response = UrlFetchApp.fetch(CONFIG.WEBHOOK_URL, options);
    const responseCode = response.getResponseCode();
    const responseContent = response.getContentText();
    
    Logger.log(`\nResponse code: ${responseCode}`);
    Logger.log(`Response: ${responseContent}`);
    
    if (responseCode === 200) {
      Logger.log("\n✅ TEST: PIC reminder sent successfully!");
    } else {
      Logger.log(`\n❌ TEST: Unexpected response: ${responseCode}`);
    }
  } catch (error) {
    Logger.log("\n❌ TEST: Error sending PIC reminder:");
    Logger.log(`Error: ${error.message}`);
    if (error.stack) {
      Logger.log(`Stack: ${error.stack}`);
    }
  }
  
  Logger.log("\n=== TEST COMPLETE ===");
}

/**
 * Test function - simulate different dates
 */
function testFirstWeekdayLogic() {
  Logger.log("=== TESTING FIRST WEEKDAY LOGIC ===\n");
  
  // Test cases
  const testCases = [
    { date: new Date(2026, 0, 1), expected: true, desc: "Jan 1, 2026 (Thu)" },
    { date: new Date(2026, 0, 2), expected: false, desc: "Jan 2, 2026 (Fri)" },
    { date: new Date(2026, 1, 1), expected: false, desc: "Feb 1, 2026 (Sun)" },
    { date: new Date(2026, 1, 2), expected: true, desc: "Feb 2, 2026 (Mon) - 1st was Sun" },
    { date: new Date(2026, 2, 1), expected: false, desc: "Mar 1, 2026 (Sun)" },
    { date: new Date(2026, 2, 2), expected: true, desc: "Mar 2, 2026 (Mon) - 1st was Sun" },
    { date: new Date(2026, 3, 1), expected: true, desc: "Apr 1, 2026 (Wed)" },
    { date: new Date(2026, 5, 1), expected: true, desc: "Jun 1, 2026 (Mon)" },
    { date: new Date(2026, 5, 2), expected: false, desc: "Jun 2, 2026 (Tue)" }
  ];
  
  testCases.forEach((test, index) => {
    const result = isFirstWeekdayOfMonth(test.date);
    const status = result === test.expected ? "✅ PASS" : "❌ FAIL";
    Logger.log(`\nTest ${index + 1}: ${test.desc}`);
    Logger.log(`Expected: ${test.expected}, Got: ${result} - ${status}`);
  });
  
  Logger.log("\n=== TEST COMPLETE ===");
}

/**
 * Setup trigger for daily execution at 9 AM
 * The function will check if today is first weekday and send if true
 */
function setupDailyTriggerV2() {
  // Delete existing PIC reminder triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'sendMonthlyPICReminderV2') {
      ScriptApp.deleteTrigger(trigger);
      Logger.log("Deleted existing trigger");
    }
  });
  
  // Create new trigger - runs daily at 9 AM
  ScriptApp.newTrigger('sendMonthlyPICReminderV2')
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();
  
  Logger.log("✅ Daily trigger created for sendMonthlyPICReminderV2 at 9 AM");
  Logger.log("Function will check if today is first weekday and send reminder if true");
}

/**
 * Remove PIC reminder trigger
 */
function removePICReminderTriggerV2() {
  const triggers = ScriptApp.getProjectTriggers();
  let removed = 0;
  
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'sendMonthlyPICReminderV2') {
      ScriptApp.deleteTrigger(trigger);
      removed++;
    }
  });
  
  Logger.log(`✅ Removed ${removed} PIC reminder trigger(s) V2`);
}
