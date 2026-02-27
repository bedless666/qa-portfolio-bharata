// Configuration for Monthly Regression Schedule
module.exports = {
  // Seatalk Webhook (SYNCED with Google Apps Script)
  WEBHOOK_URL: 'https://openapi.seatalk.io/webhook/group/7BTJoSlqSnKFhaYOAnD1Aw',
  
  // Google Sheets
  SPREADSHEET_ID: '19nAfyhqtf-Evdl78peuoDOvs6SIoo9j0bpgvf1lIYAM',
  SHEET_NAME: 'Regression PIC',
  
  // Message Settings
  MAX_DESCRIPTION_LENGTH: 900, // Safe limit (di bawah 1000)
  
  // Button Link
  BUTTON_LINK: 'https://docs.google.com/spreadsheets/d/19nAfyhqtf-Evdl78peuoDOvs6SIoo9j0bpgvf1lIYAM/edit?gid=398695652#gid=398695652&range=A24',
  
  // Schedule Settings
  SCHEDULE_CRON: '0 9 1 * *', // Run at 9 AM on day 1 of every month
  TIMEZONE: 'Asia/Singapore'
};

