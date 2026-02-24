# Interactive Portfolio Guide

> **Make your QA portfolio interactive with smart commands and workflows**

---

## 🎯 Overview

This guide enables **interactive portfolio management** through:
- ✅ **Hybrid menu system** (numbered + natural language)
- ✅ **Explicit context** (always ask before action)
- ✅ **Auto-progress tracking** (updates PROJECT-PROGRESS.md)
- ✅ **Validation & safety** (confirm before destructive actions)
- ✅ **Shortcut commands** (quick access to common tasks)

**Primary Language:** English (with Indonesian support when needed)

---

## 🚀 Quick Start

### Basic Usage

**Reference the portfolio folder:**
```
@qa-portfolio-bharata/
```

**AI will respond with main menu:**
```
QA Portfolio - Main Menu
Progress: ████░░░░░░ 40%

1. 📊 Overview & Status
2. ➕ Add Portfolio Item
3. ✏️ Edit Portfolio Item
4. 🔍 Explore Content
5. 🗑️ Delete Portfolio Item
6. 🚀 Publish & Deploy
7. 💡 Get Recommendations
8. ❓ Help & Documentation

What would you like to do? (Enter number or describe in natural language)
```

---

## 📋 Main Menu Options

### 1. 📊 Overview & Status

**Command:**
```
@qa-portfolio-bharata/ status
```

**What it does:**
- Shows current progress percentage
- Lists completed tasks
- Highlights pending HIGH priority tasks
- Shows recent updates
- Suggests next actions

**Example Output:**
```
Portfolio Status Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Progress: ████░░░░░░ 40%

✅ Completed:
   • Folder structure created
   • Documentation complete (6 files)
   • Project READMEs created (4 projects)

🚧 In Progress:
   • Content sanitization (HIGH priority)
   • Code preparation
   • Visual assets

⚠️ Pending HIGH Priority:
   1. Sanitize RNRegressionNotifierV2.gs
   2. Sanitize RNRegressionPICReminderV2.gs
   3. Sanitize JIRA Optimization tool
   4. Sanitize System Account docs

💡 Recommended Next Action:
   Start sanitization workflow for regression scripts

Last Updated: 2026-02-18
```

---

### 2. ➕ Add Portfolio Item

**Commands:**
```
@qa-portfolio-bharata/ add
@qa-portfolio-bharata/ add project
@qa-portfolio-bharata/ add asset
```

**Submenu:**
```
Add Portfolio Item
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What would you like to add?

1. New Project
2. Screenshot/Diagram
3. Achievement/Metric
4. Skill/Tool
5. Documentation
6. Back to Main Menu

Enter choice:
```

#### 2.1 Add New Project

**Workflow:**
```
AI: "Let's add a new project. I'll guide you step-by-step."

AI: "Step 1/7: Project name?"
User: [enters name]

AI: "Step 2/7: Project category?"
    1. Automation
    2. Documentation
    3. Tool Development
    4. Testing Framework
    5. Custom
User: [selects]

AI: "Step 3/7: Tech stack? (comma-separated)"
User: [enters tech stack]

AI: "Step 4/7: Problem statement? (2-3 sentences)"
User: [enters problem]

AI: "Step 5/7: Solution approach? (bullet points)"
User: [enters solution]

AI: "Step 6/7: Impact/Results? (quantified if possible)"
User: [enters impact]

AI: "Step 7/7: Skills demonstrated? (comma-separated)"
User: [enters skills]

AI: "Creating project structure..."
    ✅ Created folder: 05-[project-name]/
    ✅ Created README.md with your inputs
    ✅ Updated main README.md
    ✅ Updated PROJECT-PROGRESS.md
    
    "Project added successfully! 
     Location: qa-portfolio-bharata/05-[project-name]/
     
     Next steps:
     • Add code samples (if applicable)
     • Add screenshots/diagrams
     • Review and refine README"
```

#### 2.2 Add Screenshot/Diagram

**Workflow:**
```
AI: "What type of asset?"
    1. Screenshot
    2. Architecture diagram
    3. Flowchart
    4. Other

AI: "Which project is this for?"
    [Lists existing projects]

AI: "Asset filename?"
User: [enters name]

AI: "Do you have the file ready, or should I help create it?"
    1. I have the file (provide path)
    2. Help me create diagram (Mermaid)
    3. Help me create flowchart

[Continues based on choice...]
```

---

### 3. ✏️ Edit Portfolio Item

**Commands:**
```
@qa-portfolio-bharata/ edit
@qa-portfolio-bharata/ edit [project-name]
@qa-portfolio-bharata/ edit readme
```

**Submenu:**
```
Edit Portfolio Item
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What would you like to edit?

1. Project README
2. Main README
3. Progress Tracker
4. Documentation
5. Back to Main Menu

Enter choice:
```

**Workflow (with backup & validation):**
```
AI: "Which project README?"
    1. 01-regression-automation
    2. 02-jira-optimization
    3. 03-documentation-samples
    4. 04-test-templates
User: [selects]

AI: "⚠️ Before editing, would you like to create a backup?"
    (Recommended for safety)
    1. Yes, create backup
    2. No, edit directly
User: [selects]

[If backup selected]
AI: "✅ Backup created: README.md.backup-2026-02-18-17-45"

AI: "What would you like to edit?"
    1. Problem statement
    2. Solution approach
    3. Tech stack
    4. Impact/Results
    5. Full content
    6. Custom section
User: [selects]

[AI shows current content]
AI: "Current content:
     [displays current text]
     
     Enter new content (or 'cancel' to abort):"
User: [enters new content]

AI: "Preview of changes:
     
     OLD:
     [old text]
     
     NEW:
     [new text]
     
     Apply changes?"
    1. Yes, apply
    2. No, edit again
    3. Cancel
User: [confirms]

AI: "✅ Changes applied successfully!
     ✅ Updated PROJECT-PROGRESS.md
     
     File: qa-portfolio-bharata/01-regression-automation/README.md"
```

---

### 4. 🔍 Explore Content

**Commands:**
```
@qa-portfolio-bharata/ explore
@qa-portfolio-bharata/ explain [project-name]
@qa-portfolio-bharata/ preview
```

**Submenu:**
```
Explore Portfolio Content
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Explain specific project
2. Show file structure
3. Preview as recruiter
4. Check sanitization status
5. View command history
6. Back to Main Menu

Enter choice:
```

#### 4.1 Explain Specific Project

**Workflow:**
```
AI: "Which project?"
    1. Regression Automation
    2. JIRA Optimization
    3. Documentation Samples
    4. Test Templates
User: [selects]

AI: "Project: Regression Automation System
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     
     📋 Overview:
     Automated regression monitoring system with real-time 
     notifications and PIC reminders.
     
     🎯 Problem Solved:
     Manual regression tracking was time-consuming and error-prone.
     
     💡 Solution:
     • Built automated monitoring with Google Apps Script
     • Integrated dashboards with team chat webhooks
     • Created PIC reminder system with escalation logic
     
     📊 Impact:
     • 30% reduction in regression cycle time
     • 50% fewer missed bugs
     • 80% faster stakeholder notifications
     
     🛠️ Tech Stack:
     Google Apps Script, Google Sheets API, Webhook Integration
     
     📁 Files:
     • README.md (147 lines) ✅
     • demo-notifier.gs (pending)
     • demo-reminder.gs (pending)
     • architecture-diagram.png (pending)
     
     🚧 Status: In Progress (40%)
     ⚠️ Next: Sanitize source files
     
     Would you like to:
     1. Edit this project
     2. Add files to this project
     3. View detailed README
     4. Back to menu"
```

#### 4.3 Preview as Recruiter

**Workflow:**
```
AI: "Generating recruiter preview...

     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     PORTFOLIO PREVIEW (Recruiter View)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     
     Bharata Aryaseta - QA Engineer
     AI-Augmented QA with 3+ years experience
     
     Key Achievements:
     ✅ 30% regression cycle time reduction
     ✅ Built real-time monitoring dashboards
     ✅ Automated notification workflows
     ✅ Created comprehensive documentation
     
     Featured Projects: 4
     • Regression Automation (40% complete)
     • JIRA Optimization (40% complete)
     • Documentation Samples (40% complete)
     • Test Templates (40% complete)
     
     Tech Stack:
     Postman, Selenium, Appium, Cucumber, GitHub Actions,
     Google Apps Script, AI-Assisted Testing
     
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     
     📊 Completeness Score: 40/100
     
     ⚠️ Missing for Better Impact:
     • Code samples (sanitized versions)
     • Screenshots/diagrams
     • Live demo links
     • Testimonials/recommendations
     
     💡 Recommendation:
     Focus on sanitization to reach 60% completeness"
```

#### 4.4 Check Sanitization Status

**Workflow:**
```
AI: "Scanning for sensitive data...

     Sanitization Status Report
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     
     ✅ Safe (No sensitive data):
     • README.md (main)
     • All project READMEs
     • Documentation guides
     • .gitignore
     
     ⚠️ Pending Sanitization:
     1. RNRegressionNotifierV2.gs
        Location: 01-Work-Projects/RN Live Regression/
        Issues: API keys, webhook URLs, sheet IDs
        
     2. RNRegressionPICReminderV2.gs
        Location: 01-Work-Projects/RN Live Regression/
        Issues: Email domains, internal URLs
        
     3. JIRA Board Optimization tool
        Location: 01-Work-Projects/Promotion Admin Docs/
        Issues: JIRA URLs, project keys, API tokens
        
     4. SeaTalk System Account Guide
        Location: 05-Documentation/System Account Docs/
        Issues: Account names, internal systems
     
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     
     🚨 CRITICAL: Do NOT publish to GitHub until all files 
                 are sanitized!
     
     Would you like to:
     1. Start sanitization workflow
     2. View detailed findings for a file
     3. Back to menu"
```

---

### 5. 🗑️ Delete Portfolio Item

**Commands:**
```
@qa-portfolio-bharata/ delete
@qa-portfolio-bharata/ remove [item]
```

**Workflow (with validation):**
```
AI: "⚠️ WARNING: Deletion is permanent!
     
     What would you like to delete?
     1. Project (entire folder)
     2. File/Asset
     3. Backup file
     4. Cancel"
User: [selects]

[If project selected]
AI: "Which project?"
    [Lists projects]
User: [selects]

AI: "⚠️ CONFIRM DELETION
     
     You are about to delete:
     Project: 01-regression-automation/
     Files: 3 files (README.md, etc.)
     
     This action CANNOT be undone!
     
     Type 'DELETE' to confirm, or 'cancel' to abort:"
User: [types DELETE or cancel]

[If confirmed]
AI: "✅ Creating backup before deletion...
     ✅ Backup saved: deleted-backups/01-regression-automation-2026-02-18/
     ✅ Deleting project...
     ✅ Updating main README.md
     ✅ Updating PROJECT-PROGRESS.md
     
     Project deleted successfully.
     Backup location: deleted-backups/01-regression-automation-2026-02-18/"
```

---

### 6. 🚀 Publish & Deploy

**Commands:**
```
@qa-portfolio-bharata/ publish
@qa-portfolio-bharata/ deploy github
@qa-portfolio-bharata/ setup notion
```

**Submenu:**
```
Publish & Deploy
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Sanitize & Prepare for GitHub
2. Initialize Git & Push
3. Setup Notion Page
4. Generate Shareable Links
5. Back to Main Menu

Enter choice:
```

#### 6.1 Sanitize & Prepare for GitHub

**Interactive Sanitization Workflow:**
```
AI: "Starting sanitization workflow...

     Step 1: Scanning for sensitive data
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     
     Found 4 files requiring sanitization:
     
     1. RNRegressionNotifierV2.gs
        • 3 API keys found
        • 2 webhook URLs found
        • 5 sheet IDs found
        • 2 email domains found
        
     2. RNRegressionPICReminderV2.gs
        • 1 API key found
        • 3 internal URLs found
        • 4 email domains found
        
     3. JIRA Board Optimization tool
        • 2 JIRA URLs found
        • 1 API token found
        • 3 project keys found
        
     4. SeaTalk System Account Guide
        • 5 account names found
        • 3 internal system names found
     
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     
     How would you like to proceed?
     1. Review findings one-by-one (recommended)
     2. Auto-sanitize all (faster, less control)
     3. Cancel and do manually
     
     Enter choice:"
User: [selects 1]

AI: "File 1/4: RNRegressionNotifierV2.gs
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     
     Finding 1/13: API Key
     Line 23: const API_KEY = 'AIzaSyC...xyz123';
     
     Suggested replacement:
     const API_KEY = 'YOUR_API_KEY_HERE';
     
     Actions:
     1. Apply suggested replacement
     2. Use custom replacement
     3. Skip this item
     4. Skip entire file
     
     Enter choice:"
User: [selects 1]

AI: "✅ Replaced API key
     
     Finding 2/13: Webhook URL
     Line 45: const WEBHOOK = 'https://internal.shopee.com/webhook/...';
     
     Suggested replacement:
     const WEBHOOK = 'https://your-webhook-url.com/endpoint';
     
     Actions:
     1. Apply suggested replacement
     2. Use custom replacement
     3. Skip this item
     
     Enter choice:"

[Continue for all findings...]

AI: "File 1/4 complete!
     • 13 items sanitized
     • 0 items skipped
     
     Saving sanitized version...
     ✅ Saved: qa-portfolio-bharata/01-regression-automation/demo-notifier.gs
     ✅ Original preserved: 01-Work-Projects/RN Live Regression/ (unchanged)
     
     Continue to next file? (yes/no)"

[After all files]

AI: "Sanitization Complete! 🎉
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     
     Summary:
     ✅ 4 files sanitized
     ✅ 47 sensitive items replaced
     ✅ 0 items skipped
     ✅ All sanitized files saved to portfolio folders
     
     ✅ Updated PROJECT-PROGRESS.md
     
     Next steps:
     1. Review sanitized files
     2. Initialize git repository
     3. Push to GitHub
     
     Would you like to continue with git setup? (yes/no)"
```

#### 6.2 Initialize Git & Push

**Workflow (with validation):**
```
AI: "⚠️ Pre-publish Checklist
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     
     Checking readiness...
     
     ✅ Sanitization: Complete (4/4 files)
     ✅ Documentation: Complete
     ✅ .gitignore: Configured
     ⚠️ Git: Not initialized
     ⚠️ GitHub repo: Not created
     
     Ready to proceed? (yes/no)"
User: yes

AI: "Step 1/5: Initialize Git
     
     Running: git init
     ✅ Initialized empty Git repository
     
     Step 2/5: Stage files
     
     Running: git add .
     ✅ Staged 15 files
     
     Files to commit:
     • README.md
     • PROJECT-PROGRESS.md
     • QUICK-START.md
     • NOTION-SETUP-GUIDE.md
     • 00-START-HERE.md
     • .gitignore
     • 01-regression-automation/ (2 files)
     • 02-jira-optimization/ (1 file)
     • 03-documentation-samples/ (1 file)
     • 04-test-templates/ (1 file)
     • assets/ (empty)
     
     Proceed with commit? (yes/no)"
User: yes

AI: "Step 3/5: Create commit
     
     Commit message:
     '🚀 Initial commit: QA Portfolio structure and documentation
     
     - Complete folder structure
     - 4 featured projects with READMEs
     - Comprehensive documentation (6 guides)
     - Sanitized code samples
     - Interactive portfolio system'
     
     Running: git commit -m '...'
     ✅ Commit created successfully
     
     Step 4/5: Create GitHub repository
     
     Repository name: qa-portfolio-bharata
     Description: QA Engineering portfolio showcasing 3+ years of 
                  experience in test automation, process optimization, 
                  and AI-assisted testing
     Visibility: Public
     
     Create repository on GitHub? (yes/no)"
User: yes

AI: "⚠️ GitHub Authentication Required
     
     Please create the repository manually:
     1. Go to: https://github.com/new
     2. Repository name: qa-portfolio-bharata
     3. Description: [as above]
     4. Visibility: Public
     5. Do NOT initialize with README
     6. Click 'Create repository'
     
     Done? (yes/no)"
User: yes

AI: "Step 5/5: Push to GitHub
     
     Running: git remote add origin https://github.com/bedless666/qa-portfolio-bharata.git
     Running: git branch -M main
     Running: git push -u origin main
     
     ✅ Pushed to GitHub successfully!
     
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     🎉 Portfolio Published!
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     
     Repository URL:
     https://github.com/bedless666/qa-portfolio-bharata
     
     ✅ Updated PROJECT-PROGRESS.md
     
     Next steps:
     1. Configure repository settings (topics, description)
     2. Setup Notion portfolio
     3. Add portfolio link to CV/LinkedIn
     
     Would you like to continue with Notion setup? (yes/no)"
```

---

### 7. 💡 Get Recommendations

**Commands:**
```
@qa-portfolio-bharata/ recommend
@qa-portfolio-bharata/ suggest
@qa-portfolio-bharata/ help me improve
```

**Workflow:**
```
AI: "Analyzing portfolio...

     Recommendations Report
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     
     Current Status: 40% complete
     
     🔴 HIGH PRIORITY (Do Now):
     1. Add visual assets
        Why: Portfolios with diagrams get 3x more engagement
        Action: Create architecture diagrams for each project
        Estimated time: 2-3 hours
        
     2. Add code samples
        Why: Recruiters want to see actual code
        Action: Add sanitized code snippets to READMEs
        Estimated time: 1-2 hours
     
     🟡 MEDIUM PRIORITY (Do Next):
     3. Setup Notion portfolio
        Why: Better for non-technical stakeholders
        Action: Follow NOTION-SETUP-GUIDE.md
        Estimated time: 3-4 hours
        
     4. Add screenshots
        Why: Visual proof of your work
        Action: Take screenshots, blur sensitive data
        Estimated time: 1 hour
     
     🟢 LOW PRIORITY (Nice to Have):
     5. Add testimonials
        Why: Social proof increases credibility
        Action: Request recommendations on LinkedIn
        
     6. Create demo videos
        Why: Shows tools in action
        Action: Record 1-2 min demos
     
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     
     📊 Completeness Breakdown:
     • Structure: 100% ✅
     • Documentation: 100% ✅
     • Code samples: 20% 🚧
     • Visual assets: 0% ❌
     • GitHub: 0% ❌
     • Notion: 0% ❌
     
     💡 Quick Win:
     Add 1 architecture diagram to your top project.
     This alone will boost completeness to 50%!
     
     Would you like help with:
     1. Creating architecture diagrams
     2. Adding code samples
     3. Setting up Notion
     4. Something else
     5. Back to menu"
```

---

## ⚡ Shortcut Commands

### Quick Access Commands

```bash
# Status & Overview
@qa-portfolio-bharata/ status          # Quick status
@qa-portfolio-bharata/ progress        # Detailed progress
@qa-portfolio-bharata/ summary         # Executive summary

# Add Items
@qa-portfolio-bharata/ add             # Add menu
@qa-portfolio-bharata/ add project     # Add project wizard
@qa-portfolio-bharata/ add asset       # Add screenshot/diagram

# Edit Items
@qa-portfolio-bharata/ edit            # Edit menu
@qa-portfolio-bharata/ edit [project]  # Edit specific project
@qa-portfolio-bharata/ update          # Update progress

# Explore
@qa-portfolio-bharata/ explore         # Explore menu
@qa-portfolio-bharata/ explain [name]  # Explain project
@qa-portfolio-bharata/ preview         # Preview as recruiter
@qa-portfolio-bharata/ check           # Check sanitization

# Publish
@qa-portfolio-bharata/ sanitize        # Sanitization workflow
@qa-portfolio-bharata/ publish         # Publish menu
@qa-portfolio-bharata/ github          # GitHub workflow
@qa-portfolio-bharata/ notion          # Notion setup

# Help & Info
@qa-portfolio-bharata/ help            # Show all commands
@qa-portfolio-bharata/ history         # Command history
@qa-portfolio-bharata/ recommend       # Get recommendations
```

---

## 🔄 Auto-Update Features

### Progress Tracking

**AI automatically updates `PROJECT-PROGRESS.md` when:**
- ✅ New project added
- ✅ File edited
- ✅ Sanitization completed
- ✅ Git initialized/pushed
- ✅ Notion page created
- ✅ Any task marked complete

**Update format:**
```markdown
### 2026-02-18 (17:45)
- [x] Sanitized RNRegressionNotifierV2.gs
- [x] Created demo-notifier.gs in 01-regression-automation/
- [x] Updated sanitization checklist
```

### Command History

**AI logs all commands to `COMMAND-HISTORY.md`:**
```markdown
## Command History

### 2026-02-18

17:30 | @qa-portfolio-bharata/ status
      → Showed portfolio status (40% complete)

17:35 | @qa-portfolio-bharata/ sanitize
      → Started sanitization workflow
      → Sanitized RNRegressionNotifierV2.gs (13 items)
      → Created demo-notifier.gs

17:45 | @qa-portfolio-bharata/ progress
      → Updated PROJECT-PROGRESS.md
      → Marked sanitization task complete
```

---

## 🛡️ Safety Features

### Backup Before Edit

**AI asks before editing:**
```
⚠️ Before editing, would you like to create a backup?
   (Recommended for safety)
   1. Yes, create backup
   2. No, edit directly
```

**Backup naming:**
```
[filename].backup-[YYYY-MM-DD-HH-MM]

Example:
README.md.backup-2026-02-18-17-45
```

### Validation Before Destructive Actions

**AI confirms before:**
- Deleting files/projects
- Overwriting content
- Publishing to GitHub (checks sanitization first)
- Pushing commits

**Confirmation format:**
```
⚠️ CONFIRM ACTION

You are about to: [action description]
This will affect: [files/items]

Type 'CONFIRM' to proceed, or 'cancel' to abort:
```

---

## 📚 Natural Language Support

### Supported Phrases

**Status & Overview:**
- "Show me the status"
- "What's the progress?"
- "Give me a summary"
- "What should I do next?"

**Add Items:**
- "Add a new project about [topic]"
- "I want to add a screenshot"
- "Create a new project"
- "Add achievement"

**Edit Items:**
- "Edit the regression automation README"
- "Update the main README"
- "Change project description"
- "Fix typo in [file]"

**Explore:**
- "Explain the regression automation project"
- "Show me the file structure"
- "Preview as recruiter"
- "Check if sanitization is done"

**Publish:**
- "I want to publish to GitHub"
- "Setup Notion portfolio"
- "Sanitize all files"
- "Deploy to production"

**Help:**
- "What can I do?"
- "Show me all commands"
- "Help me improve the portfolio"
- "Give me recommendations"

---

## 🎓 Usage Examples

### Example 1: Quick Status Check

```
User: @qa-portfolio-bharata/ status

AI: [Shows status report with progress, pending tasks, recommendations]

User: "What should I do next?"

AI: "Based on HIGH priority tasks, I recommend starting with 
     sanitization. Would you like to begin the sanitization 
     workflow? (yes/no)"
```

### Example 2: Adding New Project

```
User: @qa-portfolio-bharata/ add project

AI: [Starts project wizard, asks 7 questions]

AI: "Project added successfully! 
     Location: qa-portfolio-bharata/05-api-testing-framework/
     
     Next steps:
     • Add code samples
     • Add screenshots
     • Review README"
```

### Example 3: Sanitization Workflow

```
User: @qa-portfolio-bharata/ sanitize

AI: [Scans for sensitive data, shows findings]

AI: "Found 4 files requiring sanitization.
     Review findings one-by-one? (yes/no)"

User: yes

AI: [Interactive review of each finding with suggested replacements]

AI: "Sanitization complete! 47 items replaced.
     Ready to publish to GitHub? (yes/no)"
```

### Example 4: Natural Language

```
User: "I want to add a diagram for the regression automation project"

AI: "Great! Let me help you add a diagram.
     
     What type of diagram?
     1. Architecture diagram (system overview)
     2. Flowchart (process flow)
     3. Sequence diagram (interactions)
     4. Other
     
     Enter choice:"
```

---

## 🔧 Advanced Features

### Command Chaining

**Execute multiple commands in sequence:**
```
@qa-portfolio-bharata/ sanitize && github && notion

This will:
1. Run sanitization workflow
2. Initialize git and push to GitHub
3. Setup Notion portfolio
```

### Conditional Commands

**Execute based on conditions:**
```
@qa-portfolio-bharata/ if sanitized then github

This will:
• Check if sanitization is complete
• If yes: proceed with GitHub workflow
• If no: show warning and start sanitization
```

---

## 📊 Progress Indicators

**AI shows progress for long operations:**

```
Sanitizing files...
[████████░░░░░░░░░░░░] 40% (2/5 files)

Current: RNRegressionPICReminderV2.gs
Status: Reviewing finding 5/12
```

---

## ❓ Help & Support

### Get Help

```
@qa-portfolio-bharata/ help

Shows:
• All available commands
• Usage examples
• Common workflows
• Troubleshooting tips
```

### View Documentation

```
@qa-portfolio-bharata/ docs

Shows:
• Link to all documentation files
• Quick reference guides
• Tutorial links
```

---

## 🎯 Best Practices

### 1. Always Check Status First
```
@qa-portfolio-bharata/ status
```

### 2. Follow Priority Order
- HIGH → MEDIUM → LOW
- Don't skip HIGH priority tasks

### 3. Use Backup Feature
- Always backup before major edits
- Backups are cheap, data loss is expensive

### 4. Review Before Publishing
- Check sanitization status
- Preview as recruiter
- Validate all links

### 5. Update Progress Regularly
- AI auto-updates, but you can manually update too
- Keep progress tracker current

---

## 🚨 Troubleshooting

### Common Issues

**Issue: "Command not recognized"**
```
Solution: Type @qa-portfolio-bharata/ help to see all commands
```

**Issue: "File not found"**
```
Solution: Check file path, use @qa-portfolio-bharata/ explore 
          to view structure
```

**Issue: "Sanitization incomplete"**
```
Solution: Run @qa-portfolio-bharata/ check to see pending items
```

**Issue: "Git push failed"**
```
Solution: Check GitHub authentication, ensure repo exists
```

---

## 📝 Notes

### Language Preference
- **Primary:** English (for commands, technical content)
- **Secondary:** Indonesian (for casual conversation, explanations)
- AI adapts based on user input

### Auto-Save
- All changes are saved immediately
- Progress tracker updated in real-time
- Command history logged automatically

### Undo Support
- Backup files created before destructive operations
- Command history available for reference
- Git history (after initialization) for version control

---

## 🎉 Quick Start Checklist

- [ ] Read this guide
- [ ] Try `@qa-portfolio-bharata/ status`
- [ ] Explore with `@qa-portfolio-bharata/ explore`
- [ ] Start sanitization with `@qa-portfolio-bharata/ sanitize`
- [ ] Publish with `@qa-portfolio-bharata/ github`
- [ ] Setup Notion with `@qa-portfolio-bharata/ notion`

---

**Created:** February 18, 2026  
**Version:** 1.0  
**Status:** Active

**Ready to make your portfolio interactive! 🚀**
