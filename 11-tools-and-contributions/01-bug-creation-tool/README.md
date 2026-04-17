# Bug Analyzer - Automated Bug Analysis Tool

> **Language / Bahasa:** [English](#english) | [Bahasa Indonesia](#bahasa-indonesia)

---

## English

### 📦 What's in This Repo

This repository contains tools for automated bug analysis and report generation using Cursor AI:

- **`bug-data.txt`** - Input file where you fill in bug information
- **`run_analyze.txt`** - Workflow instructions for Cursor AI
- **`result/`** - Output folder containing generated bug reports
- **`templates/`** - Templates for JIRA tickets, chat messages, and analysis summaries
- **`CHANGELOG.md`** - Version history and updates
- **`README.md`** - This file

### 🎯 Main Features

- AI-driven bug analysis using Cursor with TraceID log analysis
- Auto-detect error types (Hardy routing, SIP config, DB errors, etc.)
- Generate JIRA ticket templates (standardized format)
- Generate dev chat message templates
- Generate detailed technical analysis summaries
- Organize reports in structured folders: `[Bug_Title] - [RequestID]`

### 🚀 How to Use (3 Simple Steps)

#### Step 1: Fill in `bug-data.txt`

Open `bug-data.txt` and fill in your bug information:

```
TraceID/Request ID: b11ba3af43d5ddc97234603034d14500
Summary: KH Aitem in PDP showing unlisted, but available in VN Pshop
Environment: Test
Region: KH
Account (optional): shop_id=1013210527
Reproducible Steps (optional): 
1. Access PDP for item in KH
2. Observe item shows unlisted
3. Check same item in VN - shows available
Expected Result (optional): Item should be available in both regions
Actual Result (optional): Item unlisted in KH but available in VN
Error Response (optional): {"error":"10005","error_msg":"ERROR_SYSTEM"}
```

**Required Fields:**
- **TraceID/Request ID**: For log analysis (most important!)
- **Summary**: Brief description of the issue
- **Environment**: test/uat/staging/live
- **Region**: id/sg/my/th/ph/vn/kh/br/etc

**Optional Fields:**
- Account
- Reproducible Steps
- Expected Result
- Actual Result
- Error Response (JSON format)

#### Step 2: Run Analysis with Cursor

In Cursor, simply type:

```
run @run_analyze.txt
```

That's it! Cursor will:
1. Read bug data from `@bug-data.txt`
2. Use TraceID to analyze logs via `@QAFoundBugs`
3. Detect error type automatically
4. Create folder: `result/[Bug_Title] - [RequestID]/`
5. Generate 3 files using `@templates/`

#### Step 3: Use Generated Files

Open the generated folder in `result/` and:
1. **Copy `jira_ticket.txt`** → Paste to JIRA
2. **Copy `chat_message.txt`** → Send to dev team
3. **Review `ANALYSIS_SUMMARY.md`** → Technical details
4. **Update `[JIRA_TICKET_URL]`** in chat message after creating JIRA ticket

### 📁 Output Structure

```
result/
└── [Bug_Title] - [RequestID]/
    ├── jira_ticket.txt          # Ready-to-paste JIRA ticket
    ├── chat_message.txt         # Ready-to-send dev message
    └── ANALYSIS_SUMMARY.md      # Detailed technical analysis
```

### 💡 Example Usage

**Example 1: Hardy Routing Error**

`bug-data.txt`:
```
TraceID/Request ID: b11ba3af43d53c229506c8266b884d00
Summary: Item unlisted in KH but available in VN
Environment: Test
Region: KH
Account (optional): shop_id=1013210527
```

Run in Cursor:
```
run @run_analyze.txt
```

Output:
```
result/Item_unlisted_KH_available_VN - b11ba3af43d53c22/
├── jira_ticket.txt
├── chat_message.txt
└── ANALYSIS_SUMMARY.md
```

**Example 2: Address Validation Error**

`bug-data.txt`:
```
TraceID/Request ID: b11ba3af43c8609b9c3042d4ae197402
Summary: Checkout fails with invalid address
Environment: Test
Region: KH
Account (optional): user_id=7347400547
```

Run in Cursor:
```
run @run_analyze.txt
```

Output:
```
result/Checkout_fails_invalid_address - b11ba3af43c8609b/
    ├── jira_ticket.txt
    ├── chat_message.txt
    └── ANALYSIS_SUMMARY.md
```

### 🔍 Error Types Detected

The analyzer automatically detects these error types:

1. **Hardy Routing Error** - "routing out of range" → @DBA
2. **SIP Configuration Error** - "no open channels" → @SIP-Team
3. **Database Error** - Missing tables, schema issues → @DBA
4. **Address Validation Error** - Invalid address_id → @Logistics-Team
5. **Permission Error** - Access denied → @Platform-Team
6. **Service Error** - Generic service failures → @Service-Owner

### 📝 Templates

All templates are in `templates/` folder:

- **`jira_ticket_template.txt`** - Standardized JIRA ticket format
- **`chat_message_template.txt`** - Dev team notification format
- **`ANALYSIS_SUMMARY_template.md`** - Technical analysis format
- **`README.md`** - Template usage guide

You can customize these templates as needed.

### 🛠️ Workflow Details

The `run_analyze.txt` workflow:

1. **Collect** bug data from `@bug-data.txt`
2. **Analyze** logs using TraceID via `@QAFoundBugs`
3. **Detect** error type (SIP/DB/Hardy/Address/etc)
4. **Create** folder: `result/[Bug_Title] - [RequestID]`
5. **Generate** 3 files using templates
6. **Add** detailed root cause analysis (WHY, service, solution, teams, verification)

### 📊 Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

**Current Version: v2.2.0**
- Unified folder structure (merged bug_reporting_script → bug_creation)
- Input via `bug-data.txt` file
- Output to `result/` folder
- Simplified workflow with `run_analyze.txt`

---

## Bahasa Indonesia

### 📦 Isi Repository Ini

Repository ini berisi tools untuk analisis bug otomatis dan pembuatan laporan menggunakan Cursor AI:

- **`bug-data.txt`** - File input untuk mengisi informasi bug
- **`run_analyze.txt`** - Instruksi workflow untuk Cursor AI
- **`result/`** - Folder output berisi laporan bug yang dihasilkan
- **`templates/`** - Template untuk JIRA ticket, chat message, dan analysis summary
- **`CHANGELOG.md`** - Riwayat versi dan update
- **`README.md`** - File ini

### 🎯 Fitur Utama

- Analisis bug otomatis menggunakan Cursor AI dengan analisis log TraceID
- Deteksi otomatis tipe error (Hardy routing, SIP config, DB error, dll)
- Generate template JIRA ticket (format standar)
- Generate template chat message untuk dev team
- Generate ringkasan analisis teknis detail
- Organisasi laporan dalam folder terstruktur: `[Bug_Title] - [RequestID]`

### 🚀 Cara Menggunakan (3 Langkah Mudah)

#### Langkah 1: Isi `bug-data.txt`

Buka `bug-data.txt` dan isi informasi bug:

```
TraceID/Request ID: b11ba3af43d5ddc97234603034d14500
Summary: KH Aitem di PDP menunjukkan unlisted, tapi tersedia di VN Pshop
Environment: Test
Region: KH
Account (optional): shop_id=1013210527
Reproducible Steps (optional): 
1. Akses PDP untuk item di KH
2. Lihat item menunjukkan unlisted
3. Cek item yang sama di VN - menunjukkan available
Expected Result (optional): Item harus tersedia di kedua region
Actual Result (optional): Item unlisted di KH tapi available di VN
Error Response (optional): {"error":"10005","error_msg":"ERROR_SYSTEM"}
```

**Field Wajib:**
- **TraceID/Request ID**: Untuk analisis log (paling penting!)
- **Summary**: Deskripsi singkat masalah
- **Environment**: test/uat/staging/live
- **Region**: id/sg/my/th/ph/vn/kh/br/dll

**Field Opsional:**
- Account
- Reproducible Steps
- Expected Result
- Actual Result
- Error Response (format JSON)

#### Langkah 2: Jalankan Analisis dengan Cursor

Di Cursor, ketik saja:

```
run @run_analyze.txt
```

Selesai! Cursor akan:
1. Baca data bug dari `@bug-data.txt`
2. Gunakan TraceID untuk analisis log via `@QAFoundBugs`
3. Deteksi tipe error secara otomatis
4. Buat folder: `result/[Bug_Title] - [RequestID]/`
5. Generate 3 file menggunakan `@templates/`

#### Langkah 3: Gunakan File yang Dihasilkan

Buka folder yang dihasilkan di `result/` dan:
1. **Copy `jira_ticket.txt`** → Paste ke JIRA
2. **Copy `chat_message.txt`** → Kirim ke dev team
3. **Review `ANALYSIS_SUMMARY.md`** → Detail teknis
4. **Update `[JIRA_TICKET_URL]`** di chat message setelah buat JIRA ticket

### 📁 Struktur Output

```
result/
└── [Bug_Title] - [RequestID]/
    ├── jira_ticket.txt          # JIRA ticket siap paste
    ├── chat_message.txt         # Pesan dev siap kirim
    └── ANALYSIS_SUMMARY.md      # Analisis teknis detail
```

### 💡 Contoh Penggunaan

**Contoh 1: Hardy Routing Error**

`bug-data.txt`:
```
TraceID/Request ID: b11ba3af43d53c229506c8266b884d00
Summary: Item unlisted di KH tapi available di VN
Environment: Test
Region: KH
Account (optional): shop_id=1013210527
```

Jalankan di Cursor:
```
run @run_analyze.txt
```

Output:
```
result/Item_unlisted_KH_available_VN - b11ba3af43d53c22/
├── jira_ticket.txt
├── chat_message.txt
└── ANALYSIS_SUMMARY.md
```

**Contoh 2: Address Validation Error**

`bug-data.txt`:
```
TraceID/Request ID: b11ba3af43c8609b9c3042d4ae197402
Summary: Checkout gagal dengan invalid address
Environment: Test
Region: KH
Account (optional): user_id=7347400547
```

Jalankan di Cursor:
```
run @run_analyze.txt
```

Output:
```
result/Checkout_gagal_invalid_address - b11ba3af43c8609b/
    ├── jira_ticket.txt
    ├── chat_message.txt
    └── ANALYSIS_SUMMARY.md
```

### 🔍 Tipe Error yang Terdeteksi

Analyzer otomatis mendeteksi tipe error ini:

1. **Hardy Routing Error** - "routing out of range" → @DBA
2. **SIP Configuration Error** - "no open channels" → @SIP-Team
3. **Database Error** - Missing tables, schema issues → @DBA
4. **Address Validation Error** - Invalid address_id → @Logistics-Team
5. **Permission Error** - Access denied → @Platform-Team
6. **Service Error** - Generic service failures → @Service-Owner

### 📝 Template

Semua template ada di folder `templates/`:

- **`jira_ticket_template.txt`** - Format JIRA ticket standar
- **`chat_message_template.txt`** - Format notifikasi dev team
- **`ANALYSIS_SUMMARY_template.md`** - Format analisis teknis
- **`README.md`** - Panduan penggunaan template

Anda bisa customize template sesuai kebutuhan.

### 🛠️ Detail Workflow

Workflow `run_analyze.txt`:

1. **Collect** data bug dari `@bug-data.txt`
2. **Analyze** log menggunakan TraceID via `@QAFoundBugs`
3. **Detect** tipe error (SIP/DB/Hardy/Address/dll)
4. **Create** folder: `result/[Bug_Title] - [RequestID]`
5. **Generate** 3 file menggunakan template
6. **Add** analisis root cause detail (WHY, service, solution, teams, verification)

### 📊 Riwayat Versi

Lihat [CHANGELOG.md](CHANGELOG.md) untuk riwayat versi lengkap.

**Versi Saat Ini: v2.2.0**
- Struktur folder terpadu (merge bug_reporting_script → bug_creation)
- Input via file `bug-data.txt`
- Output ke folder `result/`
- Workflow sederhana dengan `run_analyze.txt`

---

## 📞 Support

Jika ada pertanyaan atau issue, silakan buat JIRA ticket atau hubungi tim QA.

## 📄 License

Internal use only - Marketplace QA Team
