# Monthly Regression Schedule Automation

Automated script untuk mengirim jadwal RN Live Regression bulanan ke Seatalk.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Google Sheets API

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project atau pilih existing project
3. Enable **Google Sheets API**
4. Create **Service Account**:
   - Go to "IAM & Admin" → "Service Accounts"
   - Click "Create Service Account"
   - Give it a name (e.g., "monthly-regression-bot")
   - Download JSON key
5. Rename downloaded file jadi `credentials.json` dan taruh di folder ini
6. **Share Google Sheet** dengan service account email (ada di `credentials.json`)
   - Buka spreadsheet
   - Click "Share"
   - Paste service account email
   - Give "Viewer" access

### 3. Update Config (Optional)

Edit `config.js` kalau perlu ubah:
- Webhook URL
- Spreadsheet ID
- Schedule timing

### 4. Run

**Manual run:**
```bash
npm start
```

**With cron scheduler:**
```bash
node cron.js
```

## 📋 File Structure

```
monthly-regression-schedule/
├── config.js          # Configuration (webhook, spreadsheet, etc)
├── scheduler.js       # Main script logic
├── cron.js           # Cron scheduler (auto-run every month)
├── package.json      # Dependencies
├── credentials.json  # Google Service Account (GITIGNORE!)
└── README.md         # This file
```

## ⚙️ Configuration

Edit `config.js`:

```javascript
module.exports = {
  WEBHOOK_URL: 'your-seatalk-webhook-url',
  SPREADSHEET_ID: 'your-spreadsheet-id',
  SHEET_NAME: 'Regression PIC',
  MAX_DESCRIPTION_LENGTH: 900,
  SCHEDULE_CRON: '0 9 1 * *', // 9 AM every 1st day of month
  TIMEZONE: 'Asia/Singapore'
};
```

## 🔒 Security

**JANGAN commit `credentials.json` ke Git!**

Buat `.gitignore`:
```
credentials.json
node_modules/
```

## 📊 How It Works

1. **Fetch data** dari Google Sheets
2. **Validate** setiap row:
   - Week, Month, Version, Subteam, Status harus terisi
   - Status harus "Pending" atau "Not Started"
   - QA boleh kosong (akan muncul warning)
3. **Group** data by Month → Version
4. **Build message** dengan format clean
5. **Split** jadi multiple descriptions (max 900 chars each)
6. **Collect** semua QA emails untuk mention di bawah
7. **Send** ke Seatalk webhook

## 🗓️ Schedule

Default: **Hari ke-1 setiap bulan jam 9 pagi**

Ubah di `config.js`:
```javascript
SCHEDULE_CRON: '0 9 1 * *'  // Cron format
```

Cron format:
```
* * * * *
│ │ │ │ │
│ │ │ │ └─── Day of Week (0-7, Sunday is 0 or 7)
│ │ │ └───── Month (1-12)
│ │ └─────── Day of Month (1-31)
│ └───────── Hour (0-23)
└─────────── Minute (0-59)
```

## 🐛 Troubleshooting

### Error: "Schedule header not found"
- Pastikan sheet memiliki header "RN Live Regression QA"

### Error: "ENOTFOUND" or "Network error"
- Check koneksi internet
- Verify webhook URL masih valid

### Error: "Invalid credentials"
- Re-download credentials.json
- Pastikan service account punya akses ke spreadsheet

### Error: "code: 102" (Invalid parameters)
- Message terlalu panjang (> 1000 chars)
- Script akan auto-split, tapi bisa adjust MAX_DESCRIPTION_LENGTH

## 📝 Output Format

```
🗓️ RN Live Regression Schedule

📅 November 2025

📱 Version 11.v4
```
• anisa.karina (Buyer) - Week 4
  Status: 🔄 Pending
• mirza.pradana (Seller) - Week 4
  Status: 🔄 Pending
```

📅 December 2025

📱 Version 12.v1
```
• bharata.aryaseta (Promotion) - Week 3
  Status: ❌ Not Started
```

📋 Reminders
```
• Coordinate with your team if you have any changes...
```

Happy testing! 🚀

Assigned QA:
- @anisa.karina
- @bharata.aryaseta
- @mirza.pradana
```

## 🔗 Related

- Google Apps Script version: Available in Google Sheets Extensions
- Seatalk API Docs: [System Account Documentation](../System%20Account%20Docs/)

---

**Last Updated:** December 2025  
**Author:** Bharata Aryaseta

