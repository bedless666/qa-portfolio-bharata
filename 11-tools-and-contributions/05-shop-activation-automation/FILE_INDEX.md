# 📑 Shop Activation Python - File Index

## 📁 Project Structure

```
shop-activation-python/
├── 📖 DOCUMENTATION
│   ├── README.md              # Complete documentation
│   ├── QUICK_START.md         # Quick start guide (5 min)
│   └── FILE_INDEX.md          # This file
│
├── 💻 SOURCE CODE
│   ├── activate_shops.py      # Main activation script
│   └── config.py              # Configuration (API, webhooks, paths)
│
├── 🔧 RUNNER SCRIPTS
│   ├── run_test.sh           # Test mode runner
│   └── run_production.sh     # Production mode runner
│
├── 📦 DEPENDENCIES
│   ├── requirements.txt       # Python dependencies
│   └── .gitignore            # Git ignore rules
│
└── 📊 DATA FILES (from parent folder)
    ├── ../shop-activation-no-script/test_shop.csv
    └── ../shop-activation-no-script/active_shop.csv
```

---

## 📝 File Descriptions

### **Documentation Files**

| File | Size | Purpose | Read When |
|------|------|---------|-----------|
| `README.md` | ~15 KB | Complete documentation | For details |
| `QUICK_START.md` | ~2 KB | Quick start guide | **Start here!** |
| `FILE_INDEX.md` | ~3 KB | File index (this file) | For navigation |

### **Source Code**

| File | Lines | Purpose | Edit When |
|------|-------|---------|-----------|
| `activate_shops.py` | ~700 | Main script | Rarely (stable) |
| `config.py` | ~130 | Configuration | Cookie expires |

### **Runner Scripts**

| File | Purpose | Usage |
|------|---------|-------|
| `run_test.sh` | Run test mode | `./run_test.sh` |
| `run_production.sh` | Run production | `./run_production.sh` |

### **Dependencies**

| File | Purpose |
|------|---------|
| `requirements.txt` | Python packages |
| `.gitignore` | Git ignore rules |

---

## 🎯 Quick Navigation

### **I want to...**

| Goal | File to Read/Run |
|------|------------------|
| Get started quickly | `QUICK_START.md` |
| Read full docs | `README.md` |
| Test activation | `./run_test.sh` |
| Run production | `./run_production.sh` |
| Update cookie | Edit `config.py` |
| Setup cronjob | See `README.md` (Cronjob section) |
| Check logs | `~/Documents/Docs/log/shop_activation_python.log` |

---

## 📊 File Statistics

- **Total Files**: 9 files
- **Documentation**: 3 files (~20 KB)
- **Source Code**: 2 files (~830 lines)
- **Scripts**: 2 files
- **Config**: 2 files
- **Total Lines of Code**: ~830 lines
- **Last Updated**: January 2025

---

## 🔗 Related Projects

### **Shop Activation - Other Versions**

| Folder | Type | Best For |
|--------|------|----------|
| `shop-activation-python/` | Python + Cronjob | **Automation** |
| `shop-activation-no-script/` | Cursor AI + CSV | Ad-hoc, Testing |
| `shop-activation-no-script/` | Google Apps Script | Team use, GUI |

### **Related Documentation**

- Parent folder: `../shop-activation-no-script/`
- Original workflows: `../shop-activation-no-script/shop_workflow_*.txt`
- Google Apps Script: `../shop-activation-no-script/GoogleAppsScript.js`
- CSV data: `../shop-activation-no-script/*.csv`

---

## 🚀 Quick Commands

```bash
# Setup (one-time)
pip3 install -r requirements.txt
chmod +x *.sh *.py

# Test
./run_test.sh

# Production
./run_production.sh

# View logs
tail -f ~/Documents/Docs/log/shop_activation_python.log

# Setup cronjob
crontab -e
# Add: 0 11 * * 5 /path/to/run_production.sh >> ~/Documents/Docs/log/cron.log 2>&1
```

---

## 📚 Reading Order

### **For New Users:**
1. ✅ `QUICK_START.md` (5 min)
2. ✅ Run `./run_test.sh`
3. ✅ Check Team Chat notification
4. ✅ Read `README.md` for details

### **For Setup:**
1. ✅ `QUICK_START.md` - Setup guide
2. ✅ `README.md` - Cronjob section
3. ✅ Test with `./run_test.sh`
4. ✅ Setup cronjob
5. ✅ Verify with production

### **For Maintenance:**
1. ✅ Update `config.py` (cookie, tokens)
2. ✅ Test with `./run_test.sh`
3. ✅ Check logs
4. ✅ Update CSV files in parent folder

---

## 🆘 Support

### **Common Issues**

| Issue | Solution |
|-------|----------|
| Cookie expired | Update `config.py` → `SHARK_API['COOKIE']` |
| Permission denied | Run `chmod +x *.sh *.py` |
| Module not found | Run `pip3 install -r requirements.txt` |
| CSV not found | Check paths in `config.py` |
| Cronjob not running | Check `crontab -l` and logs |

### **Check Logs**

```bash
# Main log
tail -f ~/Documents/Docs/log/shop_activation_python.log

# Cronjob log
tail -f ~/Documents/Docs/log/shop_activation_cron.log

# Last 100 lines
tail -n 100 ~/Documents/Docs/log/shop_activation_python.log
```

---

**Need help? Check README.md for troubleshooting guide! 🚀**

