# Bug Analysis Summary

## Issue Overview
**TraceID:** e3e3e7f343fdcd2521009576a4896e01  
**Environment:** Test  
**Region:** KH (Cambodia)  
**Severity:** High  
**Date:** 2025-11-20

## Problem Statement
Force Sync operation for SIP (Seller in Primary) items from Primary shop (VN, shop ID: 1013210519) to Affiliated shop (KH, shop ID: 1013210527) is failing with error code 405300005. The sync operation attempts to update affiliated item 3703805432 based on primary item 2944816227 but fails during the product lock check phase due to a timeout in the account health metric service.

This issue blocks sellers from managing their cross-border listings through the SIP feature, preventing them from synchronizing product information, pricing, and inventory across different regional shops.

## Error Details
- **Error Code:** 405300005 (External API Error)
- **Underlying Error Code:** 338300005 (Lock Check Error) → 10004 (Timeout)
- **Error Message:** "external api error : call crossupload.api error:|sync aitem fail for affiShopid:1013210527, reason:call marketplace.listing.upload.product error: external error: external error, source: seller.seller_operation.account_health_metric_api.get_shop_listing_limit, code: 10004"
- **Service:** seller.seller_operation.account_health_metric_api
- **Component:** get_shop_listing_limit
- **API Endpoint:** PUT /crossuploadbff/admin/sync_related_aitem
- **Timestamp:** 2025-11-20 10:53:27 - 10:53:33 UTC

## Root Cause Analysis

### Primary Root Cause
The `seller.seller_operation.account_health_metric_api.get_shop_listing_limit` service is experiencing timeouts (error code 10004) when queried for shop 1013210527 in the KH region. This service is a critical dependency in the product lock check workflow, which validates whether a shop can perform listing operations.

**Why This Happens:**
1. The account health metric API may not be properly configured for KH region in the test environment
2. The service might be experiencing performance issues or high latency
3. Network connectivity issues between services in the test environment
4. The shop data (1013210527) might not exist or be properly initialized in the health metric system

### Service Chain
The error propagates through multiple service layers:

1. **User Action** → Seller Center Web UI
   - User clicks "Force Sync" on SIP MSKU detail page
   
2. **Frontend** → `crossuploadbff.admin.sync_related_aitem` (HTTP PUT)
   - Entry point: crossuploadbff-admin service
   - Request: `{"mst_itemid": 2944816227, "action_type": "sync_asku"}`
   
3. **BFF Layer** → `marketplace.listing.upload.crossupload.api.sync_product`
   - Coordinates the sync operation
   - Request: `{"shop_id": 1013210519, "item_id": 2944816227, "is_create": false}`
   - Returns: 370200006 (SyncProduct returns error)
   
4. **Product Service** → `marketplace.listing.upload.product.update_product`
   - Handles product update for affiliated shop
   - Shop: 1013210527, Item: 3703805432
   - Returns: 338300005 (External error)
   
5. **Lock Service** → `marketplace.listing.upload.lock.check_product_lock`
   - Validates product lock status before update
   - Returns: 338300005 (External error)
   
6. **Health Metric Service** → `seller.seller_operation.account_health_metric_api.get_shop_listing_limit` ❌
   - **FAILS HERE**: Timeout (10004)
   - Cannot retrieve shop listing limit for shop 1013210527

### Configuration Issues

#### 1. Region Sync Config Cache Error
```
ERROR: get cache fail, key:region_sync_config:VN_KH_0
Error: ReadString: expects " or n, but found o
```
The cache configuration for VN→KH region sync is corrupted or improperly formatted. The value stored in cache appears to be invalid JSON or has incorrect data type.

#### 2. Missing Item Attribute Configuration
```
ERROR: attr does not have unitLocalSetting, check region if correct
Attribute ID: 100098 (unit_free_text)
Missing region: KH
```
The item attribute service doesn't have proper unit localization settings for KH region, which may cause validation issues during product sync.

#### 3. Missing Database Table
```
ERROR: Table 'shopee_mpl_shop_kh_db.component_shop_blacklist_tab' doesn't exist
```
The KH region database is missing the `component_shop_blacklist_tab` table, which is used by the shop channels service to check channel blacklists.

#### 4. CID Mismatch Warnings
Multiple services report CID flag mismatches:
```
WARN: viewercontext contains mismatched cid flag: CID from flag=global but CID from env=sg
```
This indicates potential routing or configuration issues in the test environment.

### Data Issues
- **Shop 1013210527**: May not be properly registered in the account health metric system
- **Primary Item 2944816227**: Successfully exists in VN shop 1013210519
- **Affiliated Item 3703805432**: Exists in KH shop 1013210527 but cannot be updated
- **Price Sync**: Also fails with error 411601002 and 320000000001 (ListingCrossUploadService.GetAItemByPShopIdItemId)

## Impact Assessment

### User Impact
- **Severity**: High - Blocks critical business functionality
- **Affected Users**: All SIP merchants trying to sync items from VN to KH
- **Business Impact**: 
  - Cannot manage cross-border inventory
  - Cannot update pricing across regions
  - Cannot synchronize product information
  - Reduces seller efficiency and satisfaction
- **Scope**: KH region in test environment (potentially affects other regions if similar configuration issues exist)

### System Impact
- **Affected Services**:
  - SIP Cross Upload workflow (completely blocked)
  - Product listing updates (blocked for affiliated shops)
  - Price synchronization (fails downstream)
- **Related Features**:
  - Force Sync functionality
  - Automatic SIP sync
  - Product lock validation
  - Shop health metric checks
- **Performance Impact**: 
  - Timeout adds 5+ seconds latency to failed requests
  - Cascading failures across multiple services

## Action Items

### Immediate Actions
1. **Check Service Health**: Verify that `seller.seller_operation.account_health_metric_api` is running and healthy in test environment
2. **Review Logs**: Check account_health_metric_api service logs for shop 1013210527 around 2025-11-20 10:53:27-33 UTC
3. **Validate Shop Data**: Confirm shop 1013210527 exists in the health metric database with proper configuration

### Short-term Actions
1. **Fix Timeout Issue**: 
   - Investigate why get_shop_listing_limit is timing out
   - Check database queries and indexes
   - Review network connectivity between services
   - Verify shop data integrity in health metric system
   
2. **Fix Cache Configuration**:
   - Correct the `region_sync_config:VN_KH_0` cache value format
   - Ensure proper JSON serialization
   - Clear corrupted cache entries
   
3. **Fix Database Schema**:
   - Create missing table `component_shop_blacklist_tab` in KH database
   - Run schema migration scripts for KH region
   
4. **Fix Item Attributes**:
   - Add KH region configuration to attribute 100098 (unit_free_text)
   - Verify all required attributes have KH localization

5. **Verify the Fix**:
   - Retry force sync operation for item 2944816227 → 3703805432
   - Monitor service response times
   - Check error logs for any remaining issues

### Long-term Actions
1. **Add Monitoring**:
   - Set up alerts for account_health_metric_api timeouts
   - Monitor SIP sync success/failure rates
   - Track cross-region sync performance metrics
   
2. **Improve Resilience**:
   - Add retry logic with exponential backoff for health metric API calls
   - Implement circuit breaker pattern for external dependencies
   - Consider caching shop listing limits with TTL
   
3. **Add Fallback Mechanism**:
   - Evaluate if product lock check can proceed with default values when health metric is unavailable
   - Implement graceful degradation for non-critical checks
   
4. **Configuration Management**:
   - Audit all region-specific configurations in test environment
   - Ensure KH region has parity with other regions
   - Automate configuration validation in deployment pipeline
   
5. **Documentation**:
   - Document SIP sync dependencies and failure modes
   - Create runbook for troubleshooting timeout issues
   - Update service dependency map

## Teams to Contact

**Primary:** @Seller-Operation-Team  
**Reason:** Owner of `seller.seller_operation.account_health_metric_api` service that is timing out. They need to investigate why `get_shop_listing_limit` is not responding for shop 1013210527 in KH region.

**Secondary:** @Listing-Upload-Team  
**Reason:** Owner of `marketplace.listing.upload.lock` and product update services. They can provide context on the product lock check workflow and help coordinate the fix. They may also need to review timeout settings and error handling.

**Tertiary:** @Cross-Upload-Team  
**Reason:** Owner of SIP sync workflow and crossupload services. They can provide business context and help with end-to-end testing after the fix.

**Support:** @Infrastructure-Team  
**Reason:** May need to help with database schema issues (missing table), cache configuration problems, and network connectivity between services in test environment.

## Solution Steps

1. **@Seller-Operation-Team**: 
   - Investigate timeout in `get_shop_listing_limit` for shop 1013210527
   - Check if shop data exists and is valid in health metric database
   - Review service performance and database query optimization
   - Fix any data inconsistencies or service configuration issues
   
2. **@Listing-Upload-Team**: 
   - Review timeout settings for external service calls
   - Consider adding retry logic for transient failures
   - Evaluate if lock check can be made more resilient
   
3. **@Cross-Upload-Team**: 
   - Fix cache configuration for `region_sync_config:VN_KH_0`
   - Verify all KH region configurations are properly set up
   
4. **@Infrastructure-Team**: 
   - Create missing database table `component_shop_blacklist_tab` in KH region
   - Fix item attribute configuration for KH region
   - Verify network connectivity and service mesh configuration
   
5. **Verification**: 
   - QA team to retest force sync operation
   - Monitor logs for successful completion
   - Validate affiliated item is properly updated
   - Test with multiple shops to ensure fix is comprehensive

## Verification Steps

After the fix is deployed:

1. **Verify Service Health**:
   - Check that `account_health_metric_api` responds successfully
   - Confirm response time is within acceptable threshold (< 1 second)
   - Validate shop 1013210527 data is accessible

2. **Test Force Sync**:
   - Navigate to SIP MSKU detail page for item 2944816227
   - Click "Force Sync" button
   - Verify success message is displayed
   - Confirm no error codes in response

3. **Validate Data Sync**:
   - Check affiliated item 3703805432 in shop 1013210527
   - Verify product details match primary item
   - Confirm pricing is synchronized
   - Validate inventory levels are updated

4. **Check Service Logs**:
   - Review logs for successful API calls
   - Confirm no timeout errors
   - Validate all service calls complete within SLA

5. **Regression Testing**:
   - Test sync with different item types
   - Test with multiple KH shops
   - Test VN→KH and other cross-region combinations
   - Verify automatic sync still works (not just force sync)

6. **Monitor Production**:
   - Check if similar issues exist in other environments
   - Monitor error rates for 24 hours after fix
   - Validate no new errors are introduced

## Related Information

- **Similar Issues**: 
  - Previous SIP sync failures in other regions
  - Account health metric timeout issues
  - Cross-region configuration problems

- **Documentation**: 
  - SIP (Seller in Primary) Architecture Documentation
  - Product Lock Check Workflow
  - Account Health Metric API Specification
  - Cross Upload Service Integration Guide

- **Monitoring**: 
  - Service Dashboard: account_health_metric_api
  - Error Tracking: Error code 405300005, 338300005, 10004
  - Performance Metrics: SIP sync success rate
  - Log Platform: TraceID e3e3e7f343fdcd2521009576a4896e01

## Next Steps

1. ✅ Create JIRA ticket (use `jira_ticket.txt`)
2. ✅ Notify dev teams (use `chat_message.txt`)
3. ⏳ Wait for Seller Operation team investigation
4. ⏳ Wait for Infrastructure team to fix database/config issues
5. ⏳ Verify fix after resolution
6. ⏳ Retest the force sync scenario
7. ⏳ Perform regression testing across regions
8. ⏳ Update documentation if needed
9. ⏳ Close ticket after successful verification

---
**Generated:** 2025-11-20 09:56:04  
**Analyzer Version:** Bug Analyzer v2.0 (TXT-based)  
**Analyzed By:** Cursor AI



