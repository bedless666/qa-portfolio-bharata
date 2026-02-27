/**
 * Main execution file for Monthly Regression Schedule
 * 
 * This script sends a monthly RN Live Regression schedule to Seatalk.
 * All configuration is in Config.gs
 */

function sendMonthlySchedule() {
  // 1. Get data from sheet
  const sheetData = getSheetData();
  if (!sheetData) {
    return;
  }
  
  // 2. Validate and process data
  const { validSchedule, allQAEmails } = validateAndProcessData(
    sheetData.data, 
    sheetData.startRow
  );
  
  if (validSchedule.length === 0) {
    Logger.log(`\n❌ No valid schedule found`);
    Logger.log("EXECUTION STOPPED - No data to send");
    return;
  }
  
  // 3. Build messages
  const messageChunks = buildMessages(validSchedule, allQAEmails);
  
  // 4. Send to webhook
  sendToWebhook(messageChunks);
  
  Logger.log("\n=== EXECUTION COMPLETE ===");
}

/**
 * Test function - run this manually to test
 */
function testSendSchedule() {
  sendMonthlySchedule();
}

