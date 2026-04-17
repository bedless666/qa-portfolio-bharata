# Google Apps Script - Monthly Regression Schedule (Simple)

**Simplified 3-file version** - Easy to setup and maintain! ✨

## 📂 File Structure (Only 3 Files!)

```
Config.gs     → Settings only (edit here)
Main.gs       → All logic (data + message + webhook)
Triggers.gs   → Trigger setup
```

## 🚀 Quick Setup (5 Steps)

### 1. Open Apps Script Editor

1. Go to your Google Sheet
2. **Extensions** → **Apps Script**

### 2. Create 3 Files

Click **+** next to Files, then **Script**, repeat 3 times:
- `Config.gs`
- `Main.gs`
- `Triggers.gs`

### 3. Copy-Paste Code

Copy content from each `.gs` file in this folder to corresponding file in Apps Script Editor.

### 4. Update Config

Edit **Config.gs** with your settings:
```javascript
const CONFIG = {
  WEBHOOK_URL: 'your-webhook-url',     // ← Update
  SPREADSHEET_ID: 'your-sheet-id',     // ← Update
  // ... rest is optional
};
```

### 5. Test & Setup Trigger

**Test manually:**
1. Open **Main.gs**
2. Select function: `testSendSchedule`
3. Click **Run** ▶️
4. Grant permissions
5. Check logs

**Setup automatic trigger:**
1. Open **Triggers.gs**
2. Select function: `createTriggers`
3. Click **Run** ▶️
4. Done! Will run automatically on day 1 at 9 AM

## 🎯 Usage

### Manual Run (Testing)
```javascript
// In Main.gs
testSendSchedule()  // Run this to test
```

### View Logs
- Click **Execution log** button
- See validation details, message preview, webhook response

### Trigger Management
```javascript
// In Triggers.gs
createTriggers()   // Setup automatic monthly run
listTriggers()     // View current triggers
deleteTriggers()   // Remove all triggers
```

## ⚙️ Configuration Options

Edit **Config.gs**:

```javascript
const CONFIG = {
  // Required
  WEBHOOK_URL: 'https://...',          // Team Chat webhook
  SPREADSHEET_ID: '19nAfy...',         // Your sheet ID
  
  // Optional (defaults work fine)
  SHEET_NAME: 'Regression PIC',        // Sheet name
  MAX_DESCRIPTION_LENGTH: 900,         // Message chunk size
  TRIGGER_DAY: 1,                      // Day of month (1-31)
  TRIGGER_HOUR: 9,                     // Hour (0-23)
  BUTTON_LINK: 'https://...'           // Button URL
};
```

## 📋 How It Works

1. **Finds header** "RN Live Regression QA" in sheet
2. **Reads data** starting 3 rows below header
3. **Validates** each row:
   - ✅ Week, Month, Version, Subteam, Status must be filled
   - ✅ Status must contain "Pending" or "Not Started"
   - ❌ Status "Complete" → skipped
   - ⚠️ Assigned QA empty → shows warning
4. **Groups by month** then by version (maintains sheet order)
5. **Formats message** with code blocks
6. **Splits into chunks** (900 chars each)
7. **Adds QA mentions** at the bottom
8. **Sends to Team Chat** via webhook

## 🔍 Validation Rules

**Required fields (must be filled):**
- Week
- Month
- Version
- Subteam
- Status

**Status must contain:**
- "Pending" OR
- "Not Started"

**Will be skipped if:**
- ❌ Status contains "Complete"
- ❌ Any required field is empty
- ❌ Row is empty or header row

**Assigned QA:**
- Optional field
- If empty: Shows "Please Assigned QA (Subteam)"
- If filled: Name shown + mention added at bottom

## 📊 Message Format

```
🗓️ RN Live Regression Schedule

📅 November 2024

📱 Version 12.v1
```
• bharata (QAOD) - Week 1
  Status: 🔄 Pending
• ovi (QAOD) - Week 2
  Status: ❌ Not Started
```

📱 Version 12.v2
```
• anisa (QAOD) - Week 3
  Status: 🔄 Pending
```

📋 Reminders
```
• Coordinate with your team if you have any changes
```

Happy testing! 🚀

Assigned QA:
- @bharata
- @ovi
- @anisa

[📊 View Full Schedule]
```

## 🐛 Troubleshooting

### No data sent?
- Check execution logs for skipped rows
- Verify status contains "Pending" or "Not Started"
- Check all required fields are filled

### Wrong webhook?
- Update `WEBHOOK_URL` in **Config.gs**

### Trigger not working?
- Check trigger exists: Run `listTriggers()`
- Delete and recreate: Run `deleteTriggers()` then `createTriggers()`
- Check Apps Script quotas

### Message too long error?
- Reduce `MAX_DESCRIPTION_LENGTH` in Config.gs
- Script auto-splits messages into chunks

## 🆚 vs Modular Version

**This (Simple):**
- ✅ Only 3 files
- ✅ Easier to setup
- ✅ Good for most use cases

**Modular (6 files):**
- ✅ More organized
- ✅ Better for large teams
- ✅ Professional structure

Choose based on your preference! Both have identical functionality.

## 🔗 Related

- [Local Node.js Version](../README.md)
- [Modular Apps Script](../google-apps-script/README.md)
- [Sync Status](../SYNC_STATUS.md)

---

**Created by:** Bharata Aryaseta (Aryo)
**Version:** 2.0 (Simple)
**Last Updated:** 2024-12-02

