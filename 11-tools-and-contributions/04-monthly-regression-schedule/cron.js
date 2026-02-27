const cron = require('node-cron');
const { main } = require('./scheduler');
const config = require('./config');

console.log('🕐 Monthly Regression Schedule Cron started');
console.log(`   Schedule: ${config.SCHEDULE_CRON}`);
console.log(`   Timezone: ${config.TIMEZONE}`);
console.log(`   Next run: Day 1 of next month at 9 AM\n`);

// Schedule task
cron.schedule(config.SCHEDULE_CRON, async () => {
  console.log(`\n🔔 Cron triggered at ${new Date().toISOString()}`);
  try {
    await main();
  } catch (error) {
    console.error('Cron execution failed:', error);
  }
}, {
  timezone: config.TIMEZONE
});

// Run once on startup (for testing)
console.log('🧪 Running once for testing...\n');
main().catch(console.error);

