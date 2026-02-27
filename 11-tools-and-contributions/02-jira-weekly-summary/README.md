# JIRA Weekly Summary - Python Implementation

Python-based automation untuk mengirim JIRA Weekly Summary ke SeaTalk.

## 📁 Struktur Folder

```
jira-weekly-python/
├── jira_weekly.py       # Main Python script
├── config.yaml          # Konfigurasi teams & webhooks
├── requirements.txt     # Python dependencies
├── run_cronjob.sh       # Bash wrapper untuk cronjob
├── README.md            # Dokumentasi ini
├── logs/                # Log files (auto-created)
└── temp/                # Temporary files (auto-created)
```

## 🚀 Setup

### 1. Install Dependencies

```bash
# Buat virtual environment (opsional tapi recommended)
python3 -m venv venv
source venv/bin/activate  # Di Mac/Linux
# atau: venv\Scripts\activate  # Di Windows

# Install packages
pip install -r requirements.txt
```

### 2. Konfigurasi

Edit `config.yaml` jika perlu update:

**Global Settings:**
- JIRA PAT token
- JIRA API URL

**Per-Team Settings:**
- `jira_filter`: JIRA filter ID untuk team tersebut
- `webhook_test`: Webhook ID untuk TEST mode
- `webhook_production`: Webhook ID untuk PRODUCTION mode
- `members`: List email members (array)

**Config Structure:**
```yaml
teams:
  all_teams:        # Untuk All Teams mode
    jira_filter: 147119
    webhook_test: "xxx"
    webhook_production: "yyy"
    message1:       # Buyer + Seller
    message2:       # Order Ops + Promotion
  
  buyer:            # Untuk Single Team mode
    jira_filter: 149233
    webhook_test: "xxx"
    webhook_production: "yyy"
    members: [...]
  
  # seller_fulfillment, promotion, order_ops...
```

**Note:** Script akan otomatis memilih section config yang sesuai berdasarkan `--team` argument.

## 💻 Cara Pakai

Script ini support **2 mode**:

| Mode | Command | Output | Use Case |
|------|---------|--------|----------|
| **All Teams** | `python3 jira_weekly.py --mode <test\|production>` | 2 messages:<br>• Message 1: Buyer + Seller<br>• Message 2: Order Ops + Promotion | Weekly summary untuk semua teams sekaligus |
| **Single Team** | `python3 jira_weekly.py --team <team_name> --mode <test\|production>` | 1 message per team dengan button ke JIRA filter | Daily/weekly summary untuk 1 team spesifik |

**Team Names:**
- `buyer`
- `seller_fulfillment`
- `promotion`
- `order_ops`

### All Teams Mode

**Test Mode (kirim ke TEST webhook):**
```bash
python3 jira_weekly.py --mode test
```

**Production Mode (kirim ke PRODUCTION webhook):**
```bash
python3 jira_weekly.py --mode production
```

### Single Team Mode

**Buyer Team:**
```bash
python3 jira_weekly.py --team buyer --mode test
python3 jira_weekly.py --team buyer --mode production
```

**Seller-Fulfillment Team:**
```bash
python3 jira_weekly.py --team seller_fulfillment --mode test
python3 jira_weekly.py --team seller_fulfillment --mode production
```

**Promotion Team:**
```bash
python3 jira_weekly.py --team promotion --mode test
python3 jira_weekly.py --team promotion --mode production
```

**Order Ops Team:**
```bash
python3 jira_weekly.py --team order_ops --mode test
python3 jira_weekly.py --team order_ops --mode production
```

### Custom Config File

```bash
python3 jira_weekly.py --mode test --config my_config.yaml
python3 jira_weekly.py --team buyer --mode test --config my_config.yaml
```

### Cronjob Setup

**1. Buat executable:**
```bash
chmod +x run_cronjob.sh
```

**2. Edit crontab:**
```bash
crontab -e
```

**3. Tambahkan cronjob:**

```bash
# All Teams - Setiap Kamis jam 14:00
0 14 * * 4 /Users/bharata.aryaseta/Documents/Docs/Bharata\ Repository/01-Work-Projects/jira-weekly-python/run_cronjob.sh

# Atau dengan full path python:
0 14 * * 4 cd /Users/bharata.aryaseta/Documents/Docs/Bharata\ Repository/01-Work-Projects/jira-weekly-python && /usr/bin/python3 jira_weekly.py --mode production

# Single Team - Buyer setiap Jumat jam 10:00
0 10 * * 5 cd /Users/bharata.aryaseta/Documents/Docs/Bharata\ Repository/01-Work-Projects/jira-weekly-python && /usr/bin/python3 jira_weekly.py --team buyer --mode production

# Single Team - Seller setiap Jumat jam 10:00
0 10 * * 5 cd /Users/bharata.aryaseta/Documents/Docs/Bharata\ Repository/01-Work-Projects/jira-weekly-python && /usr/bin/python3 jira_weekly.py --team seller_fulfillment --mode production
```

**Cronjob Schedule Examples:**
```bash
# All Teams - Setiap Kamis jam 14:00
0 14 * * 4 /path/to/run_cronjob.sh

# Single Team (Buyer) - Setiap Senin jam 09:00
0 9 * * 1 cd /path/to/jira-weekly-python && python3 jira_weekly.py --team buyer --mode production

# Single Team (Promotion) - Setiap hari kerja jam 10:00
0 10 * * 1-5 cd /path/to/jira-weekly-python && python3 jira_weekly.py --team promotion --mode production

# Multiple Teams di waktu berbeda:
0 9 * * 1 cd /path/to/jira-weekly-python && python3 jira_weekly.py --team buyer --mode production
0 10 * * 1 cd /path/to/jira-weekly-python && python3 jira_weekly.py --team seller_fulfillment --mode production
0 11 * * 1 cd /path/to/jira-weekly-python && python3 jira_weekly.py --team promotion --mode production
0 12 * * 1 cd /path/to/jira-weekly-python && python3 jira_weekly.py --team order_ops --mode production
```

## 📊 Features

✅ **Dual Mode Support**
- **All Teams Mode**: 2 messages untuk 4 teams (Buyer+Seller, Order Ops+Promotion)
- **Single Team Mode**: 1 message per team dengan button ke JIRA filter masing-masing

✅ **Automatic JIRA Data Fetching**
- Menggunakan JIRA REST API
- Support multiple teams & filters
- Dynamic filter selection per team

✅ **Smart Message Building**
- Auto-split konten untuk avoid character limit (max 850 chars per element)
- Prevents splitting within member task blocks (maintain code block integrity)
- Section headers always start new elements (no orphaned headers)
- Clean summary tanpa JIRA keys
- Proper member mentions

✅ **Robust Error Handling**
- Comprehensive logging
- Graceful error recovery
- HTTP error handling
- Character limit protection (buffer 150 chars dari 1000-rune limit)

✅ **Production Ready**
- Configurable via YAML
- Support test & production modes
- Cronjob-friendly
- Detailed logs untuk debugging

## 📝 Logs

Log files disimpan di folder `logs/`:
```
logs/jira_weekly_20260107_140532.log
```

Log berisi:
- Execution timestamp
- JIRA fetch status
- Message building progress
- Webhook send results
- Error messages (jika ada)

## 🔧 Troubleshooting

**1. Import Error: No module named 'yaml'**
```bash
pip install PyYAML
```

**2. Permission Denied**
```bash
chmod +x jira_weekly.py
chmod +x run_cronjob.sh
```

**3. Cronjob Not Running**
- Check crontab: `crontab -l`
- Check system logs: `grep CRON /var/log/syslog` (Linux)
- Check path: Use full absolute paths
- Check permissions: Script must be executable

**4. JIRA API Error**
- Verify PAT token di config.yaml
- Check JIRA filter ID
- Verify network connectivity

**5. Webhook Error**
- Check webhook ID di config.yaml
- Verify SeaTalk group access
- Check message format (max 1000 chars per element)

## 🎯 Next Steps

Untuk menggunakan di production:

**All Teams Mode:**
1. ✅ Test manual execution: `python3 jira_weekly.py --mode test`
2. ✅ Verify 2 messages di TEST SeaTalk group
3. ✅ Setup cronjob untuk production
4. ✅ Monitor logs

**Single Team Mode:**
1. ✅ Test each team: 
   - `python3 jira_weekly.py --team buyer --mode test`
   - `python3 jira_weekly.py --team seller_fulfillment --mode test`
   - `python3 jira_weekly.py --team promotion --mode test`
   - `python3 jira_weekly.py --team order_ops --mode test`
2. ✅ Verify messages & button links di TEST SeaTalk group
3. ✅ Setup cronjob untuk production (bisa semua teams atau selective)
4. ✅ Monitor logs untuk pastikan jalan dengan baik

## 📞 Support

Jika ada issue, check:
1. Log file di folder `logs/`
2. Cronjob log: `cronjob.log`
3. System cron logs

---

**Last Updated:** January 7, 2026
**Version:** 1.0.0

