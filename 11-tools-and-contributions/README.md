# 🛠️ Tools & Contributions

> **Author:** Bharata Aryaseta  
> **Role:** QA Engineer - Marketplace Platform (Regression Team)  
> **Period:** 2022 - Present  
> **Company:** Marketplace Indonesia

---

## 📋 Overview

This project showcases a collection of **automation tools and processes** I created during my tenure at Marketplace to improve QA efficiency, reduce manual work, and enhance team collaboration. All tools were developed using a combination of **AI assistance (Cursor AI, ChatGPT)** and **traditional scripting** (Python, JavaScript, Node.js, Google Apps Script).

**Key Achievement:** Reduced manual QA tasks by approximately **60-70%** through strategic automation and process optimization.

---

## 🎯 Tools Collection

### 1. [Bug Creation Tool](./01-bug-creation-tool/)
**AI-Driven Bug Analysis & Report Generation**

- **Technology:** Python + Cursor AI
- **Purpose:** Automate bug analysis and generate comprehensive bug reports
- **Impact:** Reduced bug report creation time from 15-20 minutes to 2-3 minutes
- **Key Features:**
  - Automated log analysis
  - AI-powered root cause identification
  - Standardized bug report templates
  - Batch processing support

[📖 View Documentation](./01-bug-creation-tool/README.md)

---

### 2. [JIRA Weekly Summary](./02-jira-weekly-summary/)
**Automated Weekly Team Report to Team Chat**

- **Technology:** Python + JIRA API + Team Chat Webhook
- **Purpose:** Automatically generate and send weekly team progress reports
- **Impact:** Saved 2-3 hours per week of manual report compilation
- **Key Features:**
  - Multi-team support (All Teams or Single Team mode)
  - Automated JIRA data extraction
  - Formatted Team Chat messages
  - Cronjob scheduling

[📖 View Documentation](./02-jira-weekly-summary/README.md)

---

### 3. [Test Case Migration](./03-test-case-migration/)
**Standardized Test Case Format Migration Process**

- **Technology:** Manual Process + Documentation
- **Purpose:** Migrate legacy test cases to new standardized format
- **Impact:** Improved test case consistency and maintainability across team
- **Key Features:**
  - Step-by-step migration guide
  - Before/after examples
  - Quality checklist
  - Best practices documentation

[📖 View Documentation](./03-test-case-migration/MIGRATION_GUIDE.txt)

---

### 4. [Monthly Regression Schedule](./04-monthly-regression-schedule/)
**Automated Monthly Regression Notifications**

- **Technology:** Node.js + Google Sheets API + Team Chat Webhook
- **Purpose:** Automatically notify team of monthly regression schedules
- **Impact:** Eliminated missed regression cycles and improved planning
- **Key Features:**
  - Google Sheets integration for schedule management
  - Automated Team Chat notifications
  - Cronjob scheduling
  - Configurable notification timing

[📖 View Documentation](./04-monthly-regression-schedule/README.md)

---

### 5. [Shop Activation Automation](./05-shop-activation-automation/)
**Automated Shop Activation via Shark API**

- **Technology:** Python + Shark API + JIRA API + Team Chat Webhook
- **Purpose:** Automate shop activation process and JIRA ticket creation
- **Impact:** Reduced manual shop activation time by 80%
- **Key Features:**
  - CSV-based batch processing
  - Automatic JIRA ticket creation
  - Team Chat notifications for status updates
  - Error handling and retry logic
  - Cronjob scheduling

[📖 View Documentation](./05-shop-activation-automation/README.md)

---

### 6. [RN Regression (QA on Duty)](./06-rn-regression-qaod/)
**React Native Regression Testing Workflow & Documentation**

- **Technology:** Documentation + Process + HTML Tools
- **Purpose:** Comprehensive guide and tools for RN QA on Duty role
- **Impact:** Standardized RN regression process across team
- **Key Features:**
  - Complete QAoD workflow documentation
  - JIRA ticket chat generator (HTML tool)
  - RN regression complete guide
  - Presentation materials

[📖 View Documentation](./06-rn-regression-qaod/README.md)

---

### 7. [JIRA Kanban Daily Task](./07-jira-kanban-daily-task/)
**Daily Task Management System**

- **Technology:** JIRA Kanban Board + Process Methodology
- **Purpose:** Manage daily QA tasks, bug verification, and regression cycles
- **Impact:** Improved team visibility and task distribution
- **Key Features:**
  - Structured Kanban workflow
  - Task prioritization system
  - WIP limit enforcement
  - Integration with other automation tools

[📖 View Documentation](./07-jira-kanban-daily-task/README.md)

---

## 📊 Overall Impact & Metrics

### Time Savings
- **Bug Report Creation:** 15-20 min → 2-3 min (85% reduction)
- **Weekly Reporting:** 2-3 hours → 0 min (100% automation)
- **Shop Activation:** 30 min → 5 min per shop (83% reduction)
- **Regression Scheduling:** 1 hour/month → 0 min (100% automation)

### Quality Improvements
- **Standardized bug reports** with consistent quality
- **Zero missed regression cycles** due to automated reminders
- **Improved test case consistency** through migration process
- **Better team coordination** via automated notifications

### Team Benefits
- Reduced manual, repetitive work
- More time for exploratory testing
- Improved documentation and knowledge sharing
- Enhanced cross-team communication

---

## 🎓 Technical Skills Demonstrated

### Programming & Scripting
- Python (API integration, data processing, automation)
- JavaScript/Node.js (backend automation, scheduling)
- Google Apps Script (spreadsheet automation)
- Shell scripting (cronjob management)

### AI-Assisted Development
- Cursor AI for rapid prototyping
- ChatGPT for code generation and debugging
- Prompt engineering for optimal AI output
- AI-driven documentation generation

### API Integration
- JIRA REST API
- Team Chat Webhook API
- Google Sheets API
- Shark API (internal Marketplace tool)

### DevOps & Automation
- Cronjob scheduling and management
- Error handling and logging
- Configuration management
- Environment separation (test/production)

### Process Design
- Workflow optimization
- Documentation standards
- Tool integration strategy
- Team adoption planning

---

## 🚀 Development Approach

All tools were developed using a **hybrid approach**:

1. **AI-Assisted Rapid Prototyping**
   - Used Cursor AI and ChatGPT for initial code generation
   - Iterative prompting to refine functionality
   - AI-generated documentation and comments

2. **Manual Refinement**
   - Code review and optimization
   - Error handling implementation
   - Security and credential management
   - Production deployment configuration

3. **Continuous Improvement**
   - Gathered team feedback
   - Iterated on features and UX
   - Added error handling for edge cases
   - Improved logging and monitoring

---

## 📂 Repository Structure

```
11-tools-and-contributions/
├── README.md (this file)
├── 01-bug-creation-tool/
│   ├── README.md
│   ├── templates/
│   └── result/
├── 02-jira-weekly-summary/
│   ├── README.md
│   ├── jira_weekly.py
│   ├── config.yaml
│   └── logs/
├── 03-test-case-migration/
│   ├── MIGRATION_GUIDE.txt
│   ├── New Test Case/
│   └── Old test case/
├── 04-monthly-regression-schedule/
│   ├── README.md
│   ├── scheduler.js
│   ├── config.js
│   └── google-apps-script/
├── 05-shop-activation-automation/
│   ├── README.md
│   ├── activate_shops.py
│   ├── config.py
│   └── requirements.txt
├── 06-rn-regression-qaod/
│   ├── README.md
│   ├── RN_QAOD_COMPLETE_GUIDE.md
│   ├── JIRA_TICKET_RN_CHAT_GENERATOR.txt
│   └── rn-regression-chat-generator.html
└── 07-jira-kanban-daily-task/
    └── README.md (process documentation)
```

---

## 🔐 Security & Credentials

**Important Notes:**
- All tools use **environment variables** or **config files** for credentials
- No hardcoded API tokens or passwords in source code
- `.gitignore` configured to exclude sensitive files
- Example config files provided (`.example` suffix)

**Setup Required:**
- JIRA API tokens
- Team Chat webhook URLs
- Google Sheets API credentials
- Shark API access (internal Marketplace tool)

---

## 🎯 Lessons Learned

### What Worked Well
✅ **AI-Assisted Development** - Dramatically faster prototyping and iteration  
✅ **Incremental Rollout** - Started with single team, expanded gradually  
✅ **Documentation-First** - Clear docs improved adoption  
✅ **Team Feedback Loop** - Regular feedback led to better tools  

### Challenges Overcome
⚠️ **API Rate Limits** - Implemented retry logic and batching  
⚠️ **Credential Management** - Developed secure config system  
⚠️ **Team Adoption** - Created comprehensive guides and demos  
⚠️ **Maintenance** - Designed for minimal ongoing maintenance  

---

## 🌟 Recognition

These tools have been:
- Adopted by multiple QA teams at Marketplace
- Shared across regional teams (SG, VN, TH, MY)
- Featured in internal QA knowledge sharing sessions
- Contributed to team efficiency KPIs

---

## 📞 Contact & Questions

For questions about these tools or collaboration opportunities:

**Bharata Aryaseta**  
📧 bharata.aryaseta@gmail.com  
💼 [LinkedIn](https://www.linkedin.com/in/bharata-aryaseta/)  
🐙 [GitHub](https://github.com/bharatadev)

---

## 📄 License

These tools were created during employment at Marketplace and are documented here for **portfolio purposes only**. Source code is not publicly available due to proprietary nature.

---

**Last Updated:** February 2026  
**Status:** Active (tools still in use by team)
