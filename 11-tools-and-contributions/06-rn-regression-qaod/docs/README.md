# 📖 Quick Start Guide

Quick reference for using the RN & Native Regression QAoD Tool.

---

## 🚀 Getting Started

### 1. Launch Application

```bash
cd electron-app/
npm start
```

**Expected Output**:
```
✅ Server running at http://127.0.0.1:3847/
📱 Loading Index-with-api.html...
🎉 Window ready!
```

---

## 📝 Using the Tool

### Step 1: Select Template

Choose the appropriate regression type:

**React Native (RN) Templates**:
- `RN Staging - TC1` (Seller App - Basic Flow)
- `RN Staging - TC2` (Seller App - Order Management)
- `RN Staging - TC3` (Seller App - Product Management)
- `RN Staging - TC4` (Seller App - Advanced Features)

**Native Templates**:
- `Native Staging - TC1/TC2/TC3/TC4`
- `Native Adhoc`
- `Native Live`
- `Native Hotfix`

### Step 2: Fill Required Fields

**Common Fields**:
- Version number (e.g., `2026.v2.103`)
- Date & Time
- Build links (for Native templates)

**Template-Specific Fields**:
- PIC assignments (auto-filled based on template)
- Additional notes/context

### Step 3: Generate & Submit

1. Click **"Generate"** button
2. Review generated content in preview area
3. Tool automatically:
   - Posts to Team Chat (with thread & mentions)
   - Creates JIRA ticket
   - Logs to Google Sheets

---

## 🎯 Template Guide

### When to Use Each Template

| Template | Use Case | Frequency |
|----------|----------|-----------|
| RN Staging TC1-TC4 | Weekly RN regression | Weekly |
| Native Staging TC1-TC4 | Weekly Native regression | Weekly |
| Native Adhoc | Urgent Native testing | As needed |
| Native Live | Production hotfix verification | Critical |
| Native Hotfix | Post-hotfix regression | After hotfix |

---

## 💡 Pro Tips

### 1. **Pre-fill Common Data**
- The tool remembers your last inputs
- Use browser DevTools to inspect stored data

### 2. **Verify Before Submit**
- Always review generated Team Chat message
- Check PIC mentions are correct
- Confirm JIRA ticket fields

### 3. **Network Requirements**
- Must be on Marketplace WiFi
- VPN may interfere with API calls
- Check console for connection errors

---

## 🔧 Quick Troubleshooting

### App Won't Start
```bash
# Kill existing process
pkill -f electron

# Restart
npm start
```

### API Errors
1. Check WiFi connection (must be Marketplace network)
2. Verify deployment credentials in `Index-with-api.html`
3. Check console logs (Cmd+Option+I)

### Wrong Output Format
- Verify correct template selected
- Check SMART Workflow platform configuration
- See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for details

---

## 📚 Additional Resources

- **[WORKFLOW.md](WORKFLOW.md)** - Detailed technical documentation
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Complete troubleshooting guide
- **[CHANGELOG.md](CHANGELOG.md)** - Version history

---

## 🆘 Support

**Issues?** Contact qa.engineer@company.example

**Platform Issues?** Contact platform.owner@company.example (SMART Workflow)

---

**Version**: v4.1 | **Last Updated**: February 2026
