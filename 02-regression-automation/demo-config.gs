/**
 * Configuration - Demo Version (Sanitized for Portfolio)
 * Centralized config for RN Regression automation scripts
 * 
 * NOTE: This is a sanitized demo version for portfolio showcase.
 * All sensitive data (webhook URLs, IDs, emails) have been replaced with placeholders.
 */

const CONFIG = {
  // Team Chat Webhook URLs
  WEBHOOK_TEST: 'https://webhooks.company.example/webhook/group/YOUR_WEBHOOK_GROUP_ID',
  WEBHOOK_PROD: 'https://webhooks.company.example/webhook/group/YOUR_WEBHOOK_GROUP_ID',
  
  // Active webhook - Change manually to switch between test and prod
  // For TEST: Use WEBHOOK_TEST
  // For PROD: Use WEBHOOK_PROD
  WEBHOOK_URL: 'https://webhooks.company.example/webhook/group/YOUR_WEBHOOK_GROUP_ID',  // Currently: PROD
  
  // Google Calendar Settings
  CALENDAR_ID: 'your-calendar-id@group.calendar.google.com',
  
  // Google Sheets Settings
  SPREADSHEET_ID: 'YOUR_GOOGLE_SPREADSHEET_ID',
  SHEET_NAME: 'Regression PIC',
  
  // Message Settings
  MAX_DESCRIPTION_LENGTH: 900,  // 1000 runes limit, use 900 for safety
  
  // Button Link
  BUTTON_LINK: 'https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit',
  
  // Mention List - Team members to notify
  MENTION_EMAILS: [
    'qa.engineer1@company.com',
    'qa.engineer2@company.com',
    'qa.engineer3@company.com',
    'qa.lead@company.com'
  ],
  
  // Trigger Schedule
  TRIGGER_DAY: 1,   // Day of month (1-31)
  TRIGGER_HOUR: 9   // Hour (0-23)
};
