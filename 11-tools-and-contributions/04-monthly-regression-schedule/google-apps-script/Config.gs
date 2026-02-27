/**
 * Configuration file for Monthly Regression Schedule
 * Edit these values as needed
 */

const CONFIG = {
  // Seatalk Webhook URL
  WEBHOOK_URL: 'https://openapi.seatalk.io/webhook/group/7BTJoSlqSnKFhaYOAnD1Aw',
  
  // Google Sheets Settings
  SPREADSHEET_ID: '19nAfyhqtf-Evdl78peuoDOvs6SIoo9j0bpgvf1lIYAM',
  SHEET_NAME: 'Regression PIC',
  
  // Message Settings
  MAX_DESCRIPTION_LENGTH: 900, // Safe limit (di bawah 1000)
  
  // Schedule Settings
  TRIGGER_DAY: 1,  // Day of month (1-31)
  TRIGGER_HOUR: 9, // Hour (0-23)
  
  // Button Link
  BUTTON_LINK: 'https://docs.google.com/spreadsheets/d/19nAfyhqtf-Evdl78peuoDOvs6SIoo9j0bpgvf1lIYAM/edit?gid=398695652#gid=398695652&range=A24'
};

