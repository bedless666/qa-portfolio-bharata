# Bug Analysis Summary

## Issue Overview
**TraceID:** b11ba3af43d5ddc97234603034d14500  
**Environment:** Test  
**Region:** KH (Cambodia)  
**Severity:** High  
**Date:** 2025-11-18 11:14:48

## Problem Statement
KH Aitem showing as unlisted in Product Detail Page (PDP) but the same item is available in VN Pshop. This is caused by Hardy database routing errors preventing shop fulfillment information retrieval in KH test environment, combined with invalid address issues and service CID mismatches.

## Error Details
- **Error Code:** 3025 (Hardy routing), 10005 (ERROR_SYSTEM), 10000 (empty address)
- **Error Message:** 
  - "hardy (3025): routing out of range, route region: kh, route index: 0"
  - "ERROR_SYSTEM"
  - "unavailable address id|userid=7347400547, address_id=0"
  - "CID from flag=kh but CID from env=ph"
- **Service:** sellerfulfilment-fulfilmentinfo-test-ph, lps-api-test-kh, prefulfilment-fulfilmentplanning-test-kh
- **Component:** Hardy routing, Shop fulfillment info, Address service
- **API Endpoint:** marketplace.order.order_fulfilment.seller.fulfilmentinfo.get_shop_fm_info
- **Timestamp:** 2025-11-18 11:14:48.421961

## Root Cause Analysis

### Primary Issue: Hardy Routing Error

**Log Evidence:**
```
sellerfulfilment-fulfilmentinfo-test-ph:
hardy (3025): routing out of range, route region: kh, route index: 0
Query: SELECT `shop_id`,`warehouse_id`,`shipping_method`,`from_site`,`update_time`,`operator`,`create_time`,`region_id` 
FROM `shop_fm_info_tab` WHERE `shop_id`=1013210527 LIMIT 1;
Response: ERROR_SYSTEM (code: 10005)
```

**Analysis:**
- Hardy routing table doesn't have proper shard mapping for KH region
- Route index 0 is out of range for KH region queries
- Shop fulfillment info cannot be retrieved
- Without fulfillment info, item cannot be properly listed

### Secondary Issue: Invalid Address

**Log Evidence:**
```
lps-api-test-kh:
unavailable address id|userid=7347400547, address_id=0
empty_user_location_buyer_address (ce=10000)
```

**Analysis:**
- Address ID 0 is invalid/uninitialized
- Causes cascade failures in logistics and fulfillment services
- Contributes to item listing failures

### Tertiary Issue: Service CID Mismatch

**Log Evidence:**
```
sellerfulfilment-fulfilmentinfo-test-ph:
Spex error code 10019: viewercontext contains mismatched cid flag: CID from flag=kh but CID from env=ph
```

**Analysis:**
- Service deployed in PH environment is handling KH requests
- Incorrect service routing configuration
- Causes region-specific logic failures

### Service Chain
1. **PDP Request** → Get item details for item_id=3703805432 in KH
2. **Shop Fulfillment Query** → Need shop_id=1013210527 fulfillment info
3. **Hardy Routing** → Fails with "routing out of range" for KH
4. **ERROR_SYSTEM** → Cannot retrieve shop fulfillment configuration
5. **Item Listing** → Without fulfillment info, item shows as "unlisted"
6. **Cross-Region Check** → Same item available in VN (where routing works)

### Configuration Issues

**Hardy Routing:**
- KH region not properly configured in routing table
- Route index 0 out of range
- Need to add KH shard mapping

**Service Deployment:**
- `sellerfulfilment-fulfilmentinfo` running in PH environment
- Should be running in KH environment for KH requests
- Service discovery/routing misconfigured

**Address Data:**
- Invalid address_id=0 being used
- Need address validation at entry point

### Data Issues
- **Shop:** 1013210527 exists but fulfillment info unretrievable in KH
- **Item:** 3703805432 available in VN but unlisted in KH
- **User:** 7347400547 has invalid address (address_id=0)
- **Cross-region inconsistency:** Same shop/item different availability

## Impact Assessment

### User Impact
- Items appear unlisted in KH that should be available
- Users cannot purchase products that exist in VN
- Inconsistent shopping experience across regions
- All KH shops potentially affected by routing issue

### System Impact
- Hardy routing failure for entire KH region
- Shop fulfillment info unavailable for all KH shops
- Service CID mismatch causing region logic failures
- Cross-region testing blocked
- Multiple cascade failures from single root cause

## Action Items

### Immediate Actions
1. **Configure Hardy routing** for KH region - add proper shard mapping for route index 0
2. **Fix service CID routing** - ensure KH requests route to KH service instances
3. **Add address validation** - reject address_id=0 at entry point

### Short-term Actions
1. **Verify Hardy routing** for all KH database queries
2. **Review service deployment** - ensure correct region assignment
3. **Fix DNS configuration** for fss-searchapi.ssc.test.marketplace.kh.com
4. **Audit cross-region consistency** - ensure items have same availability

### Long-term Actions
1. **Add Hardy routing validation** for new regions
2. **Implement service routing monitoring** - alert on CID mismatches
3. **Add cross-region consistency checks** - monitor item availability
4. **Create region setup checklist** for test environments

## Teams to Contact

**Primary:** @DBA  
**Reason:** Hardy routing configuration for KH region. Need to configure routing table and add shard mapping.

**Primary:** @Platform-Infrastructure  
**Reason:** Service CID routing issues and DNS configuration. Services in PH handling KH requests incorrectly.

**Secondary:** @Fulfillment-Team  
**Reason:** Shop fulfillment info service affected. May need to verify KH-specific fulfillment configuration.

**Secondary:** @Listing-Team  
**Reason:** Item listing inconsistency between KH and VN. Need to verify listing logic dependencies on fulfillment info.

## Solution Steps

1. **@DBA - Hardy Routing Configuration**:
   - Add KH region to Hardy routing table
   - Configure proper shard mapping for route index 0
   - Verify routing works for shop_fm_info_tab queries
   - Test: `SELECT * FROM shop_fm_info_tab WHERE shop_id=1013210527;`

2. **@Platform-Infrastructure - Service CID Routing**:
   - Review service deployment for sellerfulfilment-fulfilmentinfo
   - Ensure KH requests route to KH service instances (not PH)
   - Fix service discovery configuration
   - Verify no CID mismatch warnings in logs

3. **@Platform-Infrastructure - DNS Configuration**:
   - Fix DNS entry for fss-searchapi.ssc.test.marketplace.kh.com
   - Verify all KH test environment DNS entries
   - Test DNS resolution from KH services

4. **@Fulfillment-Team - Address Validation**:
   - Add validation to reject address_id=0
   - Return clear error message for invalid address
   - Prevent cascade failures from invalid address

5. **Verification**:
   - Test Hardy routing for KH shops
   - Verify item shows as available in KH PDP
   - Check no routing errors in logs
   - Confirm cross-region consistency (KH = VN availability)

## Verification Steps

After the fix is deployed:

1. **Verify Hardy Routing:**
   - Query: `SELECT * FROM shop_fm_info_tab WHERE shop_id=1013210527;` in KH
   - Should return shop fulfillment info without routing error
   - Check logs: No "routing out of range" errors

2. **Verify Service CID Routing:**
   - Make request to get_shop_fm_info for KH shop
   - Check logs: No CID mismatch warnings
   - Verify request handled by KH service instance (not PH)

3. **Verify Item Listing:**
   - Access PDP for item_id=3703805432 in KH
   - Item should show as available (not unlisted)
   - Availability should match VN region

4. **Verify Cross-Region Consistency:**
   - Check same item in KH and VN
   - Both should show available
   - Fulfillment info should be retrievable in both regions

5. **End-to-End Test:**
   - Complete purchase flow for item in KH
   - Verify all services respond successfully
   - Check no Hardy routing or CID mismatch errors

## Related Information

- **Shop ID:** 1013210527
- **Item ID:** 3703805432
- **Model ID:** 260001375764
- **User ID:** 7347400547
- **Affected Services:**
  - sellerfulfilment-fulfilmentinfo-test-ph (should be KH)
  - lps-api-test-kh
  - prefulfilment-fulfilmentplanning-test-kh
  - prefulfilment-fulfilmentplanningp1-test-kh

- **Database Details:**
  - Cluster: seller_fulfillment_db_cluster
  - Table: shop_fm_info_tab
  - Hardy version: v0.11.0
  - Error: routing out of range for KH region

- **Documentation:**
  - Hardy routing configuration guide
  - Service deployment and CID routing rules
  - Cross-region listing consistency requirements
  - KH region setup documentation

- **Monitoring:**
  - Log platform: Search TraceID b11ba3af43d5ddc97234603034d14500
  - Hardy routing error dashboard
  - Service CID mismatch alerts

## Next Steps

1. ✅ Create JIRA ticket (use `jira_ticket.txt`)
2. ✅ Notify dev teams (use `chat_message.txt`)
3. ⏳ Wait for DBA to configure Hardy routing
4. ⏳ Wait for Platform team to fix service routing
5. ⏳ Verify fix after resolution
6. ⏳ Retest the scenario
7. ⏳ Update documentation for KH region setup

---
**Generated:** 2025-11-18 11:30:00  
**Analyzer Version:** Bug Analyzer v2.2 (Unified)  
**Analyzed By:** Cursor AI

