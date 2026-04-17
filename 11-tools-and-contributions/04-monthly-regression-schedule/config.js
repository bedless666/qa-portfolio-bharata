// Configuration for Monthly Regression Schedule
module.exports = {
  // Team Chat Webhook (SYNCED with Google Apps Script)
  WEBHOOK_URL: 'https://webhooks.company.example/webhook/group/YOUR_WEBHOOK_GROUP_ID',
  
  // Google Sheets
  SPREADSHEET_ID: 'YOUR_GOOGLE_SPREADSHEET_ID',
  SHEET_NAME: 'Regression PIC',
  
  // Message Settings
  MAX_DESCRIPTION_LENGTH: 900, // Safe limit (di bawah 1000)
  
  // Button Link
  BUTTON_LINK: 'https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit?gid=398695652#gid=398695652&range=A24',
  
  // Schedule Settings
  SCHEDULE_CRON: '0 9 1 * *', // Run at 9 AM on day 1 of every month
  TIMEZONE: 'Asia/Singapore'
};

