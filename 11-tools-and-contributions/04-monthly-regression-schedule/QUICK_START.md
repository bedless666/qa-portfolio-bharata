# ⚡ Quick Start Guide - 5 Minutes Setup

Cara cepat install Monthly Regression Schedule di Google Apps Script.

---

## 🎯 Setup in 5 Steps

### 1️⃣ Open Apps Script (30 sec)

```
Google Sheet → Extensions → Apps Script
```

### 2️⃣ Create 3 Files (2 min)

Click **+** → Script → Name it → Copy-paste code:

| File Name | Copy From | Lines |
|-----------|-----------|-------|
| `Config.gs` | See below ↓ | ~20 |
| `Main.gs` | `google-apps-script-simple/Main.gs` | ~300 |
| `Triggers.gs` | See below ↓ | ~30 |

### 3️⃣ Edit Config (1 min)

Update these in `Config.gs`:
```javascript
WEBHOOK_URL: 'YOUR_WEBHOOK_URL_HERE',     // ← Required
SPREADSHEET_ID: 'YOUR_SHEET_ID_HERE',     // ← Required
```

💡 Get Sheet ID from URL:
```
https://docs.google.com/.../d/19nAfyhqtf-Evdl78peuoDOvs6SIoo9j0bpgvf1lIYAM/edit
                           ↑ THIS IS YOUR SHEET ID ↑
```

### 4️⃣ Test Run (1 min)

```
Main.gs → Select: testSendSchedule → Run ▶️
→ Grant permissions → Check Team Chat ✅
```

### 5️⃣ Setup Trigger (30 sec)

```
Triggers.gs → Select: createTriggers → Run ▶️
→ Check sidebar: ⏰ Triggers → Done! ✅
```

---

## 📋 Code Templates

### Config.gs (Copy This)

```javascript
const CONFIG = {
  WEBHOOK_URL: 'https://webhooks.company.example/webhook/group/YOUR_WEBHOOK_GROUP_ID',
  SPREADSHEET_ID: 'YOUR_SHEET_ID_HERE',
  SHEET_NAME: 'Regression PIC',
  MAX_DESCRIPTION_LENGTH: 900,
  BUTTON_LINK: 'https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit',
  TRIGGER_DAY: 1,
  TRIGGER_HOUR: 9
};
```

### Triggers.gs (Copy This)

```javascript
function createTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  ScriptApp.newTrigger('sendMonthlySchedule')
    .timeBased()
    .onMonthDay(CONFIG.TRIGGER_DAY)
    .atHour(CONFIG.TRIGGER_HOUR)
    .create();
  
  Logger.log(`✅ Trigger created: Run on day ${CONFIG.TRIGGER_DAY} at ${CONFIG.TRIGGER_HOUR}:00`);
}

function deleteTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  Logger.log(`✅ Deleted ${triggers.length} trigger(s)`);
}

function listTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  Logger.log(`Found ${triggers.length} trigger(s):`);
  triggers.forEach((trigger, index) => {
    Logger.log(`\n${index + 1}. Function: ${trigger.getHandlerFunction()}`);
  });
}
```

### Main.gs

Get from: `monthly-regression-schedule/google-apps-script-simple/Main.gs`

---

## ✅ Success Checklist

```
[ ] 3 files created
[ ] Config updated with webhook & sheet ID
[ ] Test run successful
[ ] Message received in Team Chat
[ ] Trigger created
```

---

## 🐛 Common Issues

### No data sent?
→ Check status contains "Pending" or "Not Started"

### Permission error?
→ Click "Advanced" → "Go to ... (unsafe)" → Allow

### Trigger not working?
→ Check sidebar ⏰ Triggers → Re-run `createTriggers()`

### Message not received?
→ Test webhook with curl or check webhook URL

---

## 📊 Data Requirements

```
Required columns: Week | Month | Version | Subteam | Assigned QA | Status
Valid Status: "Pending", "Not Started" (Complete = skip)
```

---

## 🎓 More Help?

Read full guide: **INSTALLATION_GUIDE.md**

---

**Setup Time:** ~5 minutes
**Maintenance:** Almost zero
**Auto-run:** Every month, day 1, 9 AM

🚀 **Happy automating!**


