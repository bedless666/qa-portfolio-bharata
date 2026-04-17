# Bug Report: Marketplace App Crash on 16KB Page Size

## Quick Summary

**Issue:** Marketplace Android app crashes immediately on startup when running on devices with 16KB page size  
**Severity:** P0 - Critical  
**Status:** Reported to Native Team  
**Date:** 2025-12-03  

---

## Files in This Report

1. **`jira_ticket.txt`** - Ready to paste into JIRA
   - Complete bug report with all required fields
   - Technical analysis and root cause
   - Recommended actions for teams

2. **`chat_message.txt`** - Ready to send to dev teams
   - Concise summary for @Native-Team and @Build-Team
   - Key error details and required fix
   - Remember to update `[JIRA_TICKET_URL]` after creating ticket

3. **`ANALYSIS_SUMMARY.md`** - Detailed technical analysis
   - Complete root cause analysis
   - Step-by-step solution guide
   - Verification procedures
   - Log evidence and references

4. **`README.md`** - This file

---

## Quick Facts

| Item | Value |
|------|-------|
| **App Version** | Marketplace 3.64.03@regression |
| **Android Version** | API 35 (Android 15) |
| **Page Size** | 16384 bytes (16KB) |
| **Error Type** | SIGSEGV - Segmentation violation |
| **Crashed Thread** | JSBinder (React Native) |
| **Root Cause** | Native libraries not aligned for 16KB pages |

---

## What Happened

1. Launched Marketplace app on Android 15 emulator with 16KB page size
2. App showed splash screen briefly
3. App crashed with native SIGSEGV error
4. Crash occurred in `libshadowhook.so` and `libglog_v2.so`
5. App became completely unusable

**Important:** Same APK works perfectly on 4KB page size emulator (API 34) - crash only happens on 16KB devices. This confirms the issue is specific to 16KB page size incompatibility.

---

## Why It Happened

The APK's native libraries are compiled/packaged for 4KB page alignment, but Android 15 devices with 16KB page size require libraries to be aligned to 16KB boundaries. When the system tries to load these misaligned libraries, it causes a segmentation fault.

---

## How to Fix

### For Native Team:
1. Rebuild all native libraries with `-Wl,-z,max-page-size=16384` flag
2. Verify alignment with `readelf -l libname.so | grep LOAD`
3. Test on 16KB emulator

### For Build Team:
1. Set `extractNativeLibs="false"` in AndroidManifest.xml
2. Add `useLegacyPackaging = false` in build.gradle packagingOptions
3. Update CI/CD to test on 16KB emulators

---

## How to Verify Fix

```bash
# 1. Install on 16KB emulator
adb install app-fixed.apk

# 2. Launch app
adb shell monkey -p com.marketplace.id.int -c android.intent.category.LAUNCHER 1

# 3. Check if running (should not crash)
adb shell ps | grep marketplace

# 4. Verify no crashes in logs
adb logcat -d | grep -i "sigsegv\|crash" | grep marketplace
```

---

## Impact

- **User Impact:** App unusable on all 16KB page size devices
- **Business Impact:** Cannot support Android 15 devices with 16KB configuration
- **Testing Impact:** Blocks all 16KB compatibility verification
- **Timeline Impact:** Critical blocker for Android 15 support

---

## Next Steps

1. ✅ Create JIRA ticket using `jira_ticket.txt`
2. ✅ Notify teams using `chat_message.txt`
3. ⏳ Wait for Native Team to rebuild libraries
4. ⏳ Wait for Build Team to update configuration
5. ⏳ Test fixed build on 16KB emulator
6. ⏳ Run full regression tests
7. ⏳ Close ticket when verified

---

## References

- Android 16KB Guide: https://developer.android.com/guide/practices/page-sizes
- NDK Build Guide: https://developer.android.com/ndk/guides/abis
- Full Analysis: See `ANALYSIS_SUMMARY.md`

---

## Contact

For questions about this bug report:
- **Reporter:** QA Team
- **Date:** 2025-12-03
- **Environment:** Test / ID
- **Device:** Pixel 8 Pro API 35 (16KB)

