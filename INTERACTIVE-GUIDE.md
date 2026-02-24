# Interactive Portfolio Management

> **Smart command system for managing your QA portfolio with AI assistance**

---

## 🎯 Quick Start

### How to Use
Simply reference the portfolio folder and describe what you want:

```
@qa-portfolio-bharata/ [your request]
```

**Examples:**
- `@qa-portfolio-bharata/ show status`
- `@qa-portfolio-bharata/ add new project`
- `@qa-portfolio-bharata/ sanitize data`

---

## 📋 Main Menu Commands

### 1. 📊 Overview & Status
**Command:** `@qa-portfolio-bharata/ status`

Shows current portfolio state:
- Overall completion percentage
- Project count & breakdown
- Recent activity log
- Next recommended actions

---

### 2. ➕ Add Portfolio Item
**Command:** `@qa-portfolio-bharata/ add project`

Add new projects to portfolio:
- Professional work projects
- Learning/bootcamp projects
- Side projects or contributions
- Documentation samples

**AI will ask:**
- Project name & description
- Tech stack used
- Key achievements
- Files to include

---

### 3. ✏️ Edit Portfolio Item
**Command:** `@qa-portfolio-bharata/ edit [project-name]`

Modify existing projects:
- Update README content
- Add/remove files
- Enhance documentation
- Fix formatting issues

---

### 4. 🔍 Explore Content
**Command:** `@qa-portfolio-bharata/ explore`

Navigate portfolio structure:
- List all projects
- Show project details
- View file contents
- Search for specific content

---

### 5. 🧹 Sanitize Data
**Command:** `@qa-portfolio-bharata/ sanitize`

Clean sensitive information:
- Remove API keys & credentials
- Anonymize company names
- Replace internal URLs
- Hide business logic

**Sanitization Modes:**
- **Interactive:** Review each change before applying
- **Auto:** Apply predefined rules automatically
- **Preview:** Show what would be changed

---

### 6. 🚀 Publish & Deploy
**Command:** `@qa-portfolio-bharata/ publish`

Publish portfolio to platforms:
- **GitHub:** Create/update repository
- **Notion:** Export to Notion workspace
- **PDF:** Generate portfolio document
- **LinkedIn:** Format for profile projects

---

### 7. 💡 Get Recommendations
**Command:** `@qa-portfolio-bharata/ recommend`

AI suggests improvements:
- Missing documentation
- Enhancement opportunities
- Best practices to apply
- Next steps to take

---

### 8. ❓ Help & Documentation
**Command:** `@qa-portfolio-bharata/ help`

Access documentation:
- This interactive guide
- Quick start guide
- Project progress tracker
- Command history

---

## 🔄 Common Workflows

### Workflow 1: Adding a New Project

**Step 1:** Prepare project files
```
Gather: README.md, code samples, screenshots
```

**Step 2:** Initiate add command
```
@qa-portfolio-bharata/ add project
```

**Step 3:** Follow AI prompts
- Provide project name
- Describe key features
- Specify tech stack
- Confirm file locations

**Step 4:** Review & confirm
- AI shows preview
- You approve or request changes
- Files are added to portfolio

---

### Workflow 2: Sanitizing Sensitive Data

**Step 1:** Start sanitization
```
@qa-portfolio-bharata/ sanitize
```

**Step 2:** Choose mode
- **Interactive:** Review each change
- **Auto:** Apply all rules
- **Preview:** See changes without applying

**Step 3:** Review findings
- AI identifies sensitive data
- Shows proposed changes
- You approve/reject each

**Step 4:** Apply changes
- Approved changes are applied
- Backup created automatically
- Summary report generated

---

### Workflow 3: Publishing to GitHub

**Step 1:** Prepare for publish
```
@qa-portfolio-bharata/ pre-publish check
```

**Step 2:** Initialize Git (if needed)
```
AI will run: git init, create .gitignore
```

**Step 3:** Commit changes
```
AI stages files, creates commit with summary
```

**Step 4:** Push to GitHub
```
AI creates repo (if needed), pushes code
```

**Step 5:** Verify
```
AI provides repo URL, confirms success
```

---

### Workflow 4: Exporting to Notion

**Step 1:** Start Notion export
```
@qa-portfolio-bharata/ export notion
```

**Step 2:** Configure export
- Choose what to export
- Set formatting preferences
- Select destination workspace

**Step 3:** Generate Notion format
- AI converts markdown to Notion blocks
- Preserves formatting & structure
- Handles images & code blocks

**Step 4:** Review & import
- AI provides import instructions
- You paste into Notion
- Verify formatting

---

## 🎮 Shortcut Commands

### Quick Actions
```bash
@qa-portfolio-bharata/ status          # Show current state
@qa-portfolio-bharata/ progress        # View progress tracker
@qa-portfolio-bharata/ list            # List all projects
@qa-portfolio-bharata/ search [term]   # Search content
@qa-portfolio-bharata/ validate        # Check file integrity
@qa-portfolio-bharata/ backup          # Create backup
@qa-portfolio-bharata/ history         # Show command history
```

### Project-Specific
```bash
@qa-portfolio-bharata/ show 01         # Show project 01 details
@qa-portfolio-bharata/ edit 02         # Edit project 02
@qa-portfolio-bharata/ delete 10       # Delete project 10
@qa-portfolio-bharata/ sanitize 03     # Sanitize project 03
```

### Publishing
```bash
@qa-portfolio-bharata/ github          # Publish to GitHub
@qa-portfolio-bharata/ notion          # Export to Notion
@qa-portfolio-bharata/ pdf             # Generate PDF
@qa-portfolio-bharata/ linkedin        # Format for LinkedIn
```

---

## 🛡️ Safety Features

### 1. Validation System
**What it does:**
- Checks file existence before operations
- Validates file integrity
- Ensures required fields present
- Warns about potential issues

**When it runs:**
- Before any destructive operation
- When adding/editing projects
- During sanitization
- Before publishing

---

### 2. Backup System
**What it does:**
- Creates timestamped backups
- Stores in `.backups/` folder
- Preserves original state
- Enables rollback if needed

**When it runs:**
- Before file deletion (if enabled)
- Before bulk sanitization
- On request via `backup` command

---

### 3. Confirmation Prompts
**What it does:**
- Asks before destructive actions
- Shows preview of changes
- Requires explicit approval
- Allows cancellation

**When it appears:**
- Deleting projects
- Sanitizing data
- Publishing to external platforms
- Modifying multiple files

---

### 4. Command History
**What it does:**
- Logs all executed commands
- Tracks timestamps
- Records outcomes
- Enables audit trail

**Location:** `.docs/COMMAND-HISTORY.md`

---

## 🔧 Advanced Features

### Custom Sanitization Rules
Define your own sanitization patterns:

```javascript
// Example: Custom rule for company name
{
  "pattern": "CompanyXYZ",
  "replacement": "[Company Name]",
  "scope": "all_files"
}
```

### Batch Operations
Process multiple projects at once:

```
@qa-portfolio-bharata/ sanitize projects 01,02,03
@qa-portfolio-bharata/ validate all
@qa-portfolio-bharata/ export all to notion
```

### Template System
Use templates for new projects:

```
@qa-portfolio-bharata/ add project from template [template-name]
```

---

## 🐛 Troubleshooting

### Issue: "File not found"
**Solution:** Check file path, ensure file exists
```
@qa-portfolio-bharata/ validate
```

### Issue: "Sanitization incomplete"
**Solution:** Review pending items
```
@qa-portfolio-bharata/ sanitize status
```

### Issue: "Git push failed"
**Solution:** Check authentication
```
gh auth status
gh auth login --web
```

### Issue: "Progress not updating"
**Solution:** Manually trigger update
```
@qa-portfolio-bharata/ update progress
```

---

## 📚 System Configuration

### Portfolio Preferences
- **Language:** English (primary), Indonesian (secondary)
- **Auto-Update:** Enabled for PROJECT-PROGRESS.md
- **Validation:** Always enabled
- **Backup:** Ask before file operations
- **Sanitization:** Interactive mode (review before apply)

### File Organization
- **Root:** Public-facing documentation (4 files)
- **`.docs/`:** Internal documentation (11 files)
- **Projects:** Numbered folders 01-09
- **Assets:** Screenshots, diagrams (future)

### Safety Settings
- **Confirmation Required:** Delete, Sanitize, Publish
- **Backup Created:** Before destructive operations
- **Validation Run:** Before all operations
- **History Logged:** All commands tracked

---

## 🎓 Learning Resources

### For Portfolio Owner
- **[Quick Start Guide](./QUICK-START.md)** - Get started quickly
- **[Portfolio Stats](./PROJECT-PROGRESS.md)** - View achievements
- **[Session Notes](./.docs/SESSION-NOTES.md)** - Historical context

### For Developers
- **[Command History](./.docs/COMMAND-HISTORY.md)** - All executed commands
- **[Audit Report](./.docs/REPO-AUDIT-REPORT.md)** - Security review
- **[Setup Guide](./.docs/SETUP-COMPLETE.md)** - Initial configuration

---

## 📞 Support

**Need help?**
- Check [Troubleshooting](#troubleshooting) section above
- Review [Command Reference](#shortcut-commands)
- Ask AI: `@qa-portfolio-bharata/ help [topic]`

---

**Created:** February 18, 2026  
**Last Updated:** February 24, 2026  
**Version:** 2.0 (Streamlined & Optimized)

**Ready to manage your portfolio interactively! 🚀**
