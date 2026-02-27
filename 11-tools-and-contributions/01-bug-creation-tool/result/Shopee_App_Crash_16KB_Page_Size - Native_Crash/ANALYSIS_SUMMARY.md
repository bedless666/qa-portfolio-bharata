# BUG ANALYSIS SUMMARY
## Shopee App Native Crash on 16KB Page Size Devices

---

## ISSUE OVERVIEW

**Issue ID:** Native Crash - 16KB Page Size Incompatibility  
**Environment:** Test  
**Region:** ID  
**Severity:** Critical (P0)  
**Date:** 2025-12-03  
**App Version:** Shopee 3.64.03@regression  
**Android Version:** API 35 (Android 15)  
**Device:** Pixel 8 Pro Emulator with 16KB page size  
**Page Size:** 16384 bytes (16KB)  

---

## PROBLEM

Shopee Android app crashes immediately on startup when running on Android 15 emulators/devices configured with 16KB page size. The app shows splash screen briefly, then crashes with a native SIGSEGV (Segmentation violation) error before reaching the main activity. This makes the app completely unusable on 16KB page size devices.

**Why This Matters:**
- Android 15 introduces 16KB page size support
- Future Android devices will increasingly use 16KB as default
- Google Play Store may require 16KB compatibility for new apps
- Blocks all QA testing for 16KB compatibility verification

---

## ERROR DETAILS

**Signal:** SIGSEGV (Signal 11)  
**Error Type:** Segmentation violation (invalid memory reference)  
**Thread:** JSBinder (React Native JavaScript bridge thread)  
**Process:** com.shopee.id.int (PID varies: 10535, 10742)  
**Timestamp:** 2025-12-03 17:03:17 and 17:03:37 (multiple occurrences)  

**Crashed Native Libraries:**
1. **libshadowhook.so**
   - BuildId: 8411b301c9aafef50292dca701d9bc8ce7f2172c
   - Offset: pc 000000000000c2a0
   
2. **libglog_v2.so**
   - BuildId: 91074802c9277d19b44f28656046452876539430
   - Offset: pc 000000000000b7ec
   
3. **libnative-crash.so**
   - BuildId: e63ab1e5d0386d44ba392cc0a248a615a760187b
   - Function: CrashCallBackThread::crash_callback_thread
   - Offset: pc 000000000001591c

**Component:** Native Layer / React Native Bridge  
**Service:** Shopee Android App Initialization  

---

## ROOT CAUSE

### Technical Explanation

The crash is caused by **memory alignment incompatibility** between the app's native libraries and the 16KB page size memory architecture.

**🔍 VERIFICATION: Issue is SPECIFIC to 16KB Page Size**

To confirm this is a 16KB-specific issue and not a general app bug, we performed comparison testing:

| Test Case | Device Configuration | Page Size | Result | Status |
|-----------|---------------------|-----------|---------|--------|
| **Test 1** | Pixel 8 Pro API 35 (16KB) | 16384 bytes | ❌ **CRASH** | SIGSEGV on startup |
| **Test 2** | Pixel 8 API 34 (4KB) | 4096 bytes | ✅ **SUCCESS** | App launches normally |
| **Test 3** | Pixel 8 API 35 (16KB) | 16384 bytes | ❌ **CRASH** | Consistent crash |

**Conclusion:** Same APK (com.shopee.id.int v3.64.03@regression) works perfectly on 4KB devices but crashes immediately on 16KB devices. This definitively proves the issue is 16KB page size incompatibility, not a general application bug.

**What Failed:**
- Native libraries (.so files) failed to load properly
- Memory mapping operations failed due to incorrect alignment
- Dynamic linker (dlopen) couldn't properly map libraries to memory

**Why It Failed:**
Android 15 introduced support for 16KB page sizes (in addition to traditional 4KB). When an app's native libraries are not properly aligned to 16KB boundaries:

1. **Memory Mapping Fails:** The system tries to map native libraries to memory addresses that must align with page boundaries (16KB in this case)
2. **Alignment Violation:** Libraries compiled/packaged for 4KB alignment don't meet 16KB requirements
3. **Segmentation Fault:** Accessing misaligned memory causes SIGSEGV

**Trigger:**
- App startup on device with `ro.product.cpu.pagesize.max=16384`
- Native library loading during React Native initialization
- JSBinder thread attempting to initialize native modules

**Evidence from Logs:**
```
kwai_dlfcn: CHECK failed at kwai_dlfcn.cpp (line: 101) 
- <dlopen>: data.info_.dlpi_addr > 0: No such file or directory
```
This indicates the dynamic linker couldn't find/load the library at the expected aligned address.

---

## SERVICE CHAIN

```
1. User Action: Launch Shopee App
   ↓
2. Android System: Start com.shopee.id.int process
   ↓
3. App Initialization: Load Application class
   ↓
4. Native Library Loading: Extract and load .so files
   ↓ [CRASH OCCURS HERE]
5. React Native Init: Initialize JSBinder thread
   ↓
6. Native Module Registration: Register native modules
   ↓
   ERROR: SIGSEGV - Memory alignment violation
   
Crash Location: JSBinder thread during native library initialization
Failed Component: libshadowhook.so, libglog_v2.so
Root Issue: 16KB page size alignment mismatch
```

---

## BUILD CONFIGURATION ISSUES

### Current Configuration (Problematic):

1. **extractNativeLibs=true**
   - Libraries are extracted to filesystem at runtime
   - Extraction doesn't guarantee 16KB alignment
   - Legacy packaging method

2. **No 16KB Alignment Flags**
   - Native libraries not compiled with 16KB alignment
   - No explicit page size configuration in build.gradle
   - NDK build doesn't specify alignment requirements

3. **Library Packaging**
   - Libraries packaged with default (4KB) alignment
   - APK structure doesn't account for 16KB requirements
   - No verification of 16KB compatibility

### Required Configuration:

```gradle
android {
    defaultConfig {
        ndk {
            abiFilters 'arm64-v8a'  // Focus on 64-bit ARM
        }
    }
    
    packagingOptions {
        jniLibs {
            useLegacyPackaging = false  // Enable proper alignment
        }
    }
}
```

**AndroidManifest.xml:**
```xml
<application
    android:extractNativeLibs="false"
    ...>
```

**gradle.properties:**
```properties
android.bundle.enableUncompressedNativeLibs=false
```

---

## IMPACT ASSESSMENT

### User Impact:
- **Who:** All users on devices with 16KB page size (Android 15+ devices)
- **How:** App completely unusable - crashes on startup
- **Business Impact:** 
  - Cannot support newer Android devices
  - Potential Google Play Store rejection
  - Loss of users on modern devices
- **Workaround:** None for end users. Only option is to use older Android version or 4KB page size devices

### System Impact:
- **Affected Components:**
  - All native libraries (100+ .so files)
  - React Native bridge initialization
  - Crash reporting system (ironically, crash handler also crashes)
  - Any feature requiring native code
  
- **Related Features:**
  - Payment processing (native security libraries)
  - Camera/Media (native codecs)
  - Performance monitoring (native hooks)
  - All React Native screens
  
- **Scope:** 
  - 100% of app functionality blocked
  - Affects ALL features without exception
  - Cannot even reach login screen

---

## TEAMS TO CONTACT

### Primary: @Native-Team
**Reason:** Own all native libraries and NDK build process. Need to:
- Rebuild all native libraries with 16KB alignment
- Update NDK build scripts to enforce alignment
- Verify each .so file is properly aligned
- Test native modules on 16KB emulator

**Action Items:**
1. Add `-Wl,-z,max-page-size=16384` to NDK build flags
2. Rebuild all native libraries
3. Verify alignment with `readelf -l libname.so | grep LOAD`
4. Update build scripts to enforce 16KB alignment

---

### Secondary: @Build-Team
**Reason:** Own app build configuration and APK packaging. Need to:
- Update build.gradle with 16KB configuration
- Set extractNativeLibs=false in AndroidManifest
- Configure proper packaging options
- Update CI/CD pipeline to verify 16KB compatibility

**Action Items:**
1. Update build.gradle with packagingOptions
2. Modify AndroidManifest.xml (extractNativeLibs=false)
3. Add 16KB emulator to CI/CD testing
4. Create build verification step for page size compatibility

---

### Tertiary: @Android-Platform-Team
**Reason:** Platform experts who can:
- Provide guidance on Android 15 requirements
- Review build configuration changes
- Verify compliance with Google Play requirements
- Assist with testing strategy

**Action Items:**
1. Review proposed build configuration changes
2. Provide Android 15 compatibility checklist
3. Verify Google Play Store requirements
4. Recommend testing approach for 16KB devices

---

## SOLUTION STEPS

### Step 1: Native Team - Rebuild Libraries
**Timeline:** 2-3 days
```bash
# Update NDK build flags
LDFLAGS="-Wl,-z,max-page-size=16384"

# Rebuild all native libraries
./gradlew clean
./gradlew assembleDebug

# Verify alignment
for lib in app/build/intermediates/merged_native_libs/*/out/lib/arm64-v8a/*.so; do
    echo "Checking $lib"
    readelf -l "$lib" | grep -A 1 LOAD | grep Align
done
```

### Step 2: Build Team - Update Configuration
**Timeline:** 1 day
```gradle
// build.gradle (app module)
android {
    packagingOptions {
        jniLibs {
            useLegacyPackaging = false
        }
    }
}
```

```xml
<!-- AndroidManifest.xml -->
<application
    android:extractNativeLibs="false">
```

### Step 3: Verification - Test on Both 4KB and 16KB Emulators
**Timeline:** 1 day

**A. Test on 4KB Emulator (Baseline - Should Work)**
```bash
# Create/Use 4KB emulator
avdmanager create avd -n Test_4KB -k "system-images;android-34;google_apis_playstore;arm64-v8a"

# Install and test
adb install app-fixed.apk
adb shell monkey -p com.shopee.id.int -c android.intent.category.LAUNCHER 1

# Verify page size
adb shell getprop ro.product.cpu.pagesize.max
# Should return: 4096

# Should launch successfully (baseline verification)
```

**B. Test on 16KB Emulator (Primary Test)**
```bash
# Create 16KB emulator
avdmanager create avd -n Test_16KB -k "system-images;android-35;google_apis_playstore_ps16k;arm64-v8a"

# Install and test
adb install app-fixed.apk
adb shell monkey -p com.shopee.id.int -c android.intent.category.LAUNCHER 1

# Verify page size
adb shell getprop ro.product.cpu.pagesize.max
# Should return: 16384

# Monitor for crashes (should NOT crash after fix)
adb logcat | grep -i "sigsegv\|crash"
```

### Step 4: Testing - Full Regression
**Timeline:** 2-3 days
- Smoke test on 16KB emulator
- Full regression on both 4KB and 16KB devices
- Performance testing (16KB may have different performance characteristics)
- Memory usage verification

---

## VERIFICATION STEPS

After the fix is deployed:

### 1. Build Verification
```bash
# Extract APK
unzip app-release.apk -d extracted/

# Check library alignment
for lib in extracted/lib/arm64-v8a/*.so; do
    readelf -l "$lib" | grep -A 1 LOAD
done

# Verify all LOAD segments have Align = 0x4000 (16KB)
```

### 2. Installation Test
```bash
# Install on 16KB emulator
adb -s emulator-5554 install app-release.apk

# Verify installation success
adb shell pm list packages | grep shopee
```

### 3. Launch Test
```bash
# Launch app
adb shell monkey -p com.shopee.id.int -c android.intent.category.LAUNCHER 1

# Wait 10 seconds
sleep 10

# Check if app is running (not crashed)
adb shell ps | grep shopee
# Should show running process

# Check for crashes
adb logcat -d | grep -i "sigsegv\|fatal\|crash" | grep shopee
# Should return empty
```

### 4. Functional Test
- Complete login flow
- Navigate to main tabs (Home, Feed, Cart, Me)
- Perform checkout flow
- Test payment methods
- Verify React Native screens load properly
- Check camera/media features
- Monitor for 30 minutes of usage

### 5. Performance Monitoring
```bash
# Monitor memory usage
adb shell dumpsys meminfo com.shopee.id.int

# Check for memory leaks
# Compare with 4KB device baseline

# Monitor CPU usage
adb shell top | grep shopee
```

---

## LOG EVIDENCE

### Crash Stack Trace
```
12-03 17:03:17.593 10644 10644 E NATIVE_STACK:   
  #00 pc 000000000000b7ec  libglog_v2.so 
      (BuildId: 91074802c9277d19b44f28656046452876539430)
  #05 pc 000000000000c2a0  libshadowhook.so 
      (BuildId: 8411b301c9aafef50292dca701d9bc8ce7f2172c)

12-03 17:03:17.670 10644 10644 E kwai_dlfcn: 
  CHECK failed at kwai_dlfcn.cpp (line: 101) - <dlopen>: 
  data.info_.dlpi_addr > 0: No such file or directory

12-03 17:03:37.738 10742 10573 D NATIVE_CRASH_Common: 
  onNativeCrash isMainThread->false 
  crashThreadName->JSBinder 
  errClass->SIGSEGV 
  sigMsg->Segmentation violation (invalid memory reference)
  nativeLogPath->/storage/emulated/0/Android/data/com.shopee.id.int/files/
                native_crash_native_temp/2025-12-03_17-03-17-10535_10633_native_log.log
```

### Page Size Verification
```bash
$ adb shell getprop ro.product.cpu.pagesize.max
16384

$ adb shell getconf PAGESIZE
16384

$ adb shell uname -a
Linux localhost 6.6.30-android15-8-gdd9c02ccfe27-ab11987101 
#1 SMP PREEMPT Tue Jun 18 20:50:32 UTC 2024 aarch64 Toybox
```

### Package Info
```
Package: com.shopee.id.int
Version: 3.64.03@regression
extractNativeLibs: true  ← PROBLEM
usesNonSdkApi: false
apkSigningVersion: 2
```

### Native Libraries List (Partial)
```
-rwxr-xr-x 1 system system   697680 libBCAWrapper.so
-rwxr-xr-x 1 system system  8830656 libMFEMakeupKit.so
-rwxr-xr-x 1 system system  5248808 libSargeras.so
-rwxr-xr-x 1 system system   489824 libanr.so
-rwxr-xr-x 1 system system  3215096 libbrizzi.so
... (100+ more libraries)
```

All these libraries need to be rebuilt with 16KB alignment.

---

## ADDITIONAL CONTEXT

### Android 15 16KB Page Size Background

Android 15 introduces support for devices with 16KB page sizes. This change:
- Improves performance on certain hardware
- Reduces memory fragmentation
- Aligns with Linux kernel trends
- Required for some ARM processors

**Timeline:**
- Android 15 Beta: 16KB support introduced
- Android 15 Stable: 16KB devices start shipping
- 2025-2026: More devices will use 16KB as default
- Future: May become mandatory for Google Play

**Google Requirements:**
- Apps must be compatible with both 4KB and 16KB
- Native libraries must be properly aligned
- No crashes or undefined behavior on 16KB devices

### Testing Recommendations

1. **Emulator Testing:**
   - Test on both 4KB and 16KB emulators
   - Use API 35 with `_ps16k` system images
   - Verify on multiple device profiles (Pixel 8, Pixel 8 Pro)

2. **Physical Device Testing:**
   - Test on actual 16KB devices when available
   - Monitor for performance differences
   - Check memory usage patterns

3. **Automated Testing:**
   - Add 16KB emulator to CI/CD pipeline
   - Run smoke tests on every build
   - Alert on any 16KB-specific failures

4. **Performance Testing:**
   - Compare app performance: 4KB vs 16KB
   - Monitor memory usage differences
   - Check for any 16KB-specific issues

---

## NEXT STEPS

### Immediate Actions (This Week)
1. ✅ Create JIRA ticket (use jira_ticket.txt)
2. ✅ Notify Native Team and Build Team (use chat_message.txt)
3. ⏳ Native Team: Start rebuilding libraries with 16KB alignment
4. ⏳ Build Team: Update build configuration

### Short Term (Next Sprint)
5. ⏳ Complete library rebuild and testing
6. ⏳ Deploy fixed build to test environment
7. ⏳ Verify fix on 16KB emulator
8. ⏳ Run full regression tests

### Long Term (Next Release)
9. ⏳ Add 16KB testing to CI/CD pipeline
10. ⏳ Update development guidelines
11. ⏳ Train team on 16KB requirements
12. ⏳ Monitor for 16KB-related issues in production

---

## REFERENCES

- **Android Developer Guide:** https://developer.android.com/guide/practices/page-sizes
- **NDK Build Guide:** https://developer.android.com/ndk/guides/abis
- **16KB Page Size Best Practices:** https://source.android.com/docs/core/architecture/kernel/16kb-page-size
- **Google Play Requirements:** https://support.google.com/googleplay/android-developer/answer/11926878

---

**Generated:** 2025-12-03 17:30:00  
**Analyzer Version:** Bug Analyzer v2.2 (Manual Analysis)  
**Analyzed By:** QA Team + Cursor AI  
**Report Type:** Critical Native Crash - 16KB Page Size Incompatibility  
**Priority:** P0 - Blocks Android 15 Support  

