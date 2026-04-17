# Google Apps Script - Monthly Regression Schedule (Modular)

Modular version of the Monthly Regression Schedule script for Google Apps Script.

## 📂 File Structure

```
Config.gs           → Configuration & settings
DataProcessor.gs    → Data fetching & validation
MessageBuilder.gs   → Message formatting
WebhookService.gs   → Team Chat webhook communication
Main.gs             → Main execution logic
Triggers.gs         → Trigger management
```

## 🚀 Setup Instructions

### 1. Create New Apps Script Project

1. Go to your Google Sheet
2. **Extensions** → **Apps Script**
3. Create new project (or use existing)

### 2. Add Files

For each `.gs` file in this folder:

1. In Apps Script Editor, click **+** next to Files
2. Choose **Script**
3. Name it (e.g., `Config`, `Main`, etc.)
4. Copy-paste the content from corresponding `.gs` file

**File order doesn't matter** - all `.gs` files share global scope.

### 3. Configure Settings

Edit **Config.gs**:

```javascript
const CONFIG = {
  WEBHOOK_URL: 'your-webhook-url',     // ← Update this
  SPREADSHEET_ID: 'your-sheet-id',     // ← Update this
  SHEET_NAME: 'Regression PIC',        // ← Update if needed
  // ... other settings
};
```

### 4. Test Manually

1. Open **Main.gs**
2. Select function: `testSendSchedule`
3. Click **Run** ▶️
4. Check **Execution log** for output

### 5. Setup Automatic Trigger

1. Open **Triggers.gs**
2. Run function: `createTriggers`
3. Grant permissions when prompted
4. Trigger will run automatically on day 1 of each month at 9 AM

## 📋 File Descriptions

### Config.gs
- All configuration in one place
- Easy to update webhook URL, sheet ID, etc.
- No code logic, just settings

### DataProcessor.gs
- `getSheetData()` - Fetch data from Google Sheets
- `validateAndProcessData()` - Validate and filter data
- Handles all data validation rules

### MessageBuilder.gs
- `buildMessages()` - Build formatted messages
- Groups by month and version
- Handles message chunking (900 char limit)
- Adds QA mentions at the end

### WebhookService.gs
- `sendToWebhook()` - Send to Team Chat
- Builds interactive message payload
- Handles webhook response logging

### Main.gs
- `sendMonthlySchedule()` - Main execution flow
- `testSendSchedule()` - Manual test function
- Coordinates all components

### Triggers.gs
- `createTriggers()` - Setup automatic schedule
- `deleteTriggers()` - Remove all triggers
- `listTriggers()` - Show current triggers

## 🔧 Usage

### Manual Run
```javascript
// In Main.gs
testSendSchedule()
```

### Automatic Schedule
```javascript
// In Triggers.gs
createTriggers()  // Run once to setup
```

### View Triggers
```javascript
// In Triggers.gs
listTriggers()    // See all triggers
deleteTriggers()  // Delete all triggers
```

## 🎯 Benefits of Modular Structure

✅ **Easy to maintain** - Each file has single responsibility
✅ **Easy to update** - Change config without touching code
✅ **Easy to test** - Test individual components
✅ **Easy to understand** - Clear file organization
✅ **Reusable** - Can import logic to other projects

## 🆚 vs Single File

**Single File:**
- Simpler for small projects
- All in one place
- Harder to navigate when large

**Modular (This):**
- Better for production use
- Professional structure
- Easier collaboration
- Scales better

## 📝 Validation Rules

Data must meet these criteria to be sent:
- ✅ Week, Month, Version, Subteam, Status fields filled
- ✅ Status contains "Pending" or "Not Started"
- ❌ Status contains "Complete" → skipped
- ⚠️ Assigned QA empty → shows warning

## 🔗 Links

- [Google Apps Script Docs](https://developers.google.com/apps-script)
- [Team Chat Webhook API](https://docs.internal-chat.example/)

---

**Created by:** Bharata Aryaseta (Aryo)
**Version:** 2.0 (Modular)
**Last Updated:** 2024-12-02

