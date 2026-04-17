# Sync Status: Google Apps Script ↔ Local Node.js

Last synced: 2024-12-02

## ✅ Synchronized Components

Both versions (Google Apps Script and Local Node.js) are now **100% synced** with identical functionality:

### Configuration
- ✅ Webhook URL: `YOUR_PRODUCTION_WEBHOOK_TOKEN`
- ✅ Spreadsheet ID: `19nAfyhqtf-Evdl78peuoDOvs6SIoo9j0bpgvf1lIYAM`
- ✅ Sheet Name: `Regression PIC`
- ✅ Max Description Length: `900 chars`
- ✅ Button Link: Full Google Sheets URL

### Logic
- ✅ Data validation rules (same)
- ✅ Message formatting (same)
- ✅ QA mention handling (same)
- ✅ Message chunking (same)
- ✅ Webhook payload structure (same)

### Scheduling
- ✅ Google Apps Script: Time-based trigger (Day 1, 9 AM)
- ✅ Local Node.js: Cron job (`0 9 1 * *`)

## 📂 File Structure Comparison

### Google Apps Script (Modular)
```
google-apps-script/
├── Config.gs           → Settings
├── DataProcessor.gs    → Data validation
├── MessageBuilder.gs   → Message formatting
├── WebhookService.gs   → Webhook communication
├── Main.gs             → Execution flow
├── Triggers.gs         → Trigger management
└── README.md           → Documentation
```

### Local Node.js (Modular)
```
monthly-regression-schedule/
├── config.js           → Settings
├── scheduler.js        → All logic (data + message + webhook)
├── cron.js             → Cron scheduler
├── package.json        → Dependencies
├── credentials.json    → Google Service Account
├── .gitignore          → Git ignore rules
└── README.md           → Documentation
```

## 🔄 When to Update Both

**ALWAYS keep both versions synced** when changing:

1. ✅ **Webhook URL** → Update both `Config.gs` and `config.js`
2. ✅ **Spreadsheet ID** → Update both
3. ✅ **Validation rules** → Update both logic files
4. ✅ **Message format** → Update both message builders
5. ✅ **Button link** → Update both configs

## 🎯 Use Case for Each Version

### Use Google Apps Script When:
- ✅ Running from Google Cloud (serverless)
- ✅ No local server available
- ✅ Want simple trigger setup
- ✅ Prefer Google ecosystem

### Use Local Node.js When:
- ✅ Running on own server
- ✅ Need more control
- ✅ Want version control integration
- ✅ Prefer Node.js environment

## 🚨 Breaking Changes Checklist

Before deploying changes, verify:

- [ ] Webhook URL matches in both versions
- [ ] Validation logic is identical
- [ ] Message format produces same output
- [ ] Both versions tested and working
- [ ] Documentation updated

## 📝 Version History

| Date | Google Apps Script | Local Node.js | Changes |
|------|-------------------|---------------|---------|
| 2024-12-02 | v2.0 (Modular) | v1.1 (Synced) | Initial modular structure, synced webhook |
| 2024-12-01 | v1.0 (Single) | v1.0 | Original versions, different webhooks |

## 🔗 Related Documentation

- [Google Apps Script README](./google-apps-script/README.md)
- [Local Node.js README](./README.md)
- [Configuration Guide](./config.js)

---

**Maintained by:** Bharata Aryaseta (Aryo)
**Status:** ✅ Synced and Production Ready

