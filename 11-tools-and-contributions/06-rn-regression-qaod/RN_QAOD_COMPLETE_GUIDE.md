# 🚀 RN QAoD Complete Guide

**Quality Assurance on Demand - React Native Regression Testing**

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Role & Responsibilities](#role--responsibilities)
3. [Timeline & Workflow](#timeline--workflow)
4. [Chat Templates](#chat-templates)
5. [Phase-by-Phase Checklist](#phase-by-phase-checklist)
6. [Tools & Resources](#tools--resources)
7. [Communication Protocols](#communication-protocols)
8. [Tips & Best Practices](#tips--best-practices)
9. [FAQ](#faq)
10. [Quick Reference](#quick-reference)

---

## 📖 Overview

### What is RN QAoD?

**RN QAoD (Quality Assurance on Duty)** is a rotating role within the Regression QA team responsible for coordinating and managing the entire React Native regression testing cycle for a specific month.

### Key Characteristics

- **Duration**: One month rotation
- **Scope**: RN regression testing (Staging + Live)
- **Focus**: Coordination, communication, and execution


### Team Structure

Within the Regression QA team, there are multiple QAoD roles:
- **Native QAoD**: Handles native app regression
- **RN QAoD**: Handles React Native regression (this guide)
- **Seller QAoD**: Handles seller platform regression

---

## 👤 Role & Responsibilities

### Core Responsibilities

#### 1. **Stakeholder Communication**
- Coordinate with Release team
- Sync with RN version stakeholders
- Manage RN schedule updates
- Communicate deployment status

#### 2. **Version Coordination**
Track and coordinate multiple app versions:
- **Shopee App**: iOS & Android versions
- **Seller App**: iOS & Android (Internal & ID builds)
- **Shopee Lite**: App & RN versions
- **RN Versions**: Track releases from MKP Group

#### 3. **Test Case Distribution**
- Distribute test cases to team members
- Assign tasks per regression schedule
- Ensure coverage across all teams
- Send announcements via SeaTalk

#### 4. **Deployment Coordination**
- Monitor deployment progress (99 services across 7 teams)
- Coordinate with PICs for service follow-ups
- Track deployment status (Pending/Deploying/Failed/Completed)
- Handle deployment issues and escalations

#### 5. **Outstanding Services Tracking**
- Monitor blockers before testing starts
- Communicate outstanding services to team
- Track resolution progress
- Coordinate alternative testing approaches

#### 6. **Internal Target Management**
- Set internal deadlines (typically 18:00 WIB)
- Track progress towards targets
- Send reminders when needed
- Ensure timely completion

#### 7. **Tool & Template Maintenance**
- Keep HTML chat generator updated
- Maintain chat templates
- Update documentation as needed
- Ensure tools are functional

#### 8. **Backup Coordination**
- Manage PIC unavailability scenarios
- Coordinate backup assignments
- Ensure coverage continuity
- Communicate changes to team

---

## 📅 Timeline & Workflow

### Typical RN Regression Cycle (3-Day Cycle)

```
Friday (D-1)          Monday (D+1)         Wednesday (D+3)
    |                     |                      |
    v                     v                      v
Deployment          Staging Testing        Live Testing
 Staging              (Staging Env)          (Live Env)
```

### Detailed Timeline

#### **Day 1: Friday - Deployment Staging**

**Timing**: Usually Friday afternoon (16:30 Jakarta Time)

**Activities**:
1. Send **Deployment Staging announcement** (H-1 before staging regression)
2. Coordinate with deployment team
3. Monitor service deployment progress
4. Track deployment status per team
5. Communicate outstanding services

**Key Output**: Deployment Staging for Regression chat

---

#### **Day 2: Monday - Staging Regression**

**Timing**: Monday (H+1 after deployment, H-2 before live)

**Activities**:
1. Send **Staging Regression announcement** in the morning
2. Distribute test cases to all team members
3. Coordinate testing across:
   - **Shopee App**: iOS, Android, PC, Admin
   - **Seller App**: iOS, Android (multiple builds)
   - **Shopee Lite**: Android
   - **Promotion Admin**: PC
4. Monitor testing progress
5. Track bugs found (with proper labels)
6. Ensure internal target met (18:00 WIB)
7. Prepare for live regression

**Key Output**: Staging Regression chat with full checklist

---

#### **Day 3: Wednesday - Live Regression**

**Timing**: Wednesday (H+2 after staging regression)

**Activities**:
1. Send **Live Regression announcement** in the morning
2. Mention team masters for each team
3. Coordinate live testing (ID country only)
4. Monitor 2-hour testing window (15:00-17:00 WIB)
5. Track completion status
6. Document results
7. Send completion summary

**Key Output**: Live Regression chat with master mentions

---

### Weekly Pattern

```
Week 1: Cycle 1 (Fri → Mon → Wed)
Week 2: Cycle 2 (Fri → Mon → Wed)
Week 3: Cycle 3 (Fri → Mon → Wed)
Week 4: Cycle 4 (Fri → Mon → Wed)
```

**Note**: Actual schedule may vary based on release calendar and holidays.

---

## 💬 Chat Templates

### Template 1: Deployment Staging for Regression

**When to Send**: H-1 before staging regression (usually Friday)

**Target Audience**: Regression testers (for deployment follow-up)

**Purpose**: Coordinate service deployment follow-up

**Template**:

```
Hi All,

Kindly help to follow up these Staging deployment services.

Services:
[RELEASE PORTAL LINK with rsl_schedule]
📋 Guide: https://space.shopee.io/release/portal/regression_management/regression_schedule?tab=2

Docs:
https://docs.google.com/spreadsheets/d/1UeaO0XwM0_RLVFPa0nAtkF1yG7-hp7tTnkm2LvyghA4/edit?gid=1498598204#gid=1498598204

Reference confluence:
https://confluence.shopee.io/pages/viewpage.action?spaceKey=IMD&title=Staging+and+Live+Deployment+Management+Guide

Testing Schedule: [VERSION]-Staging
Example: 2025.11.v4-Staging

Deployment start: [DATE] [TIME] Jakarta Time
Example: 27 November 2025 16.30 Jakarta Time

Notes:
⚠️ ⚠️ PLEASE SEE THIS FOR NEW ROLE in https://confluence.shopee.io/display/IMD/Staging+and+Live+Deployment+Management+Guide#heading-OverrideDeployment

Focus only priority P1 + P2

Follow-up all status

Deployment Thread:
💬 Check in MKP Regression Group

Thanks~!
```

**Required Information**:
- Version number (e.g., 2025.11.v4)
- RSL schedule number
- Deployment date and time
- Deployment thread link (optional)

---

### Template 2: Staging Regression

**When to Send**: H+1 after deployment, H-2 before live (usually Monday)

**Target Audience**: All regression testers

**Purpose**: Distribute test cases and coordinate testing

**Template**:

```
Hii All~ 👋

Here are checklists for Staging Regression [VERSION]

🗓️ Date:
[FULL DATE]

📝 Regression Tasks:
Test Case & QA PIC:
[SPREADSHEET LINK]
📋 Guide: Check your email, or check in MP Report Group for test case
Sample: [SEATALK LINK]

🎟️ Main Jira Ticket:
Seller App: [JIRA LINK]
Buyer App: [JIRA LINK]
📋 Guide: SPQAA most recent created - https://jira.shopee.io/issues/?filter=150230

🏷️ Label error:
regression_staging_bug_country
regression_staging_bug_ID
regression_staging_bug_BR
regression_staging_bug_TW
regression_staging_bug_SG
regression_staging_bug_VN
regression_staging_bug_PH
regression_staging_bug_MY
regression_staging_bug_TH
regression_staging_bug_CO
regression_staging_bug_CL
regression_staging_bug_MX

📱 Shopee App version:
iOS [VERSION] or latest for Regression
Android [VERSION] or latest for Regression
🔗 Check version: https://app.sea.com/apps/246

⚙️ Shopee App RN version:
Available [TIME] SG Time

📱 Seller App version:
Shopee Seller Internal Build
iOS [VERSION]
Android [VERSION]
🔗 Check Version: https://app.sea.com/apps/305

Shopee Seller ID Internal Build
iOS [VERSION]
Android [VERSION]
🔗 Check Version: https://app.sea.com/apps/306

⚙️ Seller App RN version:
[VERSION TAG]
📋 Guide: can check in MKP Group

📱 Shopee Lite App version:
[VERSION] or latest for Regression
🔗 Check Version: https://app.sea.com/apps/196

⚙️ Shopee Lite RN version:
[VERSION]
🔗 Check Version: [CONFLUENCE LINK]

🌏 Country Supported:
Shopee App
Main Country: ID, BR, TW
Additional Test cases: SG, PH, TH, VN, MY, CO, CL, MX
Platform: Android, IOS, PC, Admin
Mari Bank & Sea Bank Test Case: 10, 12, 28 {PH,SG,ID}
Environment: Staging

Shopee Lite:
Country: ID
Platform: Android
Environment: Staging

Promotion Admin:
Country: Mostly ID
Platform: PC
Environment: Staging

📌 Internal Target:
[DATE], before 18:00 WIB
💡 Guide: Today before 18:00 WIB

‼️ Important notes:
Please be aware of some outstanding services in here and start your testing accordingly:
[DEPLOYMENT THREAD LINK]

Thank you~! 🙏✨
```

**Required Information**:
- Version number
- Date
- Test case spreadsheet URL
- Jira tickets (Seller & Buyer)
- All app versions (Shopee, Seller, Lite)
- RN versions
- Outstanding services link

---

### Template 3: Live Regression

**When to Send**: H+2 after staging regression (usually Wednesday)

**Target Audience**: Team masters (specific PICs per team)

**Purpose**: Coordinate live regression testing (ID only)

**Template**:

```
Hi Master
@[BUYER MASTER] (Buyer)
@[ORDER OPS MASTER] (Order Ops)
@[SELLER MASTER] (Seller (backup))
@[PROMOTION MASTER] (Promotion)
📋 Guide: Check names at [MASTER NAMES SPREADSHEET]

Here are the checklist for ID Live Regression today

📅 Date:
[FULL DATE]

📝 Live Regression TCs & PIC:
[SPREADSHEET LINK]
📋 Guide: can duplicate from here - [TEMPLATE LINK]

🎟️ Main Jira Ticket:
[JIRA LINK]
📋 Guide: Check Recent JIRA Ticket - https://jira.shopee.io/issues/?filter=150230

🎟️ SPMR Jira Ticket:
[SPMR JIRA LINK]
📋 Sample: https://jira.shopee.io/browse/SPMR-1448

📱 RN version:
[RN VERSION]
🔗 Check version: In MKP group

📱 App version:
iOS: latest from App Store
Android: latest from Play Store

⚙️ QR RN:
https://app.shopee.io/rn-release/version-selection

🛠️ Environment:
Live

🇮🇩 Country:
ID

📌 Internal Target:
Start: [DAY, DATE, TIME WIB]
End: [DAY, DATE, TIME WIB]

⚠️ Important notes:
No need to wait for outstanding services deployment
Today we will try to finish the Live Testing under 2 hours

Thank you all.
```

**Required Information**:
- Team master names (4 teams)
- Version number
- Date
- Live regression TC spreadsheet
- Main Jira ticket
- SPMR Jira ticket
- RN version
- Start and end time

**Key Differences from Staging**:
- Mentions specific team masters
- ID country only
- 2-hour testing window
- Live environment
- No outstanding services wait
- Uses latest app store versions

---

## ✅ Phase-by-Phase Checklist

### Pre-Deployment Phase (Thursday/Friday Morning)

**Planning & Preparation**:
- [ ] Review deployment schedule from Release Portal
- [ ] Verify service list
- [ ] Confirm PIC availability for deployment window
- [ ] Check for any blackout periods or holidays
- [ ] Prepare deployment announcement template
- [ ] Update version numbers if available
- [ ] Coordinate with Release Manager Shadow

**Documentation**:
- [ ] Update regression schedule documentation
- [ ] Prepare test case spreadsheet
- [ ] Create Jira tickets (Seller & Buyer)
- [ ] Share confluence reference links
- [ ] Prepare outstanding services tracking

**Communication**:
- [ ] Notify team about upcoming deployment
- [ ] Confirm team availability
- [ ] Share deployment schedule
- [ ] Set expectations for follow-up

---

### Deployment Day (Friday Afternoon)

**Before Deployment (2-4 hours before)**:
- [ ] Send deployment staging announcement
- [ ] Include release portal link with rsl_schedule
- [ ] Share deployment docs spreadsheet
- [ ] Remind about P1 + P2 priority focus
- [ ] Share deployment thread link

**During Deployment**:
- [ ] Monitor deployment progress in real-time
- [ ] Track service status per team:
  - Buyer Team (42 services)
  - Order Operation Team (27 services)
  - Promotion Team (19 services)
  - User Team (10 services)
  - Others
- [ ] Coordinate with PICs for service follow-ups
- [ ] Document deployment issues/failures
- [ ] Update status in tracking spreadsheet
- [ ] Handle escalations if needed

**After Deployment**:
- [ ] Verify all services deployed or documented
- [ ] Compile list of outstanding services
- [ ] Share outstanding services with team
- [ ] Prepare for staging regression testing
- [ ] Update test case assignments

---

### Staging Regression Day (Monday)

**Morning (Before 10:00 AM)**:
- [ ] Send staging regression announcement
- [ ] Distribute test cases to all team members
- [ ] Share test case spreadsheet with assignments
- [ ] Include all version information
- [ ] Set internal target (18:00 WIB)
- [ ] Share outstanding services info

**During Testing (10:00 AM - 6:00 PM)**:
- [ ] Monitor testing progress per team
- [ ] Track test coverage across platforms:
  - [ ] Shopee App (iOS/Android/PC/Admin)
  - [ ] Seller App (iOS/Android - multiple builds)
  - [ ] Shopee Lite (Android)
  - [ ] Promotion Admin (PC)
- [ ] Monitor bug reports with proper labels
- [ ] Answer team questions
- [ ] Coordinate with PICs on blockers
- [ ] Send progress reminders (if needed)

**Evening (Before 6:00 PM)**:
- [ ] Ensure all critical test cases completed
- [ ] Verify bug reports are properly labeled
- [ ] Document any blockers for live regression
- [ ] Compile staging regression summary
- [ ] Prepare for live regression (Wednesday)

**After Testing**:
- [ ] Review staging regression results
- [ ] Identify any issues for live regression
- [ ] Update live regression test cases
- [ ] Confirm team masters for live regression
- [ ] Prepare live regression announcement

---

### Live Regression Day (Wednesday)

**Morning (Before 2:00 PM)**:
- [ ] Verify team master names from spreadsheet
- [ ] Send live regression announcement
- [ ] Mention all team masters with @tags
- [ ] Share live regression TC spreadsheet
- [ ] Include SPMR Jira ticket
- [ ] Set 2-hour testing window (15:00-17:00 WIB)

**During Testing (3:00 PM - 5:00 PM)**:
- [ ] Monitor 2-hour testing window
- [ ] Track progress per team master
- [ ] Coordinate with masters on any issues
- [ ] Document any critical bugs found
- [ ] Ensure testing stays on schedule

**After Testing (After 5:00 PM)**:
- [ ] Verify all test cases completed
- [ ] Compile live regression results
- [ ] Document bugs found (if any)
- [ ] Send completion summary
- [ ] Thank team for participation

**Wrap-up**:
- [ ] Update regression cycle documentation
- [ ] Archive test results
- [ ] Share final summary with stakeholders
- [ ] Prepare for next regression cycle

---

### Post-Regression Phase

**Documentation**:
- [ ] Update regression metrics
- [ ] Document lessons learned
- [ ] Update templates if needed
- [ ] Archive all communications

**Follow-up**:
- [ ] Track bug resolution
- [ ] Coordinate hotfixes if needed
- [ ] Update documentation based on feedback
- [ ] Prepare for next cycle

**Handover (End of Month)**:
- [ ] Document current status
- [ ] Share pending items with next QAoD
- [ ] Transfer knowledge
- [ ] Update contact information

---

## 🛠️ Tools & Resources

### Primary Tools

#### 1. **RN Regression Chat Generator**
- **File**: `rn-regression-chat-generator.html`
- **Purpose**: Generate all 3 chat templates
- **Features**:
  - Tab-based template selection
  - Auto-date filling
  - Guide links for all fields
  - Copy to clipboard
  - Preview before sending

**How to Use**:
1. Open HTML file in browser
2. Select template tab (Deployment/Staging/Live)
3. Fill in required fields
4. Use quick fill buttons for dates
5. Click "Generate Chat"
6. Review preview
7. Click "Copy to Clipboard"
8. Paste in SeaTalk

#### 2. **Service Distribution Documents**
- **Purpose**: Know which PIC handles which service
- **Key Files**:
  - `QUICK_PIC_LOOKUP.md` - Fast lookup by service name
  - `service_pic_assignment.csv` - Complete service list
  - `PIC_ASSIGNMENT_SUMMARY.md` - Detailed assignments

**How to Use**:
1. See deployment notification
2. Open QUICK_PIC_LOOKUP.md
3. Search for service name
4. Tag the assigned PIC

#### 3. **Team Contact Information**
- **Files**:
  - `CONTACT_LIST.md` - Complete contact directory
  - `REGRESSION_QA_TEAM.md` - Team structure
  - `regression_qa_team_matrix.csv` - Spreadsheet format

### Important Links

#### Release & Deployment
- **Release Portal**: https://space.shopee.io/release/portal/regression_management/regression_schedule?tab=2
- **Deployment Docs**: https://docs.google.com/spreadsheets/d/1UeaO0XwM0_RLVFPa0nAtkF1yG7-hp7tTnkm2LvyghA4/
- **Confluence Guide**: https://confluence.shopee.io/pages/viewpage.action?spaceKey=IMD&title=Staging+and+Live+Deployment+Management+Guide

#### Version Checking
- **Shopee App**: https://app.sea.com/apps/246
- **Seller App (Internal)**: https://app.sea.com/apps/305
- **Seller App (ID)**: https://app.sea.com/apps/306
- **Shopee Lite**: https://app.sea.com/apps/196
- **Lite RN Memo**: https://confluence.shopee.io/pages/viewpage.action?spaceKey=SPAT&title=%5B2024%5D+Shopee+Lite+RN+Release+Memo

#### Jira & Tracking
- **Recent SPQAA Tickets**: https://jira.shopee.io/issues/?filter=150230
- **SPMR Sample**: https://jira.shopee.io/browse/SPMR-1448

#### Test Cases
- **Staging TC Template**: https://docs.google.com/spreadsheets/d/1YIO68EZ-mOGHx2QUwtMZTEkFR6iIAivDSzpjdTigeyw/
- **Live TC Template**: https://docs.google.com/spreadsheets/d/1xcWWD9HbYodGfdtVeDPNrHd3PePdsleTSF3l4F3i-1U/

#### Team Masters
- **Master Names Sheet**: https://docs.google.com/spreadsheets/d/19nAfyhqtf-Evdl78peuoDOvs6SIoo9j0bpgvf1lIYAM/edit?gid=398695652#gid=398695652&range=A24

#### QR RN
- **Version Selection**: https://app.shopee.io/rn-release/version-selection

---

## 📞 Communication Protocols

### Primary Channels

#### **SeaTalk** (Primary)
- **Deployment Announcements**: `#rn-deployment-announcements`
- **Regression Coordination**: `#rn-regression-coordination`
- **MKP Regression Group**: For deployment threads and RN version updates
- **MP Report Group**: For test case sharing
- **Team Channels**: `#[team]-regression-qa`

#### **Email** (Secondary)
- **All Team**: `regression-qa-all@shopee.com`
- **Leads**: `regression-qa-leads@shopee.com`
- **Release Managers**: `release-managers@shopee.com`

#### **Phone/SMS** (Emergency Only)
- Use only for production critical issues
- Contact Release Manager Shadow
- Follow escalation path

### Communication Guidelines

#### When Sending Announcements

**DO**:
- ✅ Send 2-4 hours before deployment
- ✅ Include all relevant links
- ✅ Specify exact time with timezone (Jakarta Time)
- ✅ Highlight important notes with ⚠️
- ✅ Use clear subject lines
- ✅ Tag relevant teams/PICs
- ✅ Follow up with status updates
- ✅ Send completion announcement
- ✅ Thank teams for participation

**DON'T**:
- ❌ Send announcements too late
- ❌ Miss important links
- ❌ Use ambiguous time references
- ❌ Forget to specify environment
- ❌ Skip status updates
- ❌ Forget to thank teams

#### Response Time Expectations

| Urgency | Response Time | Channel |
|---------|--------------|---------|
| **Critical** (P1 Blocker) | < 15 minutes | SeaTalk + Phone |
| **High** (P2 Issue) | < 1 hour | SeaTalk |
| **Medium** (Questions) | < 2 hours | SeaTalk |
| **Low** (General) | Same day | SeaTalk/Email |

### Escalation Path

```
Level 1: Team PIC 1
   ↓ (No response in 15 min for P1)
Level 2: Team PIC 2-4
   ↓ (No response in 30 min for P1)
Level 3: Release Manager Shadow
   ↓ (No resolution in 1 hour for P1)
Level 4: Release Manager
```

**When to Escalate**:
- P1 blocker with no response
- Critical deployment failure
- Multiple services failing
- Testing cannot proceed
- Production impact

**How to Escalate**:
1. Document the issue clearly
2. Include all relevant information
3. Tag appropriate level in SeaTalk
4. Follow up via phone if urgent
5. Keep stakeholders informed

---

## 💡 Tips & Best Practices

### General Tips

1. **Stay Organized**
   - Use the HTML generator for consistency
   - Keep all links bookmarked
   - Maintain a checklist for each phase
   - Document everything

2. **Be Proactive**
   - Send announcements early
   - Check version updates daily
   - Monitor deployment progress actively
   - Anticipate potential issues

3. **Communicate Clearly**
   - Use templates for consistency
   - Include all necessary information
   - Highlight important notes
   - Follow up regularly

4. **Coordinate Effectively**
   - Know your team members
   - Understand team capacities
   - Respect time zones
   - Be available during critical times

5. **Handle Issues Calmly**
   - Stay calm under pressure
   - Follow escalation procedures
   - Document all issues
   - Communicate status clearly

### Version Tracking Tips

1. **Check RN Version Updates**
   - Monitor MKP Group daily
   - Note when RN becomes available
   - Update announcements accordingly
   - Share with team immediately

2. **App Version Verification**
   - Check version links before sending
   - Verify latest versions available
   - Note any version delays
   - Communicate changes to team

3. **Version Consistency**
   - Use same version format across templates
   - Double-check version numbers
   - Verify with stakeholders if unsure
   - Update templates if format changes

### Testing Coordination Tips

1. **Test Case Distribution**
   - Distribute early in the day
   - Ensure fair workload distribution
   - Consider team expertise
   - Allow time for questions

2. **Progress Monitoring**
   - Check progress at regular intervals
   - Send gentle reminders if needed
   - Identify blockers early
   - Help resolve issues quickly

3. **Bug Tracking**
   - Ensure proper Jira labels used
   - Verify bug severity assigned
   - Track critical bugs closely
   - Communicate blockers immediately

### Time Management Tips

1. **Internal Targets**
   - Set realistic targets (18:00 WIB)
   - Communicate targets clearly
   - Send reminders 2 hours before
   - Be flexible if needed

2. **Live Regression Window**
   - Strict 2-hour window (15:00-17:00)
   - Start on time
   - Monitor progress closely
   - Ensure completion within window

3. **Deployment Timing**
   - Typical: Friday 16:30 Jakarta Time
   - May vary based on schedule
   - Confirm timing with Release team
   - Communicate any changes early

### Common Pitfalls to Avoid

❌ **Don't**:
1. Send announcements without verifying links
2. Forget to update version numbers
3. Skip status updates during deployment
4. Ignore outstanding services
5. Miss internal target reminders
6. Forget to thank team members
7. Leave issues undocumented
8. Skip handover documentation

✅ **Do**:
1. Double-check all information before sending
2. Keep team informed throughout process
3. Document everything
4. Follow up on all issues
5. Maintain communication protocols
6. Use templates consistently
7. Track metrics and progress
8. Prepare thorough handovers

---

## ❓ FAQ

### General Questions

**Q1: How long is the QAoD rotation?**
A: One month. Each person takes turns being RN QAoD for their assigned month.

**Q2: What if I'm unavailable during my QAoD month?**
A: Coordinate with team lead to arrange a swap or backup. Document the arrangement clearly.

**Q3: Can I modify the chat templates?**
A: Minor adjustments are okay, but maintain core structure and information. Discuss major changes with team lead.

**Q4: What if deployment is delayed?**
A: Communicate new timing to team immediately. Adjust staging and live regression schedules accordingly.

### Version-Related Questions

**Q5: Where do I find the latest RN version?**
A: Check MKP Group on SeaTalk. RN versions are announced there with timing (e.g., "Available 11:30 SG Time").

**Q6: What if app versions are not available yet?**
A: Use "latest for Regression" in announcement. Check version links and update team when available.

**Q7: How do I know which Seller App version to use?**
A: Check both Internal Build (apps/305) and ID Internal Build (apps/306). Include both in announcement.

### Deployment Questions

**Q8: What if a service deployment fails?**
A: Document the failure, coordinate with service PIC, escalate if needed. Add to outstanding services list.

**Q9: How do I track 99 services across 7 teams?**
A: Use the deployment docs spreadsheet and QUICK_PIC_LOOKUP.md to know which PIC handles each service.

**Q10: What's the priority for deployment follow-up?**
A: Focus on P1 + P2 services first. P3 and P4 can be monitored but are lower priority.

### Testing Questions

**Q11: What if testers can't meet the 18:00 WIB target?**
A: Assess situation, extend if reasonable, prioritize critical test cases, communicate with stakeholders.

**Q12: Do we test all countries in staging?**
A: Main countries: ID, BR, TW. Additional test cases: SG, PH, TH, VN, MY, CO, CL, MX.

**Q13: Why is live regression only ID country?**
A: Live regression focuses on ID for efficiency. Staging covers broader country testing.

**Q14: What if team masters are unavailable for live regression?**
A: Check master names spreadsheet for current assignments. Coordinate with team lead if changes needed.

### Issue Handling Questions

**Q15: When should I escalate an issue?**
A: Escalate when: P1 blocker with no response, critical deployment failure, testing cannot proceed, or production impact.

**Q16: What if outstanding services block testing?**
A: Communicate to team, identify workarounds, test what's possible, document blockers, escalate if critical.

**Q17: How do I handle multiple simultaneous issues?**
A: Prioritize by severity (P1 > P2), delegate to team PICs, escalate critical ones, document all issues.

### Tool Questions

**Q18: The HTML generator isn't working. What do I do?**
A: Use the template text directly from this guide. Report the issue to maintain the tool.

**Q19: Can I use my own template format?**
A: Stick to provided templates for consistency. Suggest improvements to team lead for future updates.

**Q20: Where do I find the deployment thread link?**
A: Check MKP Regression Group on SeaTalk. The link changes each cycle, so it's optional in the template.

---

## 📌 Quick Reference

### Key Timings

| Event | Day | Time | Duration |
|-------|-----|------|----------|
| **Deployment Staging** | Friday | 16:30 WIB | ~2-3 hours |
| **Staging Regression** | Monday | 10:00-18:00 WIB | Full day |
| **Live Regression** | Wednesday | 15:00-17:00 WIB | 2 hours |

### Priority Levels

| Priority | Description | Action |
|----------|-------------|--------|
| **P1** | Blocker - Critical functionality broken | Immediate escalation |
| **P2** | Critical - Major feature broken | Escalate to RM Shadow |
| **P3** | Major - Feature partially broken | Report to team PIC |
| **P4** | Minor - Small issue | Document and tsrack |

### Testing Coverage

#### Staging Regression
- **Shopee App**: iOS, Android, PC, Admin
- **Seller App**: iOS, Android (Internal + ID builds)
- **Shopee Lite**: Android
- **Promotion Admin**: PC
- **Countries**: ID, BR, TW (main) + SG, PH, TH, VN, MY, CO, CL, MX
- **Environment**: Staging

#### Live Regression
- **Apps**: Latest from App Store/Play Store
- **Country**: ID only
- **Environment**: Live
- **Duration**: 2 hours

### Bug Labels

```
regression_staging_bug_country
regression_staging_bug_ID
regression_staging_bug_BR
regression_staging_bug_TW
regression_staging_bug_SG
regression_staging_bug_VN
regression_staging_bug_PH
regression_staging_bug_MY
regression_staging_bug_TH
regression_staging_bug_CO
regression_staging_bug_CL
regression_staging_bug_MX
```

### Quick Links Checklist

- [ ] Release Portal bookmarked
- [ ] Deployment docs spreadsheet accessible
- [ ] All version check links saved
- [ ] Jira filter bookmarked
- [ ] Test case templates accessible
- [ ] Master names sheet bookmarked
- [ ] HTML generator ready
- [ ] QUICK_PIC_LOOKUP.md bookmarked

---

## 📝 Document Information

**Version**: 1.0  
**Created**: December 2025  
**Last Updated**: December 2025  
**Maintained By**: RN Regression QA Team  

### Document History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | Dec 2025 | Initial comprehensive guide created | RN QAoD Team |

### Related Documents

- `rn-regression-chat-generator.html` - Chat template generator tool
- `QUICK_PIC_LOOKUP.md` - Service to PIC mapping
- `service_pic_assignment.csv` - Complete service assignments
- `CONTACT_LIST.md` - Team contact directory
- `DEPLOYMENT_TEAM_MATRIX.md` - Deployment operations guide

---

## 🎯 Success Criteria

You're doing a great job as RN QAoD when:

✅ All announcements sent on time  
✅ All team members have clear assignments  
✅ Deployment follow-up coordinated smoothly  
✅ Testing completed within target times  
✅ Issues documented and escalated appropriately  
✅ Communication clear and consistent  
✅ Team feels supported and informed  
✅ Regression cycle completed successfully  
✅ Handover documentation prepared  
✅ Continuous improvement suggestions provided  

---

## 🙏 Acknowledgments

This guide was created based on the collective experience of the RN Regression QA team. Special thanks to all team members who contributed their knowledge and feedback.

---

**Remember**: As RN QAoD, you're the coordinator and facilitator. Your role is to ensure smooth communication, clear coordination, and successful regression testing. Don't hesitate to ask for help, escalate when needed, and always keep the team informed.

**Good luck with your RN QAoD rotation! 🚀**

---

*For questions, feedback, or suggestions about this guide, please contact the RN Regression QA team leads.*

