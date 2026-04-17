# 🐍 Shop Activation - Python Version

Python script untuk automasi shop activation yang bisa dijalankan di **cronjob** secara otomatis.

## 📋 Overview

Script ini melakukan:
1. ✅ Parse CSV file (test atau production)
2. ✅ Activate semua shops via Shark API
3. ✅ Create JIRA ticket dengan hasil aktivasi
4. ✅ Send Team Chat notification (test atau production group)
5. ✅ Logging lengkap ke file

---

## 🚀 Quick Start

### **1. Setup (One-time)**

```bash
# Install dependencies
pip3 install -r requirements.txt

# Make scripts executable
chmod +x run_test.sh
chmod +x run_production.sh
chmod +x activate_shops.py
```

### **2. Testing**

```bash
# Run test mode (menggunakan test_shop.csv)
./run_test.sh

# Atau langsung dengan Python
python3 activate_shops.py test
```

### **3. Production**

```bash
# Run production mode (menggunakan active_shop.csv)
./run_production.sh

# Atau dengan Python (ada confirmation prompt)
python3 activate_shops.py production

# Atau skip confirmation (untuk cronjob)
python3 activate_shops.py production --skip-confirmation
```

---

## 📁 File Structure

```
shop-activation-python/
├── activate_shops.py       # Main script
├── config.py               # Configuration (API tokens, webhooks, etc)
├── requirements.txt        # Python dependencies
├── run_test.sh            # Test mode runner
├── run_production.sh      # Production mode runner
└── README.md              # This file

Data files (from parent folder shop-activation-no-script/):
├── test_shop.csv          # Test data (1-2 shops)
└── active_shop.csv        # Production data (all shops)
```

---

## ⚙️ Configuration

Edit `config.py` untuk update:

### **API Configuration**
```python
# Update cookie jika expire
SHARK_API['COOKIE'] = 'your-new-cookie-here'

# Update JIRA token jika berubah
JIRA['TOKEN'] = 'your-jira-token'
```

### **Webhook Configuration**
```python
# Test webhook
TEAM_CHAT['TEST_WEBHOOK'] = 'YOUR_TEST_WEBHOOK_TOKEN'

# Production webhook
TEAM_CHAT['PRODUCTION_WEBHOOK'] = 'YOUR_PRODUCTION_WEBHOOK_TOKEN'
```

### **File Paths**
```python
# CSV files automatically reference parent folder
# No need to change unless you move files
TEST_CSV = '../shop-activation-no-script/test_shop.csv'
PRODUCTION_CSV = '../shop-activation-no-script/active_shop.csv'
```

---

## 🤖 Cronjob Setup

### **Setup Cronjob**

```bash
# Edit crontab
crontab -e

# Add this line for weekly production run (every Friday at 11 AM)
0 11 * * 5 /path/to/your/workspace/01-Work-Projects/shop-activation-python/run_production.sh >> ~/logs/shop_activation_cron.log 2>&1

# Or for testing (every Monday at 10 AM)
0 10 * * 1 /path/to/your/workspace/01-Work-Projects/shop-activation-python/run_test.sh >> ~/logs/shop_activation_cron.log 2>&1
```

### **Cronjob Schedule Examples**

```bash
# Every Friday at 11:00 AM
0 11 * * 5 /path/to/run_production.sh

# Every day at 9:00 AM
0 9 * * * /path/to/run_production.sh

# Every Monday and Friday at 10:00 AM
0 10 * * 1,5 /path/to/run_production.sh

# Every 1st day of month at 8:00 AM
0 8 1 * * /path/to/run_production.sh
```

### **Check Cronjob Status**

```bash
# List current cronjobs
crontab -l

# Check logs
tail -f ~/logs/shop_activation_cron.log
tail -f ~/logs/shop_activation_python.log
```

---

## 📊 Usage Examples

### **Test Mode**

```bash
# Using shell script
./run_test.sh

# Using Python directly
python3 activate_shops.py test
```

**Output:**
```
🧪 Running Shop Activation - TEST MODE
========================================

======================================================================
📋 PARSED DATA - TEST MODE
======================================================================
  • Total Shops: 2
  • Regions: ID, SG
  • Environment: staging

  • Region Breakdown:
    - ID: 1 shops
    - SG: 1 shops
======================================================================

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Starting shop activation process...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[10:30:15] [1/2] Processing shop 302084727 for region id...
[10:30:15] ✓ Successfully activated shop 302084727

[10:30:16] [2/2] Processing shop 302132027 for region sg...
[10:30:16] ✓ Successfully activated shop 302132027

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Activation completed:
  Total: 2
  Success: 2
  Already Active: 0
  Failed: 0
  Success Rate: 100.00%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Creating JIRA ticket with activation results...
✓ JIRA ticket created successfully: PROJ-12345
  URL: https://jira.company.example/browse/PROJ-12345

Sending notifications to TEST webhook...
🚀 TEST MODE: Using test webhook (YOUR_TEST_WEBHOOK_TOKEN)
✅ Notification sent successfully to TEST Team Chat group

╔════════════════════════════════════════════════════════════════╗
║  ✅ TEST ACTIVATION COMPLETE!                                  ║
╚════════════════════════════════════════════════════════════════╝

📊 Final Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • Total Shops: 2
  • Successful: 2 (100.00%)
  • Already Active: 0 (0.00%)
  • Failed: 0 (0.00%)
  • Success Rate: 100.00%

📝 JIRA Ticket:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • Ticket: PROJ-12345
  • URL: https://jira.company.example/browse/PROJ-12345

📱 Notification:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • Sent to TEST Team Chat group
  • Webhook: YOUR_TEST_WEBHOOK_TOKEN

🎉 All shops activated successfully! No manual intervention needed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Next Steps:
1. ✅ Check TEST Team Chat group for notification
2. ✅ Review JIRA ticket for complete details
3. ✅ Verify shops are activated in Shark platform
5. ✅ Update tracking spreadsheet if needed

╔════════════════════════════════════════════════════════════════╗
║  🎉 TEST ACTIVATION DONE!                                      ║
╚════════════════════════════════════════════════════════════════╝
```

### **Production Mode**

```bash
# Using shell script (no confirmation prompt)
./run_production.sh

# Using Python with confirmation
python3 activate_shops.py production

# Using Python without confirmation (for cronjob)
python3 activate_shops.py production --skip-confirmation
```

---

## 📝 Logging

### **Log Files**

- **Main log**: `~/logs/shop_activation_python.log`
- **Cronjob log**: `~/logs/shop_activation_cron.log`

### **View Logs**

```bash
# View main log
tail -f ~/logs/shop_activation_python.log

# View cronjob log
tail -f ~/logs/shop_activation_cron.log

# View last 50 lines
tail -n 50 ~/logs/shop_activation_python.log

# Search for errors
grep "ERROR" ~/logs/shop_activation_python.log
```

---

## 🔧 Troubleshooting

### **Problem: Module not found**

```bash
# Install dependencies
pip3 install -r requirements.txt

# Or install directly
pip3 install requests
```

### **Problem: Permission denied**

```bash
# Make scripts executable
chmod +x activate_shops.py
chmod +x run_test.sh
chmod +x run_production.sh
```

### **Problem: CSV file not found**

```bash
# Check if CSV files exist in parent folder
ls -la ../shop-activation-no-script/*.csv

# Update paths in config.py if needed
```

### **Problem: Cookie expired**

```bash
# Edit config.py and update SHARK_API['COOKIE']
# Get new cookie from browser:
# 1. Open https://api-internal.company.example
# 2. Open DevTools (F12)
# 3. Network tab > find any request
# 4. Copy cookie value
# 5. Update in config.py
```

### **Problem: JIRA creation failed**

```bash
# Check JIRA token still valid
# Update JIRA['TOKEN'] in config.py if needed

# Script will continue and send notification even if JIRA fails
```

### **Problem: Team Chat notification failed**

```bash
# Check webhook ID is correct
# Verify you have access to the Team Chat group
# Check network connectivity
```

---

## 🆚 Comparison with Other Versions

| Feature | Python Script | Google Apps Script | Cursor AI |
|---------|--------------|-------------------|-----------|
| **Setup** | pip install | 5 min setup | No setup |
| **Automation** | ✅ Full (cronjob) | ✅ Full (triggers) | ❌ Manual |
| **Flexibility** | ⭐⭐⭐⭐ High | ⭐⭐⭐ Medium | ⭐⭐⭐⭐⭐ Very High |
| **Ease of Use** | ⭐⭐⭐⭐ CLI | ⭐⭐⭐⭐⭐ GUI | ⭐⭐⭐⭐ Copy-paste |
| **Team Access** | ⭐⭐⭐ Need Python | ⭐⭐⭐⭐⭐ Anyone | ⭐⭐⭐ Need Cursor |
| **Logging** | ✅ File + Console | ✅ Apps Script logs | ✅ Console only |
| **Scheduling** | ✅ Cronjob | ✅ Triggers | ❌ Manual |
| **Best For** | Servers, automation | Team use, GUI | Ad-hoc, testing |

---

## 🎯 Best Practices

### **1. Testing First**
```bash
# Always test before production
./run_test.sh

# Verify in TEST Team Chat group
# Check JIRA ticket
# Verify shop activation
```

### **2. Check Logs Regularly**
```bash
# Monitor logs after cronjob runs
tail -f ~/logs/shop_activation_python.log
```

### **3. Update Cookie Periodically**
```bash
# Cookie expires periodically
# Update in config.py when needed
# Test after updating
```

### **4. Keep CSV Updated**
```bash
# Update active_shop.csv regularly
# Remove duplicates
# Verify shop IDs and regions
```

### **5. Monitor Notifications**
```bash
# Check Team Chat after each run
# Verify JIRA tickets created
# Review failed shops if any
```

---

## 📞 Support

### **Check Status**
```bash
# Check if cronjob is running
crontab -l

# Check logs
tail -f ~/logs/shop_activation_python.log

# Test manually
./run_test.sh
```

### **Common Issues**
1. Cookie expired → Update in config.py
2. CSV not found → Check paths in config.py
3. Permission denied → Run chmod +x on scripts
4. Module not found → Run pip3 install -r requirements.txt

---

## 🔄 Update History

- **v1.0** (Jan 2025) - Initial Python version
  - Full automation with cronjob support
  - Test and production modes
  - JIRA ticket creation
  - Team Chat notifications
  - Comprehensive logging
  - Error handling

---

## 📚 Related Files

- **CSV Data**: `../shop-activation-no-script/test_shop.csv` and `active_shop.csv`
- **Documentation**: `../shop-activation-no-script/README.md`
- **Google Apps Script**: `../shop-activation-no-script/GoogleAppsScript.js`
- **Workflow Files**: `../shop-activation-no-script/shop_workflow_*.txt`

---

**Happy Automating! 🚀**

