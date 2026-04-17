# Bug Analysis Summary

## Issue Overview
**TraceID:** e3e3e7f34467e6f897fca796ae5a2701  
**Environment:** Test  
**Region:** KH (Cambodia) - viewed from CN Seller Operation Platform  
**Severity:** High  
**Date:** 2025-11-25 17:28:27 UTC

## Problem Statement
Sellers cannot sync SIP (Marketplace Integrated Platform) items from P-shop (Primary shop) to A-shop (Affiliated shop) in KH region. The sync operation fails during logistics channel whitelist validation, completely blocking the SIP cross-border item listing workflow for the KH market.

## Error Details
- **Error Code:** 405300005 (ERROR_EXTERNAL)
- **Error Message:** "external api error : call crossupload.api error:|create aitem fail for affiShopid:1013210527, reason:pshop not hit logistics channel whitelist|"
- **Service:** crossuploadbff-admin → crossupload.api
- **Component:** Logistics Channel Whitelist Validation
- **API Endpoint:** PUT /crossuploadbff/admin/sync_related_aitem

## Root Cause

### Technical Analysis
The issue occurs during the SIP item synchronization process when the system validates logistics channel compatibility between P-shop and A-shop regions.

**Validation Flow:**
1. Admin initiates sync from Seller Operation Platform (seller.test.marketplace.cn)
2. Request sent to `crossuploadbff-admin` service
3. BFF forwards to `crossupload.api` service with action_type="create_asku"
4. crossupload.api performs **logistics channel whitelist validation**:
   - Reads P-item logistics configuration (channel 50039)
   - Checks if channel 50039 is in KH region's SIP cross-border whitelist
   - **Validation FAILS** - channel not whitelisted
5. Sync operation rejected with error

**Why It Fails:**
- **P-item** (3044833293) in VN shop (1013210519) has logistics channel **50039** configured
- **Channel 50039** is likely a VN-specific logistics channel
- **KH A-shop** (1013210527) has a different set of whitelisted logistics channels for SIP cross-border operations
- **Channel 50039 is NOT in KH's SIP logistics whitelist** for VN → KH cross-border shipping
- System rejects sync to prevent listing items with unsupported logistics

### Data Points
- **P-shop ID:** 1013210519 (VN region)
- **P-item ID:** 3044833293
- **P-item MTSKU ID:** 3044833291
- **Merchant ID:** 1000019935
- **A-shop ID:** 1013210527 (KH region)
- **Logistics Channel:** 50039 (configured on P-item)
- **Logistics Info:** `{"50039":{"enabled":true,"wms_location_list":null,"seller_location_list":null,"cover_shipping_fee":false,"size":0}}`
- **Admin User:** qa.engineer@company.example (User ID: 39671)

### Log Evidence

**Error Response (from gateway):**
```
2025-11-25 17:28:27.854897|DATA|e3e3e7f34467e6f897fca796ae5a2701
destination_url: http://c-api-sellersip.test.marketplacemobile.com/crossuploadbff/admin/sync_related_aitem
command: mkt_http.crossuploadbff.admin.put_crossuploadbff_admin_sync05frelated05faitem
error_code: 0
request: {"mst_itemid":3044833293,"action_type":"create_asku"}
raw_response: {"code":405300005,"msg":"external api error : call crossupload.api error:|create aitem fail for affiShopid:1013210527, reason:pshop not hit logistics channel whitelist|","data":null}
```

**Metrics Reporting (indicator-api):**
```
2025-11-25 17:28:27.841034|ERROR|e3e3e7f34467e6f897fca796ae5a2701|indicator-api-test-sg
metric is invalid
payload: {
  "items": [{
    "be_errors": [
      {"count":1,"error_name":"370201032"},
      {"count":1,"error_name":"pshop not hit logistics channel whitelist"}
    ],
    "item_id":0
  }]
}
```

**P-item Logistics Configuration:**
```
2025-11-25 17:28:27.705797|DATA|product-readapi-test-sg
logistics_info: "eyI1MDAzOSI6eyJlbmFibGVkIjp0cnVlLCJ3bXNfbG9jYXRpb25fbGlzdCI6bnVsbCwic2VsbGVyX2xvY2F0aW9uX2xpc3QiOm51bGwsImNvdmVyX3NoaXBwaW5nX2ZlZSI6ZmFsc2UsInNpemUiOjB9fQ=="

Decoded: {"50039":{"enabled":true,"wms_location_list":null,"seller_location_list":null,"cover_shipping_fee":false,"size":0}}
```

## Impact Assessment

### Business Impact
- **Severity:** High
- **Scope:** All SIP cross-border syncs from VN to KH using channel 50039
- **User Impact:** Sellers cannot list SIP items in KH market
- **Workflow Blocked:** Entire P-item → A-item sync flow for KH region

### Technical Impact
- **Service:** crossupload.api (SIP sync service)
- **Component:** Logistics channel whitelist validation
- **Affected Regions:** KH (potentially other regions with similar whitelist restrictions)
- **Affected Channels:** Logistics channel 50039 (and any other non-whitelisted channels)

## Solution

### Immediate Fix Options

**Option A: Update Whitelist Configuration (Recommended if channel supports KH)**
1. Verify logistics channel 50039 supports VN → KH cross-border shipping
2. Add channel 50039 to KH region's SIP cross-border logistics whitelist
3. Update whitelist configuration in crossupload.api service
4. Deploy configuration change
5. Retry sync operation

**Option B: Reconfigure P-item Logistics**
1. Identify KH-compatible logistics channels
2. Update P-item 3044833293 logistics configuration with compatible channel
3. Retry sync operation
4. Verify A-item created successfully

### Long-term Improvements

**1. Enhanced Validation & Error Messaging**
- Return specific error indicating which logistics channels are invalid
- Suggest compatible logistics channels for target region in error response
- Add pre-sync validation in Seller Operation Platform UI
- Show warnings before sync when incompatible channels detected

**2. Logistics Compatibility API**
- Implement API to check logistics channel compatibility before sync
- Provide logistics channel recommendations based on source and target regions
- Allow sellers to query compatible channels for each region

**3. Configuration Management**
- Create centralized logistics channel whitelist management system
- Provide admin UI to view and update region-specific whitelists
- Add audit logging for whitelist changes
- Implement whitelist validation rules

**4. Documentation & Guidance**
- Document logistics channel whitelist per region
- Create SIP logistics setup guide for sellers
- Add troubleshooting guide for sync failures
- Provide logistics channel compatibility matrix

### Verification Steps
1. ✅ Verify logistics channel 50039 supports VN → KH cross-border shipping
2. ✅ Check current KH region SIP logistics whitelist configuration
3. ✅ Add channel 50039 to whitelist (if compatible) OR identify alternative channel
4. ✅ Update configuration in crossupload.api service
5. ✅ Retry sync for P-item 3044833293 to KH A-shop 1013210527
6. ✅ Verify A-item created successfully with correct logistics
7. ✅ Test end-to-end flow: P-item update → A-item sync → logistics validation
8. ✅ Verify no similar issues for other regions (TH, PH, MY, etc.)
9. ✅ Document resolution and update logistics channel compatibility guide

## Affected Services & Teams

### Services
- **crossuploadbff-admin** - Seller Operation Platform BFF
- **crossupload.api** - SIP Item Sync Service (PRIMARY)
- **product-readapi** - Product information service
- **logistics-configuration** - Logistics channel whitelist management

### Teams to Notify
- **@SIP-Platform-Team** (PRIMARY - owns crossupload.api and sync logic)
- **@Logistics-Configuration-Team** (owns logistics channel whitelist configuration)
- **@Seller-Platform-Infrastructure** (owns Seller Operation Platform)
- **@Product-Listing-Team** (for awareness of sync issues)

## Related Information

### Request Flow
```
Seller Operation Platform (seller.test.marketplace.cn)
  ↓ PUT /admin/api/sip/mskus/pitem
mall-sellergatewayunification-test-global
  ↓ PUT /crossuploadbff/admin/sync_related_aitem
crossuploadbff-admin
  ↓ crossupload.api (internal)
crossupload.api
  ↓ Logistics Channel Whitelist Validation
  ✗ FAIL: channel 50039 not in KH whitelist
```

### Configuration Files
- Logistics channel whitelist: crossupload.api service configuration
- Region-specific whitelists: per-region configuration files
- Channel compatibility matrix: logistics service configuration

### Monitoring & Alerts
- Error code 405300005 spike in crossupload.api
- Sync failure rate increase for KH region
- "pshop not hit logistics channel whitelist" error pattern

## Additional Notes

### Why This Validation Exists
The SIP system requires logistics channel whitelist validation to ensure:
1. **Cross-border logistics feasibility** - Channels must support the specific cross-border route
2. **Shipping method availability** - Logistics partners must operate in target region
3. **Service quality** - Only verified and reliable channels are allowed
4. **Cost predictability** - Shipping costs must be calculable for target region
5. **Compliance** - Logistics must meet regional regulations

### Similar Issues to Watch For
- Other logistics channels not whitelisted for KH
- Similar issues in other regions (TH, PH, MY, etc.)
- New logistics channels requiring whitelist updates
- Cross-border route changes affecting whitelists

### Testing Recommendations
- Test all logistics channels for each region combination
- Verify whitelist updates don't break existing syncs
- Test error handling and user messaging
- Validate pre-sync checks work correctly
- Monitor sync success rates after fixes

