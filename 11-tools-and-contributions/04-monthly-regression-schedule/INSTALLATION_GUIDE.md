# 📘 Installation Guide - Google Apps Script

Step-by-step cara install Monthly Regression Schedule di Google Apps Script.

---

## 🎯 Prerequisites

Yang kamu butuhkan:
- ✅ Google Account
- ✅ Google Sheet dengan data Regression PIC
- ✅ Seatalk Group Chat dengan webhook URL
- ✅ Google Apps Script Editor (built-in di Google Sheets)

---

## 📂 Pilih Version

Ada 2 pilihan:

### Option 1: **Simple Version** ✅ Recommended
- **3 files** saja (`Config.gs`, `Main.gs`, `Triggers.gs`)
- Paling mudah untuk setup
- Cocok untuk most users

### Option 2: Modular Version
- 6 files (lebih organized)
- Cocok untuk large teams

**Tutorial ini pakai Simple Version** (paling gampang!)

---

## 🚀 Installation Steps

### Step 1: Buka Google Apps Script Editor

1. Buka **Google Sheet** kamu yang berisi data Regression PIC
2. Klik menu **Extensions** → **Apps Script**

![Apps Script Menu](https://i.imgur.com/example1.png)

3. Kamu akan dibawa ke Apps Script Editor (tab baru)

---

### Step 2: Delete Default Code

1. Kamu akan lihat file `Code.gs` yang sudah ada
2. **Delete semua isi** file `Code.gs` (kosongkan)
3. Atau rename jadi file lain (bebas)

---

### Step 3: Create 3 Files

Sekarang kita buat 3 files baru:

#### 3.1 Create File `Config.gs`

1. Klik **+** di sebelah **Files**
2. Pilih **Script**
3. Kasih nama: `Config`
4. Copy-paste code ini:

```javascript
/**
 * Configuration - Edit settings here
 */

const CONFIG = {
  // Seatalk Webhook URL
  WEBHOOK_URL: 'https://openapi.seatalk.io/webhook/group/7BTJoSlqSnKFhaYOAnD1Aw',
  
  // Google Sheets Settings
  SPREADSHEET_ID: '19nAfyhqtf-Evdl78peuoDOvs6SIoo9j0bpgvf1lIYAM',
  SHEET_NAME: 'Regression PIC',
  
  // Message Settings
  MAX_DESCRIPTION_LENGTH: 900,
  
  // Button Link
  BUTTON_LINK: 'https://docs.google.com/spreadsheets/d/19nAfyhqtf-Evdl78peuoDOvs6SIoo9j0bpgvf1lIYAM/edit?gid=398695652#gid=398695652&range=A24',
  
  // Trigger Schedule
  TRIGGER_DAY: 1,  // Day of month
  TRIGGER_HOUR: 9  // Hour (0-23)
};
```

5. **EDIT** nilai-nilai ini sesuai kebutuhan kamu:
   - `WEBHOOK_URL` → Ganti dengan webhook URL group chat kamu
   - `SPREADSHEET_ID` → ID spreadsheet kamu (lihat di URL)
   - `SHEET_NAME` → Nama sheet (default: `Regression PIC`)
   - `BUTTON_LINK` → Link ke sheet kamu

💡 **Cara dapetin Spreadsheet ID:**
```
https://docs.google.com/spreadsheets/d/19nAfyhqtf-Evdl78peuoDOvs6SIoo9j0bpgvf1lIYAM/edit
                                      ↑ INI SPREADSHEET ID ↑
```

#### 3.2 Create File `Main.gs`

1. Klik **+** lagi
2. Pilih **Script**
3. Kasih nama: `Main`
4. Copy-paste code dari file: `google-apps-script-simple/Main.gs`

📂 **Lokasi file:** `monthly-regression-schedule/google-apps-script-simple/Main.gs`

> File ini agak panjang (~300 lines), tapi cukup copy-paste saja!

#### 3.3 Create File `Triggers.gs`

1. Klik **+** lagi
2. Pilih **Script**
3. Kasih nama: `Triggers`
4. Copy-paste code ini:

```javascript
/**
 * Trigger Management
 * Run createTriggers() once to setup automatic monthly execution
 */

function createTriggers() {
  // Delete existing triggers to avoid duplicates
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Create new trigger
  ScriptApp.newTrigger('sendMonthlySchedule')
    .timeBased()
    .onMonthDay(CONFIG.TRIGGER_DAY)
    .atHour(CONFIG.TRIGGER_HOUR)
    .create();
  
  Logger.log(`✅ Trigger created: Run on day ${CONFIG.TRIGGER_DAY} at ${CONFIG.TRIGGER_HOUR}:00`);
}

/**
 * Delete all triggers
 */
function deleteTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  Logger.log(`✅ Deleted ${triggers.length} trigger(s)`);
}

/**
 * List all triggers
 */
function listTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  Logger.log(`Found ${triggers.length} trigger(s):`);
  triggers.forEach((trigger, index) => {
    Logger.log(`\n${index + 1}. Function: ${trigger.getHandlerFunction()}`);
    Logger.log(`   Trigger ID: ${trigger.getUniqueId()}`);
    Logger.log(`   Event Type: ${trigger.getEventType()}`);
  });
}
```

---

### Step 4: Save Project

1. Klik **💾 Save project** (atau Ctrl+S / Cmd+S)
2. Kasih nama project: `Monthly Regression Schedule`

Sekarang kamu punya 3 files:
```
📁 Monthly Regression Schedule
├── Config.gs      ✅
├── Main.gs        ✅
└── Triggers.gs    ✅
```

---

### Step 5: Test Manual Run

Sebelum setup trigger, test dulu manual:

1. Buka file **Main.gs**
2. Pilih function: **`testSendSchedule`** (dropdown di atas)
3. Klik **▶️ Run**
4. **First time:** Kamu akan diminta **grant permissions**
   - Klik **Review Permissions**
   - Pilih Google Account kamu
   - Klik **Advanced** → **Go to Monthly Regression Schedule (unsafe)**
   - Klik **Allow**
5. Tunggu execution selesai
6. Klik **View** → **Execution log** untuk lihat hasilnya

✅ **Expected Output:**
```
=== START EXECUTION ===
✅ Header found at row: 24
Start Row: 27
...
Valid schedule items: 6
...
✅ Message sent successfully!
=== EXECUTION COMPLETE ===
```

7. **Check Seatalk group chat** → Message harus sudah terkirim! 🎉

---

### Step 6: Setup Automatic Trigger

Kalau test berhasil, setup trigger untuk auto-run monthly:

1. Buka file **Triggers.gs**
2. Pilih function: **`createTriggers`** (dropdown)
3. Klik **▶️ Run**
4. Check **Execution log** → harus ada:
   ```
   ✅ Trigger created: Run on day 1 at 9:00
   ```

5. **Verify trigger:**
   - Buka **⏰ Triggers** (icon clock di sidebar kiri)
   - Kamu akan lihat trigger baru:
     ```
     Function: sendMonthlySchedule
     Event: Time-driven
     Time: Day 1 of month, 9 AM
     ```

✅ **Done!** Script akan otomatis jalan setiap tanggal 1, jam 9 pagi!

---

## ⚙️ Customization

### Ubah Schedule Time

Edit di **Config.gs**:
```javascript
TRIGGER_DAY: 5,   // Run on day 5 of month
TRIGGER_HOUR: 14  // Run at 2 PM
```

Lalu run `deleteTriggers()` → `createTriggers()` lagi.

### Ubah Webhook URL

Edit di **Config.gs**:
```javascript
WEBHOOK_URL: 'https://openapi.seatalk.io/webhook/group/YOUR_NEW_WEBHOOK'
```

### Ubah Sheet Name

Edit di **Config.gs**:
```javascript
SHEET_NAME: 'Your Sheet Name'
```

---

## 🐛 Troubleshooting

### Problem 1: "Schedule header not found"

**Solusi:**
- Pastikan sheet kamu punya text "**RN Live Regression QA**"
- Script akan cari text ini untuk tahu mulai dari mana

### Problem 2: "No valid schedule found"

**Solusi:**
- Check **Execution log** → akan ada detail row mana yang di-skip
- Validasi data:
  - Week, Month, Version, Subteam, Status **harus terisi**
  - Status harus **"Pending"** atau **"Not Started"**
  - Status **"Complete"** akan di-skip

### Problem 3: Message tidak terkirim

**Solusi:**
- Check webhook URL di `Config.gs` sudah benar
- Check **Execution log** → ada error message
- Test webhook manual pakai curl:
  ```bash
  curl -X POST YOUR_WEBHOOK_URL \
    -H "Content-Type: application/json" \
    -d '{"tag":"text","text":{"content":"Test"}}'
  ```

### Problem 4: "Permission denied"

**Solusi:**
- Re-authorize script:
  - Run function lagi
  - Klik **Review Permissions**
  - Allow semua permissions yang diminta

### Problem 5: Trigger tidak jalan

**Solusi:**
- Check trigger masih aktif:
  - Buka **⏰ Triggers** sidebar
  - Pastikan trigger ada
- Re-create trigger:
  - Run `deleteTriggers()`
  - Run `createTriggers()`

---

## 📊 Data Format Requirements

Sheet kamu harus punya struktur seperti ini:

```
| Week | Month    | Version | Subteam | Assigned QA           | Status         |
|------|----------|---------|---------|----------------------|----------------|
| 1    | November | 12.v1   | QAOD    | bharata@shopee.com   | 🔄 Pending     |
| 2    | November | 12.v1   | QAOD    | ovi@shopee.com       | ❌ Not Started |
| 3    | November | 12.v2   | QAOD    | anisa@shopee.com     | ✅ Complete    |
```

**Required columns:**
1. Week
2. Month
3. Version
4. Subteam
5. Assigned QA (boleh kosong - akan kasih warning)
6. Status

**Valid Status values:**
- ✅ "Pending" atau "🔄 Pending"
- ✅ "Not Started" atau "❌ Not Started"
- ❌ "Complete" → akan di-skip

---

## 🔄 Update Script

Kalau ada update code:

1. Copy code terbaru
2. Paste ke file yang sesuai (Config/Main/Triggers)
3. Save
4. Test dengan `testSendSchedule()`

---

## 🎓 Advanced: View Logs

Untuk debug atau monitoring:

1. **Real-time logs:**
   - Saat run function, klik **View** → **Execution log**

2. **Historical logs:**
   - Klik **⏰ Executions** (sidebar)
   - Pilih execution yang mau di-check
   - Klik untuk lihat logs

3. **Check triggers:**
   - Run `listTriggers()` di Triggers.gs

---

## 📞 Support

Kalau ada masalah:

1. Check **Execution log** untuk error details
2. Re-read troubleshooting section di atas
3. Contact: Bharata Aryaseta (Aryo)

---

## 🎉 Success Checklist

- [x] 3 files created (Config, Main, Triggers)
- [x] Config updated with your webhook & sheet ID
- [x] Manual test successful (`testSendSchedule()`)
- [x] Message received in Seatalk ✅
- [x] Trigger created (`createTriggers()`)
- [x] Trigger visible in Triggers sidebar ✅

**Congrats! Setup complete!** 🚀

Script akan otomatis kirim schedule setiap bulan! 📅

---

**Version:** 2.0 (Simple)
**Last Updated:** 2024-12-02
**Created by:** Bharata Aryaseta (Aryo)

