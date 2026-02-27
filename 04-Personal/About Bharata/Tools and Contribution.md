# 🛠️ Tools & Contributions at Shopee

> **Author:** Bharata Aryaseta  
> **Role:** QA Engineer - Marketplace Platform (Regression Team)  
> **Period:** 2022 - Present  
> **Tech Stack:** Python, JavaScript, Node.js, Google Apps Script, Cursor AI

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Automation Tools](#automation-tools)
3. [Daily Task Management](#daily-task-management)
4. [Impact & Metrics](#impact--metrics)
5. [Technical Skills Demonstrated](#technical-skills-demonstrated)

---

## 🎯 Overview

During my tenure at Shopee, I developed **6 automation tools** and implemented **1 team workflow system** that significantly improved QA efficiency, reduced manual work, and enhanced team collaboration. All tools were built using a combination of **AI-assisted development** (Cursor AI, ChatGPT) and **custom scripting** (Python, JavaScript, Google Apps Script).

**Key Achievement:**
- Reduced manual bug reporting time from **~30 minutes to ~3 minutes** per bug
- Automated weekly JIRA summaries for **4 teams** (Buyer, Seller, Promotion, Order Ops)
- Streamlined test case migration for **100+ regression test cases**
- Automated shop activation for **50+ shops** monthly via cronjob

---

## 🤖 Automation Tools

### 1. Bug Analyzer (bug_creation)

**Purpose:** Automated bug analysis and standardized report generation using Cursor AI

**Problem Solved:**
- Manual bug reporting was time-consuming (~30 minutes per bug)
- Inconsistent bug report formats across team
- Difficulty analyzing logs and identifying root causes
- Repetitive copy-paste work for JIRA tickets and dev notifications

**Solution:**
- AI-driven bug analysis using TraceID log analysis
- Auto-detect error types (Hardy routing, SIP config, DB errors, address validation, etc.)
- Generate 3 standardized outputs: JIRA ticket, chat message, technical analysis
- One-command workflow: `run @run_analyze.txt` in Cursor

**Tech Stack:**
- **Cursor AI** with custom MCP tools (`@QAFoundBugs`)
- **Template System** (JIRA, chat, analysis templates)
- **TraceID Log Analysis** (automatic error type detection)

**Workflow:**
```
Input (bug-data.txt) → AI Analysis (TraceID logs) → Auto-detect error type 
→ Generate 3 files (JIRA ticket, chat message, technical summary)
```

**Key Features:**
- ✅ 3-minute bug reporting (from 30 minutes)
- ✅ Automatic error categorization (6 types)
- ✅ Standardized format across team
- ✅ Root cause analysis with recommended teams to tag
- ✅ Ready-to-paste JIRA tickets and chat messages

**Impact:**
- **90% time reduction** in bug reporting
- **100% format consistency** across team
- **Faster developer response** due to clear, structured reports

---

### 2. JIRA Weekly Summary (jira-weekly-python)

**Purpose:** Automated weekly JIRA summary distribution to SeaTalk for 4 QA teams

**Problem Solved:**
- Manual compilation of weekly JIRA summaries was tedious
- Inconsistent summary formats
- Time-consuming to track tasks across 4 teams
- Manual SeaTalk posting every week

**Solution:**
- Python script with JIRA REST API integration
- Dual mode: All Teams (2 messages) or Single Team (1 message)
- Smart message splitting (respects 1000-char limit, maintains code block integrity)
- Cronjob automation (runs every Thursday at 2 PM)

**Tech Stack:**
- **Python 3** with `requests`, `PyYAML`
- **JIRA REST API** (filter-based queries)
- **SeaTalk Webhook API**
- **Cronjob** for scheduling

**Workflow:**
```
JIRA API (fetch tasks by filter) → Parse & group by team → Build message 
→ Smart split (max 850 chars/element) → Send to SeaTalk webhook
```

**Key Features:**
- ✅ Supports 4 teams: Buyer, Seller Fulfillment, Promotion, Order Ops
- ✅ Auto-mention team members
- ✅ Button links to JIRA filters
- ✅ Smart content splitting (no orphaned headers)
- ✅ Comprehensive logging
- ✅ Test & production modes

**Impact:**
- **100% automation** of weekly summaries
- **4 teams** covered with consistent format
- **Zero manual effort** after setup

---

### 3. Test Case Migration Tool (Migrate TC Task)

**Purpose:** Migrate regression test cases from old format to new standardized format

**Problem Solved:**
- 100+ regression test cases in inconsistent old format
- Manual migration was error-prone and time-consuming
- Complex rules for case name splitting, pre-condition management, component mapping
- No clear migration guide for team members

**Solution:**
- Comprehensive migration guide (378 lines)
- Step-by-step process with examples
- Rules for case name specificity, component separation, pre-condition management
- Cursor AI-assisted migration workflow

**Tech Stack:**
- **Cursor AI** for batch processing
- **CSV parsing** and transformation
- **Detailed documentation** (MIGRATION_GUIDE.txt)

**Workflow:**
```
Old CSV → Identify test case → Get region from PIC mapping → Analyze flow 
→ Split by page/component → Build progressive pre-conditions → Generate new CSV
```

**Key Features:**
- ✅ Detailed 9-step migration process
- ✅ 7 rules & guidelines (case name specificity, component separation, etc.)
- ✅ Progressive pre-condition system
- ✅ Automatic multi-step splitting
- ✅ Platform detection (iOS/Android/PC)
- ✅ Component validation (30+ valid components)

**Impact:**
- **Standardized format** for 100+ test cases
- **Clear migration guide** for team members
- **Reduced migration errors** through validation rules

---

### 4. Monthly Regression Schedule (monthly-regression-schedule)

**Purpose:** Automated monthly regression schedule distribution to SeaTalk

**Problem Solved:**
- Manual monthly schedule announcements
- Difficulty tracking who is assigned for each week/version
- No automated reminders for upcoming regression tasks
- Inconsistent schedule format

**Solution:**
- Node.js script with Google Sheets API integration
- Fetch schedule data from shared spreadsheet
- Validate data (Week, Month, Version, Subteam, Status)
- Group by Month → Version
- Auto-mention assigned QA members
- Cronjob automation (runs 1st day of month at 9 AM)

**Tech Stack:**
- **Node.js** with `googleapis`, `node-cron`
- **Google Sheets API** (Service Account authentication)
- **SeaTalk Webhook API**
- **Cronjob** for scheduling

**Workflow:**
```
Google Sheets API (fetch schedule) → Validate rows → Group by Month/Version 
→ Build message with mentions → Send to SeaTalk webhook
```

**Key Features:**
- ✅ Automatic data fetching from Google Sheets
- ✅ Data validation (required fields, status filtering)
- ✅ Smart grouping (Month → Version)
- ✅ Auto-mention QA members
- ✅ Clean summary format
- ✅ Comprehensive logging

**Impact:**
- **100% automation** of monthly schedule announcements
- **Zero manual effort** for schedule distribution
- **Clear visibility** of upcoming regression tasks

---

### 5. Shop Activation Automation (shop-activation-python)

**Purpose:** Automated shop activation for regression testing via Shark API

**Problem Solved:**
- Manual shop activation for 50+ shops was tedious
- Repetitive API calls for each shop
- No tracking of activation success/failure
- Manual JIRA ticket creation for activation results
- Manual SeaTalk notifications

**Solution:**
- Python script with Shark API integration
- CSV-based shop list (test & production)
- Batch activation with progress tracking
- Auto-create JIRA ticket with results
- Auto-send SeaTalk notification
- Cronjob support for weekly automation

**Tech Stack:**
- **Python 3** with `requests`
- **Shark API** (shop activation endpoint)
- **JIRA REST API** (ticket creation)
- **SeaTalk Webhook API**
- **Cronjob** for scheduling

**Workflow:**
```
Parse CSV (shop IDs + regions) → Batch activate via Shark API 
→ Track success/failure → Create JIRA ticket → Send SeaTalk notification
```

**Key Features:**
- ✅ Test & production modes
- ✅ CSV-based shop management
- ✅ Success rate tracking
- ✅ Auto-create JIRA tickets
- ✅ SeaTalk notifications (test & production webhooks)
- ✅ Comprehensive logging
- ✅ Cronjob-friendly (skip confirmation flag)

**Impact:**
- **Automated activation** for 50+ shops monthly
- **100% success rate tracking**
- **Zero manual API calls**
- **Automatic documentation** via JIRA tickets

---

### 6. QAoD Regression Chat Generator (RN & Native)

**Purpose:** Desktop app for generating standardized regression coordination messages with auto-create Jira + SeaTalk

**Problem Solved:**
- Manual creation of regression coordination messages
- Inconsistent message formats across Native App, RN, and Seller App regression
- Manual JIRA ticket creation
- Manual SeaTalk posting
- CORS issues when calling internal APIs from browser

**Solution:**
- Electron desktop application with built-in HTTP server
- Template system for Native App, RN, and Seller App regression
- Auto-create JIRA tickets via Smart Workflow Orchestrator API
- Auto-post SeaTalk messages with thread
- Built-in proxy server to bypass CORS
- Multi-PIC assignment and region selection

**Tech Stack:**
- **Electron** (v28.0.0) for desktop app
- **Node.js** HTTP server (port 3847)
- **Smart Workflow Orchestrator API** (smart.shopee.io)
- **SeaTalk API** (message + thread creation)
- **JIRA Workflow API** (ticket creation)

**Workflow:**
```
Select template → Fill form (platform, region, version, PICs) 
→ Generate preview → Send to API → Create Jira ticket + SeaTalk message
```

**Key Features:**
- ✅ 3 templates: Native App, RN, Seller App regression
- ✅ Multi-region selection (ID, BR, TW, TH, MY, PH, VN, etc.)
- ✅ Multi-PIC assignment (16 QA team members)
- ✅ Auto-create JIRA tickets (SPMR/SPQAA)
- ✅ Auto-post SeaTalk with thread
- ✅ Built-in CORS bypass proxy
- ✅ Cross-platform (macOS, Windows, Linux builds)

**Impact:**
- **5-minute regression coordination** (from 15 minutes)
- **100% format consistency**
- **Automatic JIRA + SeaTalk integration**
- **No CORS issues** for internal API calls

---

## 📊 Daily Task Management

### JIRA Kanban for Regression QA Team

**Purpose:** Streamlined task management system for Regression QA Team

**Problem Solved:**
- Unclear task distribution across team
- Difficulty tracking daily workload
- No centralized task visibility
- Manual task assignment by team leads

**Solution:**
- Implemented JIRA Kanban board with clear guidelines
- Standardized task creation and naming conventions
- Daily task visibility for each team member
- Transparent workload distribution

**Key Guidelines:**

#### 1. Task Creation
- Clear task titles with context
- Proper component labeling
- Accurate time estimates
- Linked to parent epic/story

#### 2. Task Naming Guidelines
- **Format:** `[Component] - [Action] - [Context]`
- **Examples:**
  - `[Checkout] - Regression Test - v2.145.0`
  - `[Voucher] - Bug Investigation - SPMR-12345`
  - `[Cart] - Adhoc Test - New Feature X`

#### 3. Task Monitoring
- Update status daily (To Do → In Progress → Done)
- Add comments for blockers or dependencies
- Tag relevant team members
- Link related tickets

**Benefits:**

✅ **Simplified Task Assignment**
- Easier for team leads (PIC) to assign and monitor tasks
- Clear visibility of who is handling what

✅ **Daily Task Visibility**
- Each team member can view their assigned tasks
- Helps prioritize work effectively

✅ **Efficient Task Management**
- Centralized task tracking
- Reduces confusion and prevents overlap

✅ **Transparent Workload Distribution**
- Easy to identify overloaded or available team members
- Better resource allocation

✅ **Improved Communication**
- Single source of truth for daily tasks
- Fosters better collaboration and transparency

**Impact:**
- **100% task visibility** across team
- **Clear workload distribution**
- **Reduced task overlap** and confusion
- **Better team collaboration**

---

## 📈 Impact & Metrics

### Time Savings

| Tool | Manual Time | Automated Time | Time Saved | Frequency |
|------|-------------|----------------|------------|-----------|
| Bug Analyzer | 30 min/bug | 3 min/bug | **90%** | ~20 bugs/month |
| JIRA Weekly Summary | 45 min/week | 0 min | **100%** | 4 weeks/month |
| Shop Activation | 60 min/month | 0 min | **100%** | 1x/month |
| Monthly Schedule | 30 min/month | 0 min | **100%** | 1x/month |
| Regression Chat | 15 min/task | 5 min/task | **67%** | ~10 tasks/month |

**Total Monthly Time Saved:** ~30 hours

### Quality Improvements

- ✅ **100% format consistency** across all bug reports
- ✅ **Zero manual errors** in weekly summaries
- ✅ **Standardized test case format** for 100+ test cases
- ✅ **Automated tracking** for all regression tasks

### Team Impact

- 🎯 **4 teams** benefit from automated JIRA summaries
- 🎯 **16 QA members** use regression chat generator
- 🎯 **Regression team** (8 members) uses JIRA Kanban system
- 🎯 **50+ shops** activated automatically each month

---

## 💡 Technical Skills Demonstrated

### 1. AI-Assisted Development
- **Cursor AI** for workflow automation and code generation
- **ChatGPT** for prompt engineering and template creation
- **MCP Tools** integration (`@QAFoundBugs` for log analysis)
- **Prompt Engineering** for consistent output quality

### 2. API Integration
- **JIRA REST API** (ticket creation, filter queries, authentication)
- **SeaTalk Webhook API** (message posting, thread creation)
- **Google Sheets API** (Service Account authentication, data fetching)
- **Shark API** (shop activation, cookie-based auth)
- **Smart Workflow Orchestrator API** (JIRA + SeaTalk automation)

### 3. Scripting & Automation
- **Python 3** (requests, PyYAML, logging, error handling)
- **Node.js** (Express, googleapis, node-cron)
- **JavaScript** (Electron, async/await, API proxy)
- **Bash** (cronjob wrappers, shell scripts)
- **Google Apps Script** (spreadsheet automation)

### 4. Data Processing
- **CSV parsing** and transformation
- **JSON manipulation** (JIRA payloads, API responses)
- **YAML configuration** management
- **Log analysis** (TraceID-based debugging)
- **Data validation** (required fields, status filtering)

### 5. Desktop Application Development
- **Electron** (cross-platform desktop apps)
- **HTTP Server** (built-in proxy for CORS bypass)
- **IPC Communication** (main process ↔ renderer process)
- **Security** (preload scripts, context isolation)

### 6. Workflow Design
- **Template Systems** (reusable, customizable templates)
- **Progressive Pre-conditions** (test case migration)
- **Smart Message Splitting** (character limit handling)
- **Error Detection** (automatic categorization)
- **Batch Processing** (shop activation, test case migration)

### 7. DevOps & Scheduling
- **Cronjob** setup and management
- **Logging** (file-based, timestamped)
- **Error Handling** (graceful degradation)
- **Configuration Management** (YAML, JS config files)
- **Environment Separation** (test, staging, production)

---

## 🎓 Learning & Growth

### Key Learnings

1. **AI-Assisted Development**
   - Learned to leverage AI tools (Cursor, ChatGPT) for rapid prototyping
   - Developed prompt engineering skills for consistent output
   - Understood when to use AI vs manual coding

2. **API Integration**
   - Mastered REST API authentication (PAT tokens, cookies, webhooks)
   - Learned to handle CORS issues with proxy servers
   - Understood API rate limiting and error handling

3. **Automation Thinking**
   - Identified repetitive tasks suitable for automation
   - Designed workflows that balance automation and flexibility
   - Built tools that are maintainable and extensible

4. **Team Collaboration**
   - Created tools that benefit entire team (not just individual)
   - Documented workflows clearly for team adoption
   - Gathered feedback and iterated on tool design

### Challenges Overcome

1. **CORS Issues** → Built-in proxy server in Electron app
2. **Cookie Expiration** → Clear documentation for cookie updates
3. **Message Length Limits** → Smart splitting algorithm
4. **Test Case Complexity** → Comprehensive migration guide with 7 rules
5. **Cronjob Reliability** → Robust error handling and logging

---

## 🔮 Future Enhancements

### Planned Improvements

1. **Bug Analyzer**
   - Add support for more error types
   - Integrate with JIRA API for direct ticket creation
   - Add screenshot attachment support

2. **JIRA Weekly Summary**
   - Add charts/graphs for task distribution
   - Support custom date ranges
   - Add trend analysis (week-over-week comparison)

3. **Shop Activation**
   - Add retry mechanism for failed activations
   - Support bulk CSV upload via UI
   - Add activation history tracking

4. **Regression Chat Generator**
   - Add template customization UI
   - Support more regression types
   - Add history/favorites for quick access

---

## 📚 Documentation Quality

All tools include:
- ✅ **Bilingual README** (English + Bahasa Indonesia)
- ✅ **Quick Start guides** (3-5 steps)
- ✅ **Troubleshooting sections** (common issues + solutions)
- ✅ **Configuration examples** (copy-paste ready)
- ✅ **Workflow diagrams** (visual flow explanations)
- ✅ **Version history** (CHANGELOG.md)

---

## 🏆 Recognition & Adoption

### Team Adoption

- **Bug Analyzer:** Used by entire Regression QA team (8 members)
- **JIRA Weekly Summary:** Automated for 4 teams (Buyer, Seller, Promotion, Order Ops)
- **Regression Chat Generator:** Primary tool for QAoD coordination (16 team members)
- **Shop Activation:** Standard process for monthly shop setup
- **JIRA Kanban:** Official workflow for Regression team

### Knowledge Sharing

- Created comprehensive documentation for all tools
- Conducted informal training sessions for team members
- Maintained tools and provided support for adoption
- Shared tools across QA teams (beyond Regression)

---

## 🎯 Summary

These tools demonstrate my ability to:

1. ✅ **Identify automation opportunities** in daily QA work
2. ✅ **Design practical solutions** that balance automation and flexibility
3. ✅ **Leverage AI tools** effectively for rapid development
4. ✅ **Integrate multiple APIs** (JIRA, SeaTalk, Google Sheets, Shark)
5. ✅ **Write production-ready code** with error handling and logging
6. ✅ **Create maintainable tools** with clear documentation
7. ✅ **Drive team adoption** through user-friendly design
8. ✅ **Deliver measurable impact** (90% time reduction, 100% automation)

**Total Tools Created:** 6 automation tools + 1 workflow system  
**Total Time Saved:** ~30 hours/month for team  
**Team Members Impacted:** 16+ QA engineers  
**Lines of Code:** ~5,000+ (Python, JavaScript, Node.js)  
**Documentation:** ~3,000+ lines (README, guides, changelogs)

---

**Last Updated:** February 18, 2026  
**Maintained by:** Bharata Aryaseta  
**Contact:** bharata.aryaseta@shopee.com
