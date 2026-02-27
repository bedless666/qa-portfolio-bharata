# JIRA Weekly Summary - Cronjob Setup

## 📋 Overview

Automated weekly JIRA summary yang mengirim report untuk semua 4 teams sekaligus ke webhook SeaTalk.

## 🎯 Current Setup

### Cronjob Schedule
- **Waktu**: Setiap Kamis jam 14:00
- **Teams**: Buyer, Seller-Fulfillment, Promotion, Order Ops
- **Webhook**: `7BTJoSlqSnKFhaYOAnD1Aw`
- **Execution**: Semua teams dikirim berurutan (dengan delay 2 detik antar team)

### Crontab Entry
```bash
0 14 * * 4 /Users/bharata.aryaseta/Documents/Docs/Bharata\ Repository/01-Work-Projects/jira-weekly-python/run_all_teams.sh 7BTJoSlqSnKFhaYOAnD1Aw production >> /Users/bharata.aryaseta/Documents/Docs/Bharata\ Repository/01-Work-Projects/jira-weekly-python/logs/cronjob_all_teams.log 2>&1
```

## 📊 Execution Flow

1. **Buyer Team** → 5 issues (typically)
2. Wait 2 seconds
3. **Seller-Fulfillment Team** → 9 issues (typically)
4. Wait 2 seconds
5. **Promotion Team** → 8 issues (typically)
6. Wait 2 seconds
7. **Order Ops Team** → 71 issues (typically)

**Total**: ~93 issues across all teams

## 🔧 Manual Execution

### Production Mode (Real Webhook)
```bash
cd /Users/bharata.aryaseta/Documents/Docs/Bharata\ Repository/01-Work-Projects/jira-weekly-python
./run_all_teams.sh 7BTJoSlqSnKFhaYOAnD1Aw production
```

### Test Mode (Test Webhook)
```bash
./run_all_teams.sh btrSgMvuRNK72NjNwIl-Vg test
```

### Custom Webhook
```bash
./run_all_teams.sh <webhook_id> <mode>
```

## 📝 Log Files

### Cronjob Log (All Teams Combined)
```bash
tail -f ~/Documents/Docs/Bharata\ Repository/01-Work-Projects/jira-weekly-python/logs/cronjob_all_teams.log
```

### Individual Execution Logs
```bash
ls -lt ~/Documents/Docs/Bharata\ Repository/01-Work-Projects/jira-weekly-python/logs/jira_weekly_*.log | head -5
```

## ✅ Feedback dari Webhook

Setiap team yang berhasil dikirim akan menunjukkan:
- ✅ Message sent successfully
- 📊 Total issues: X
- 📱 Webhook: PRODUCTION (webhook_id)

Log akan tersimpan di:
- `logs/cronjob_all_teams.log` - Cronjob execution log
- `logs/jira_weekly_YYYYMMDD_HHMMSS.log` - Individual run logs

## 🔍 Monitoring

### Check if cronjob is set
```bash
crontab -l | grep jira-weekly
```

### Check recent execution
```bash
tail -50 /Users/bharata.aryaseta/Documents/Docs/Bharata\ Repository/01-Work-Projects/jira-weekly-python/logs/cronjob_all_teams.log
```

### Check SeaTalk webhook
Messages akan muncul di SeaTalk channel yang terhubung dengan webhook `7BTJoSlqSnKFhaYOAnD1Aw`

## 🛠️ Troubleshooting

### Jika ada error "ModuleNotFoundError: No module named 'yaml'"
```bash
/usr/bin/python3 -m pip install PyYAML==6.0.1 requests==2.31.0
```

### Jika webhook tidak menerima message
- Cek log file: `tail -f logs/cronjob_all_teams.log`
- Verify webhook ID masih valid
- Test manual dengan test webhook

### Jika salah satu team gagal
- Cek JIRA filter ID untuk team tersebut di `config.yaml`
- Verify JIRA PAT token masih valid
- Test individual team:
  ```bash
  python3 jira_weekly.py --team <team_name> --mode test
  ```

## 📅 Next Thursday Execution

Cronjob akan otomatis run di:
- **Hari**: Kamis (Thursday)
- **Jam**: 14:00
- **Teams**: Semua 4 teams (Buyer, Seller, Promotion, Order Ops)

Tidak perlu manual trigger, sistem akan otomatis mengirim report setiap minggu.

## 🔄 Change Webhook or Schedule

### Change Webhook ID
Edit crontab:
```bash
crontab -e
```
Ganti webhook ID di command line:
```bash
./run_all_teams.sh <NEW_WEBHOOK_ID> production
```

### Change Schedule
Edit crontab:
```bash
crontab -e
```
Contoh format cron:
```
# Menit Jam DayOfMonth Month DayOfWeek Command
0 14 * * 4  # Thursday 14:00
0 10 * * 1  # Monday 10:00
0 16 * * 5  # Friday 16:00
```

## 🎉 Summary

- ✅ Cronjob aktif dan berjalan setiap Kamis jam 14:00
- ✅ Semua 4 teams (Buyer, Seller, Promotion, Order Ops) dikirim sekaligus
- ✅ Webhook: `7BTJoSlqSnKFhaYOAnD1Aw`
- ✅ Log file tersedia untuk monitoring
- ✅ Dependencies (PyYAML, requests) sudah terinstall

