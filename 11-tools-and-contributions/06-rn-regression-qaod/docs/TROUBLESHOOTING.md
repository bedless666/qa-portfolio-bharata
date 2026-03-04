# 🔧 Troubleshooting Guide

Common issues and solutions for QAoD Regression Chat Generator.

---

## 🚨 Known Issues & Fixes

### Issue #1: Generic Template Message in Production Thread

**Symptom:**
When using production deployment, the SeaTalk thread message shows generic template content instead of the expected staging regression format:

```
❌ Wrong Output:
How to test:
Download and install file based on your device:

New Version
Android v3.61.55 = https://example.com/android.apk
...

✅ Expected Output:
Staging Regression - 2026.v2.103

Date:
25 Feb 2026, 23:03
...
```

**Root Cause:**
- **NOT a client-side issue**: The `Index-with-api.html` correctly sends `InputDescription` with proper staging content
- **SMART Workflow Platform Issue**: The workflow deployment was configured to override `InputDescription` with a generic template

**Resolution:**
- Fixed directly in SMART Workflow platform configuration
- Client-side code (`Index-with-api.html`) requires no changes
- Verified fix by restarting Electron app and testing workflow trigger

**Date Fixed:** February 24, 2026

---

## 🔄 Environment Switching

### How to Switch Between Test and Production

**Current Configuration (Production):**
```javascript
const API_CONFIG = {
    endpoint_deployment_hash_id: 'g8c144fr5wr6jrvzcqty0gts',
    endpoint_deployment_key: 'wxqjm1ghy5rynyb86ka51zre'
};
```

**To Switch to Test:**
1. Open `Index-with-api.html`
2. Find `API_CONFIG` object (around line 2050)
3. Replace with:
```javascript
const API_CONFIG = {
    endpoint_deployment_hash_id: 'ihkyjk9403s7vmgbtdxzxaee',
    endpoint_deployment_key: '5g********01d'
};
```
4. Save file
5. Restart Electron app: `npm start`

**To Switch to Production:**
1. Follow same steps but use production credentials
2. Always verify in SMART Workflow platform that deployment is properly configured

---

## 🐛 Common Errors

### Error: Network Service Crash

**Symptom:**
```
ERROR:network_service_instance_impl.cc(601)] Network service crashed, restarting service.
```

**Solution:**
- Usually transient error
- Simply restart the Electron app: `npm start`
- If persists, check Shopee WiFi connection

---

### Error: Port Already in Use

**Symptom:**
```
Error: listen EADDRINUSE: address already in use :::3847
```

**Solution:**
```bash
# Kill existing Electron process
pkill -f "electron.*Index-with-api.html"

# Or kill process on port 3847
lsof -ti:3847 | xargs kill -9

# Then restart
npm start
```

---

### Error: CORS / API Connection Failed

**Symptom:**
- "Failed to reach target API"
- Network errors in console

**Solution:**
1. **Check WiFi**: Must be connected to Shopee WiFi network
2. **Check VPN**: Disconnect personal VPN if connected
3. **Verify URL**: Ensure `smart.shopee.io` is accessible
4. **Test in Browser**: Open https://smart.shopee.io in browser to verify access

---

### Error: Invalid Deployment Credentials

**Symptom:**
- API returns 401 Unauthorized
- API returns 404 Not Found

**Solution:**
1. Verify `endpoint_deployment_hash_id` and `endpoint_deployment_key` are correct
2. Check if deployment still exists in SMART Workflow platform
3. Confirm you're using the right environment (test vs prod)

---

## 🔍 Debugging Tips

### Enable Console Logs

The app has extensive console logging:
- `🖥️ Using local proxy (Electron mode)` - Confirms proxy mode
- `📤 Sending to API...` - Shows request is being sent
- `✅ SUCCESS! Workflow triggered` - Confirms API success

**To view logs:**
1. In Electron app, press `Cmd+Option+I` (Mac) or `Ctrl+Shift+I` (Windows)
2. Go to Console tab
3. Look for emoji-prefixed log messages

---

### Verify API Payload

Before sending to API, the app logs the complete payload:

```javascript
console.log('📤 Sending to API:', requestBody);
```

**Check that:**
- `InputTitle` contains correct title with mentions
- `InputDescription` contains proper Jira Wiki Markup (not generic template)
- `pic` array contains correct email addresses
- `taskData` has all required fields

---

### Test Workflow in SMART Platform

**Direct Testing:**
1. Go to https://smart.shopee.io
2. Find your workflow deployment (use hash ID to search)
3. Click "Test Run" with sample inputs
4. Verify output matches expectations

**Check Node Configuration:**
- Ensure no nodes are overriding `InputDescription` variable
- Check for any template substitution logic in workflow nodes
- Verify variable mappings are correct

---

## 📊 Verification Checklist

After making changes or switching environments:

- [ ] Updated `API_CONFIG` in `Index-with-api.html`
- [ ] Restarted Electron app (`npm start`)
- [ ] Confirmed app launches successfully (see `✅ Server running` and `🎉 Window ready!`)
- [ ] Tested workflow trigger with sample data
- [ ] Verified SeaTalk message format is correct
- [ ] Verified Jira ticket is created with proper content
- [ ] Checked thread message shows expected format (not generic template)

---

## 🆘 Escalation

If issues persist after following this guide:

**Client-Side Issues (Form, UI, Payload):**
- Contact: bharata.aryaseta@shopee.com

**Workflow/API Issues (SMART Platform, Node Logic):**
- Contact: ivan.jond@shopee.com
- Platform: https://smart.shopee.io

**Network/Infrastructure Issues:**
- Contact: Shopee IT Support

---

**Last Updated:** February 24, 2026  
**Maintained by:** Shopee QAoD Team
