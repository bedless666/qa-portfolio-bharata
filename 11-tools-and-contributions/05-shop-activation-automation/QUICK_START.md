# ⚡ Quick Start Guide - Shop Activation Python

## 🚀 Setup (5 Minutes)

### **1. Install Dependencies**
```bash
cd shop-activation-python
pip3 install -r requirements.txt
```

### **2. Make Scripts Executable**
```bash
chmod +x activate_shops.py run_test.sh run_production.sh
```

### **3. Test Run**
```bash
./run_test.sh
```

✅ Done! Check TEST SeaTalk group for notification.

---

## 📋 Daily Usage

### **Test Mode**
```bash
./run_test.sh
```

### **Production Mode**
```bash
./run_production.sh
```

---

## 🤖 Setup Cronjob (Optional)

### **Edit Crontab**
```bash
crontab -e
```

### **Add This Line**
```bash
# Every Friday at 11 AM
0 11 * * 5 /Users/bharata.aryaseta/Documents/Docs/Bharata\ Repository/01-Work-Projects/shop-activation-python/run_production.sh >> ~/Documents/Docs/log/shop_activation_cron.log 2>&1
```

### **Verify Cronjob**
```bash
crontab -l
```

---

## 📊 Check Results

### **View Logs**
```bash
# Main log
tail -f ~/Documents/Docs/log/shop_activation_python.log

# Cronjob log
tail -f ~/Documents/Docs/log/shop_activation_cron.log
```

### **Check SeaTalk**
- Test mode → TEST SeaTalk group
- Production mode → PRODUCTION SeaTalk group

### **Check JIRA**
- Ticket created automatically
- Link in SeaTalk notification

---

## 🔧 Troubleshooting

### **Cookie Expired?**
```bash
# Edit config.py
# Update SHARK_API['COOKIE'] with new cookie from browser
```

### **Permission Denied?**
```bash
chmod +x activate_shops.py run_test.sh run_production.sh
```

### **Module Not Found?**
```bash
pip3 install -r requirements.txt
```

---

## 📚 Full Documentation

See `README.md` for complete documentation.

---

**That's it! You're ready to go! 🎉**

