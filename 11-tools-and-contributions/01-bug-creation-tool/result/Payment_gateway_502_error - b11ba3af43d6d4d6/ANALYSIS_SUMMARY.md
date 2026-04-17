# Bug Analysis Summary

## Issue Overview
**TraceID:** b11ba3af43d6d4d6bc772eb6442d1e00  
**Environment:** Staging  
**Region:** ID  
**Severity:** Critical  
**Date:** 18 November 2025, 12:23:54 ID time

## Problem Statement
Users in ID Staging environment cannot place orders using any non-COD payment methods (Credit Card, Debit Card, MarketplacePay, E-wallets, etc.). The checkout process fails with a generic error message "Some product information in your order has been updated, please go back and try again." Only Cash on Delivery (COD) payment method works.

## Error Details
- **Error Code:** 19300999 (ERROR_UNKNOWN), 35400002 (error_other_service), 502 (Bad Gateway)
- **Error Message:** "Connect Upstream Failed", "error_other_service"
- **Service:** mpp-bridgeapi-staging-id, mppayments-channel-staging-id
- **Component:** Payment Channel Verification, MarketplacePay Gateway Integration
- **API Endpoint:** `https://gw0.pps.i.staging.marketplacepay.co.id/api/get_payment_channel/`
- **Timestamp:** 2025-11-18 12:23:54.444215

## Root Cause Analysis
**CONFIRMED ROOT CAUSE (After Dev Investigation):**

The `pps-payment` service containers were not running in staging environments (ID, TW, PH). This was caused by a **deployment pipeline failure** where:
1. **Old containers were killed** during deployment
2. **New containers failed to start** due to deployment system (gas) issues
3. This left the service completely unavailable, causing nginx to return 502 Bad Gateway

This is a **Deployment System Failure** - not a configuration or networking issue, but a failure in the deployment pipeline that left the pps-payment service with zero running containers.

**Initial Analysis (Before Dev Confirmation):**
The MarketplacePay Gateway (SPM) service appeared unreachable. When users attempted to place orders with non-COD payment methods, the payment verification service (mpp-bridgeapi) called the SPM API to verify the chosen payment channel, but received HTTP 502 Bad Gateway error with "Connect Upstream Failed".

**Why This Happened:**
- Deployment system (gas) had issues that prevented new pps-payment containers from starting
- Old containers were already terminated as part of the deployment process
- This created a "zero container" state where the service was completely down
- Nginx correctly returned 502 because there were no upstream containers to route traffic to

### Service Chain
The error occurs in this service call chain:

1. **User Action** → Place Order with Payment Channel 80030 (Credit Card)
2. **mpcheckout-core-staging-id** → Calls `marketplace.checkout.core.place_order_v4`
3. **mpcheckout-core-staging-id** → Calls `payment.mpp.bridge_api.verify_chosen_payment_channel_v2`
4. **mpp-bridgeapi-staging-id** → Calls SPM API: `POST https://gw0.pps.i.staging.marketplacepay.co.id/api/get_payment_channel/`
5. **MarketplacePay Gateway (SPM)** → **❌ Returns 502 Bad Gateway** (upstream service unreachable)
6. **mpp-bridgeapi-staging-id** → Returns error code `19300999` (ERROR_UNKNOWN)
7. **mpcheckout-core-staging-id** → Aborts checkout with error `35400002` (error_other_service)
8. **User** → Sees error message: "Some product information in your order has been updated, please go back and try again."

### Deployment Issues (Actual Root Cause)
- **Service:** `pps-payment` (MarketplacePay Payment Service)
- **Deployment System:** gas (deployment pipeline)
- **Problem:** Deployment pipeline failure causing zero running containers
  - ✅ Old containers were killed during deployment
  - ❌ New containers failed to start due to gas system issues
  - ❌ Service left in "zero container" state
  - ❌ Nginx returns 502 because no upstream containers available
- **Affected Regions:** ID, TW, PH staging environments
- **Live Environment:** Not affected (only staging)

### Data Issues
**Request Data (Working):**
```json
{
  "_ts": 1763439834,
  "client_id": 80004,
  "channel_id": 8001400
}
```

**Response Data (Failed):**
```html
<html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>Connect Upstream Failed</h1></center>
<hr><center>nginx</center>
</body>
</html>
```

The request payload is valid, but the server cannot process it due to upstream unavailability.

## Impact Assessment
### User Impact
- **All users in ID Staging environment** cannot complete checkout with digital payment methods
- **100% failure rate** for non-COD payments
- **Business impact:** Complete blockage of payment testing in Staging
- **User experience:** Confusing error message that doesn't indicate payment issue
- **Workaround available:** Users can only use COD payment method

### System Impact
- **Payment verification system:** Completely broken for ID Staging
- **Related features affected:**
  - Payment method selection
  - Payment promotions (cannot be tested)
  - Credit card verification
  - E-wallet integration
  - Buy Now Pay Later features
  - Payment channel recommendations
- **Performance impact:** Checkout requests timeout after ~260ms waiting for SPM response
- **Cascading failures:** Payment promotion service also fails (error code 10000, 441800008)

## Action Items
### Immediate Actions
1. **Check MarketplacePay Gateway service status** in ID Staging environment
2. **Verify nginx configuration** for upstream routing to SPM service
3. **Check network connectivity** between mpp-bridgeapi and SPM gateway
4. **Review recent deployments** that might have affected SPM service

### Short-term Actions
1. **Restart MarketplacePay Gateway service** if it's down
2. **Fix nginx upstream configuration** if misconfigured
3. **Verify the fix** by placing test order with Credit Card payment
4. **Monitor error rates** for payment verification endpoints
5. **Check other regions** (SG, MY, TH, etc.) to see if issue is ID-specific

### Long-term Actions (Preventive Measures)
1. **Improve deployment pipeline (gas system)**:
   - Add pre-deployment health checks
   - Implement rollback mechanism if new containers fail to start
   - Add alerts for "zero container" state
   
2. **Add deployment monitoring**:
   - Monitor container startup success rate
   - Alert when old containers killed but new ones not started
   - Track deployment duration and failures
   
3. **Implement service health checks**:
   - Add automatic health checks for pps-payment service
   - Alert when service becomes unavailable
   - Set up monitoring dashboard for container status
   
4. **Improve error messaging**:
   - Return more specific error when deployment is in progress
   - Differentiate between "service down" and "deployment in progress"
   
5. **Create runbook**:
   - Document deployment failure scenarios
   - Add troubleshooting steps for gas system issues
   - Include container restart procedures

## Teams to Contact

### Initial Contact (Based on Symptoms):
**Primary:** @MarketplacePay-Gateway-Team  
**Reason:** The MarketplacePay Gateway (SPM) service at `gw0.pps.i.staging.marketplacepay.co.id` is returning 502 Bad Gateway. This team owns the SPM service and needs to investigate why the upstream service is unreachable.

**Secondary:** @Payment-Platform-Team  
**Reason:** The mpp-bridgeapi service is the caller experiencing the failure. This team should verify their nginx configuration and network connectivity to SPM gateway.

### Actual Teams Involved (After Investigation):
**Primary:** @Backend-Core-Team (Zibin Pan)  
**Reason:** Fixed the deployment pipeline (gas system) that was preventing new containers from starting.

**Secondary:** @MarketplacePay-Backend-Team  
**Reason:** Redeployed the pps-payment service after deployment pipeline was fixed.

**Tertiary:** @SPM-Checkout-Team  
**Reason:** Coordinated the investigation and escalation to appropriate teams.

## Solution Steps (ACTUAL - Confirmed by Dev Team)

### What Was Done to Fix:
1. **@Backend-Core-Team (Zibin Pan)**: 
   - ✅ Fixed deployment pipeline (gas system) issues
   - ✅ Resolved container startup failures
   - ✅ Enabled successful redeployment of pps-payment service

2. **@MarketplacePay-Backend-Team**: 
   - ✅ Redeployed pps-payment service across all affected staging regions (ID, TW, PH)
   - ✅ Verified new containers started successfully
   - ✅ Confirmed service health and availability

3. **@QA-Team**: 
   - ✅ Verified payment API returned to normal operation
   - ✅ Confirmed order placement works in staging environments
   - ✅ Tested multiple payment methods

### Resolution Timeline:
1. **Detection:** QA reported 404/502 errors in payment APIs
2. **Escalation:** SPM Checkout and MarketplacePay backend teams notified
3. **Investigation:** Identified deployment pipeline failure (gas system)
4. **Fix:** Backend core team fixed gas deployment system
5. **Redeploy:** Successfully redeployed pps-payment service
6. **Verification:** QA confirmed fix across all regions

## Verification Steps
After the fix is deployed:
1. **Test basic checkout flow:**
   - Login to staging.marketplace.co.id
   - Add items to cart
   - Select Credit Card payment (channel_id: 80030)
   - Place order
   - Verify order is created successfully

2. **Verify API responses:**
   - Check `payment.mpp.bridge_api.verify_chosen_payment_channel_v2` returns success
   - Check SPM API returns valid payment channel data (not 502 error)
   - Verify no error codes: 19300999, 35400002, 502

3. **Test multiple payment methods:**
   - Credit Card (80030)
   - Debit Card (80032)
   - MarketplacePay (80009)
   - Other e-wallets
   - Verify all return valid responses

4. **Monitor for 30 minutes:**
   - Check error rates in monitoring dashboard
   - Verify no new 502 errors from SPM gateway
   - Check payment success rate returns to normal

## Related Information
- **Similar Issues:** Payment gateway outages typically affect all non-COD payment methods
- **Documentation:** 
  - MarketplacePay Gateway API docs
  - mpp-bridgeapi service documentation
  - Payment verification flow diagram
- **Monitoring:** 
  - SPM Gateway health dashboard
  - Payment service error rate metrics
  - Checkout success rate by payment method

## Log Evidence

### Error from mpp-bridgeapi-staging-id:
```
2025-11-18 12:23:54.444215|DEBUG|b11ba3af43d6d4d6bc772eb6442d1e00
url: https://gw0.pps.i.staging.marketplacepay.co.id/api/get_payment_channel/
method: POST
elapsed_millis: 19
status_code: 502
response_body: <html><head><title>502 Bad Gateway</title></head>
<body><center><h1>Connect Upstream Failed</h1></center></body></html>
```

### Error from mpcheckout-core-staging-id:
```
2025-11-18 12:23:54.445932|ERROR|b11ba3af43d6d4d6bc772eb6442d1e00
place_order_err
ErrCheckout{"checkout_err_key":"error_other_service","checkout_errcode":2}
ErrSPEXCall{"cmd":"payment.mpp.bridge_api.verify_chosen_payment_channel_v2","code":19300999,"name":"ERROR_UNKNOWN"}
```

### Error from mppayments-channel-staging-id:
```
2025-11-18 12:23:54.009016|ERROR|b11ba3af43d6d4d6bc772eb6442d1e00
url: https://spm.i.staging.marketplace.co.id/api/batch_get_payment_options/
status_code: 502
invalid character '<' looking for beginning of value
```

## Post-Mortem Findings

### What We Learned:
1. **502 errors don't always mean network issues** - In this case, it was a deployment pipeline failure
2. **Deployment system (gas) can fail silently** - Old containers killed but new ones didn't start
3. **Multiple regions affected simultaneously** - ID, TW, PH staging all impacted
4. **Live environment was safe** - Issue only affected staging, good deployment isolation
5. **Symptom vs Root Cause** - Initial analysis pointed to SPM service down, actual cause was deployment pipeline

### Key Takeaways:
- **Always check container status** when investigating 502 errors
- **Deployment failures can masquerade as service outages**
- **Cross-region impact suggests infrastructure/deployment issue** rather than service-specific bug
- **Collaboration between teams is crucial** - Required Backend Core, MarketplacePay Backend, and SPM Checkout teams

### Lessons for Future Debugging:
1. When seeing 502 "Connect Upstream Failed", check if containers are running
2. Look for recent deployments that might have failed
3. Verify deployment pipeline health before assuming service issues
4. Check multiple regions to identify pattern (infrastructure vs service)

## Next Steps
1. ✅ Create JIRA ticket (use `jira_ticket.txt`)
2. ✅ Notify dev teams (use `chat_message.txt`)
3. ✅ Backend Core team fixed deployment pipeline (gas system)
4. ✅ MarketplacePay Backend team redeployed pps-payment service
5. ✅ QA verified fix - payment APIs working normally
6. ✅ Order placement confirmed working in all staging regions
7. ⏳ Implement preventive measures (monitoring, alerts, runbook)
8. ⏳ Update deployment pipeline documentation

---
**Generated:** 18 November 2025, 12:23:54 ID time  
**Analyzer Version:** Bug Analyzer v2.2 (TXT-based)  
**Analyzed By:** Cursor AI

