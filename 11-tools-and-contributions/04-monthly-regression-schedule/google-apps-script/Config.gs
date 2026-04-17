/**
 * Configuration file for Monthly Regression Schedule
 * Edit these values as needed
 */

const CONFIG = {
  // Team Chat Webhook URL
  WEBHOOK_URL: 'https://webhooks.company.example/webhook/group/YOUR_WEBHOOK_GROUP_ID',
  
  // Google Sheets Settings
  SPREADSHEET_ID: '19nAfyhqtf-Evdl78peuoDOvs6SIoo9j0bpgvf1lIYAM',
  SHEET_NAME: 'Regression PIC',
  
  // Message Settings
  MAX_DESCRIPTION_LENGTH: 900, // Safe limit (di bawah 1000)
  
  // Schedule Settings
  TRIGGER_DAY: 1,  // Day of month (1-31)
  TRIGGER_HOUR: 9, // Hour (0-23)
  
  // Button Link
  BUTTON_LINK: 'https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit?gid=398695652#gid=398695652&range=A24'
};

