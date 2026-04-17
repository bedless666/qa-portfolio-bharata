# Changelog

All notable changes to QAoD Regression Chat Generator will be documented in this file.

---

## [v4.1] - 2026-02-24

### Changed
- **Deployment Configuration**: Switched from Test to Production environment
  - Updated `endpoint_deployment_hash_id` from `ihkyjk9403s7vmgbtdxzxaee` (Test) to `g8c144fr5wr6jrvzcqty0gts` (Production)
  - Updated `endpoint_deployment_key` from `5g********01d` (Test) to `wxqjm1ghy5rynyb86ka51zre` (Production)
  - Configuration location: `API_CONFIG` object in `Index-with-api.html`

### Fixed
- **SMART Workflow Platform**: Resolved issue where production deployment was sending generic template messages instead of proper staging regression content
  - Issue: `InputDescription` was showing "How to test:..." template even for staging workflows
  - Root cause: SMART Workflow platform configuration issue (not client-side)
  - Resolution: Fixed directly in SMART Workflow platform configuration

### Documentation
- **WORKFLOW_DOCUMENTATION.txt**: Added comprehensive "DEPLOYMENT ENVIRONMENTS" section
  - Documented Test environment credentials (hash ID + deployment key)
  - Documented Production environment credentials (hash ID + deployment key)
  - Added instructions for switching between environments
  - Included code examples for API_CONFIG configuration

---

## [v4] - 2026-02-19

### Fixed
- **Variable Naming Convention**: Updated all API payload variables to use consistent camelCase/PascalCase
  - `Input_title` → `InputTitle` (PascalCase)
  - `jira_title` → `jiraTitle` (camelCase)
  - `Input_Description` → `InputDescription` (PascalCase)
  - `task_data` → `taskData` (camelCase)
  - `pic` → `pic` (lowercase, already correct)

### Changed
- **SMART Workflow Node 25242**: Updated Python code to accept `taskData` instead of `task_data`
  - Changed `input.get("task_data", {})` to `input.get("taskData", {})`
  - Updated result dictionary key from `"task_data"` to `"taskData"`

### Added
- **Rollback File**: Created `rollback/v4-camelcase-variables.html` for version control

### Documentation
- Updated `WORKFLOW_DOCUMENTATION.txt` with correct variable naming conventions
- Updated `README.md` with API payload variables section
- Added this CHANGELOG.md file

---

## [v3] - 2026-02-12

### Added
- **Google Sheet Integration**: Implemented taskData object for automatic task logging
- **Live RN PIC Assignment**: Added TC1-TC4 PIC assignment for Live RN Regression template

### Changed
- Enhanced API payload structure to include taskData

---

## [v2] - 2026-02-11

### Added
- **All 12 Templates**: Complete support for Seller App, Native App, and RN templates
- **Jira Integration**: Auto-create Jira tickets via SMART API
- **Team Chat Integration**: Auto-post messages with thread and mentions

### Fixed
- Mention rendering for RN templates (removed bullets before mentions)
- LLM prompt leak issue (reordered sections)

---

## [v1] - Initial Release

### Added
- Basic Seller App templates
- Manual copy/paste workflow
- No API integration

---

**Maintained by**: Marketplace QAoD Team  
**Contact**: qa.engineer@company.example
