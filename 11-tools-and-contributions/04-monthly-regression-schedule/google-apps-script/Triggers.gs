/**
 * Trigger management functions
 * Run createTriggers() once to setup automatic monthly execution
 */

function createTriggers() {
  // Delete existing triggers to avoid duplicates
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Create new trigger for first day of each month
  ScriptApp.newTrigger('sendMonthlySchedule')
    .timeBased()
    .onMonthDay(CONFIG.TRIGGER_DAY)
    .atHour(CONFIG.TRIGGER_HOUR)
    .create();
  
  Logger.log(`✅ Trigger created: Run on day ${CONFIG.TRIGGER_DAY} at ${CONFIG.TRIGGER_HOUR}:00`);
}

/**
 * Delete all triggers
 */
function deleteTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  Logger.log(`✅ Deleted ${triggers.length} trigger(s)`);
}

/**
 * List all triggers
 */
function listTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  Logger.log(`Found ${triggers.length} trigger(s):`);
  triggers.forEach((trigger, index) => {
    Logger.log(`\n${index + 1}. Function: ${trigger.getHandlerFunction()}`);
    Logger.log(`   Trigger ID: ${trigger.getUniqueId()}`);
    Logger.log(`   Event Type: ${trigger.getEventType()}`);
  });
}

