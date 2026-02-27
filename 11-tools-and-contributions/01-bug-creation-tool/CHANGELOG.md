# Changelog - Bug Analyzer

## [v2.3.0] - 2025-11-27

### 🔒 Strict Template Enforcement

#### Problem Fixed
- **ISSUE**: Generated `jira_ticket.txt` contained extra sections (e.g., "Required Actions") not defined in template
- **ROOT CAUSE**: Template didn't have explicit instructions to prevent adding extra sections
- **IMPACT**: Inconsistent JIRA ticket format

#### Changes Made
1. **Updated `jira_ticket_template.txt`**:
   - Added warning header: "⚠️ STRICT TEMPLATE - FOLLOW EXACTLY AS SHOWN BELOW"
   - Added explicit instruction: "DO NOT ADD ANY EXTRA SECTIONS NOT LISTED HERE"
   - Added footer: "⚠️ END OF TEMPLATE - DO NOT ADD ANYTHING BEYOND THIS POINT"
   - Replaced placeholders with clear bracket notation `[description]`

2. **Updated `run_analyze.txt`**:
   - Added "(STRICT - follow exactly, no extra sections)" note for jira mode
   - Added explicit warning at the end of workflow
   - Emphasized: "DO NOT add extra sections like 'Required Actions', 'Solution Steps', etc."

#### Expected Behavior
- Generated JIRA tickets will now **ONLY** contain sections defined in the template
- No more unexpected sections like "Required Actions", "Solution Steps", "Teams to Contact", etc.
- Consistent output format across all bug reports

---

## [v2.2.0] - 2025-11-18

### 🔄 Folder Consolidation & Merge

#### Merged bug_reporting_script → bug_creation
- **MERGED**: All content from `bug_reporting_script` folder into `bug_creation`
- **ROOT FOLDER**: Remains as `bug_creation` (original name preserved)
- **BENEFIT**: Single unified folder for all bug analysis tools

#### Folder Structure Changes
**Before:**
```
data-prep/
├── bug_creation/          (old workflow)
│   ├── bug-data.txt
│   ├── run_analyze.txt
│   ├── result/
│   └── template/
└── bug_reporting_script/  (new workflow)
    ├── bug_analyzer_prompt.txt
    ├── bug_reports/
    └── templates/
```

**After:**
```
data-prep/
└── bug_creation/          (unified)
    ├── run_analyze.txt    (merged workflow)
    ├── result/            (all bug reports)
    ├── templates/         (all templates)
    ├── CHANGELOG.md
    └── README.md
```

#### What Changed
1. **Merged Folders:**
   - `bug_reports/` → `result/` (all generated bug reports now in `result/`)
   - `templates/` (new) replaces `template/` (old)
   - Deleted old `template/` folder

2. **Merged Files:**
   - `bug_analyzer_prompt.txt` merged into `run_analyze.txt`
   - Updated folder path: `bug_reports/` → `result/`
   - Deleted `bug-data.txt` (no longer needed)

3. **Added Documentation:**
   - `CHANGELOG.md` (this file)
   - `README.md` (comprehensive guide)
   - `.gitignore`

4. **Bug Reports Consolidated:**
   - All 3 generated bug reports moved to `result/`
   - Format: `[Bug_Title] - [RequestID]/`
   - Each contains: jira_ticket.txt, chat_message.txt, ANALYSIS_SUMMARY.md

#### Key Differences: Old vs New Workflow

| Aspect | Old (bug-data.txt) | New (run_analyze.txt) |
|--------|-------------------|----------------------|
| **Input** | Manual bug-data.txt file | Direct prompt with TraceID |
| **Analysis** | Read from file | Real-time log analysis via @QAFoundBugs |
| **Output Folder** | `result/` | `result/[Bug_Title] - [RequestID]/` |
| **Templates** | `template/default_template.txt` | `templates/` (3 separate files) |
| **Workflow** | 5 steps (file-based) | 6 steps (AI-driven) |
| **Error Detection** | Manual | Automatic (SIP/DB/Item/Permission) |
| **Root Cause** | Added manually | Auto-generated from logs |

#### Migration Summary
- ✅ Folder `bug_reporting_script` deleted
- ✅ All content merged into `bug_creation`
- ✅ Workflow unified in `run_analyze.txt`
- ✅ Templates consolidated in `templates/`
- ✅ Bug reports in `result/`
- ✅ Documentation complete

---

## [v2.1.0] - 2025-11-17

### 📝 Ultra-Simplified Prompting File

#### Minimalist bug_analyzer_prompt.txt
- **v2.0**: 343 lines with verbose instructions
- **v2.1 (first)**: 124 lines - concise format
- **v2.1 (final)**: **13 lines** - workflow only! 🎯
- **BENEFIT**: Instant read, zero clutter, template-dependent

#### What Changed
- **REMOVED ALL**: Templates, examples, error types, usage instructions
- **KEPT ONLY**: 6-step workflow that references template files
- Templates now live in `templates/` directory (separation of concerns)
- Workflow directly depends on `@templates/` files

#### Structure
```
bug_analyzer_prompt.txt (13 lines)
  ↓ references
templates/
  ├── jira_ticket_template.txt
  ├── chat_message_template.txt
  └── ANALYSIS_SUMMARY_template.md
```

#### Key Features Retained
- ✅ All 6 workflow steps intact
- ✅ Templates separated to dedicated files
- ✅ Error type detection logic (in AI context)
- ✅ Folder naming: `[Bug_Title] - [RequestID]`
- ✅ 3-file generation workflow

---

## [v2.0.0] - 2025-11-14

### 🎯 Major Changes - Full Conversion to TXT-Based Prompting

#### Converted from Python to TXT Prompting
- **REMOVED**: Python script (`bug_analyzer_unified.py`)
- **REMOVED**: Shell wrapper (`analyze_bug.sh`)
- **REMOVED**: Requirements file (`requirements.txt`)
- **ADDED**: `bug_analyzer_prompt.txt` - Comprehensive prompting instructions for Cursor AI
- **BENEFIT**: Simpler, no code maintenance, fully AI-driven

#### New Folder Naming Format
- **OLD**: `[reqid] - [issue] - [timestamp]`
- **NEW**: `[Bug_Title] - [RequestID]`
- **EXAMPLE**: `Promotion_performance_not_shown - e3e3e7f33ffebcd1`
- **BENEFIT**: Cleaner, more readable, easier to search by bug title

#### Mandatory Template Following bug-data.txt Format
- **JIRA Ticket**: Now follows standardized bug-data.txt template
- **Sections**: Summary, Configuration, Impact Analysis, Steps, Expected/Actual, Evidence, Root Cause
- **BENEFIT**: Consistent format across all bug reports

#### Documentation Consolidation
- **MERGED**: UPDATE_SUMMARY.md content into CHANGELOG.md
- **UPDATED**: README.md with TXT-based workflow
- **BENEFIT**: Single source of truth for version history

### 📝 How to Use v2.0

**Step 1: Provide Bug Information to Cursor AI**
```
@bug_analyzer_prompt.txt please analyze this bug:

Summary: [issue description]
Environment: [staging/test/uat/live]
Region: [id/sg/my/etc]
TraceID: [trace_id]
Error Response: [error JSON]
```

**Step 2: Cursor AI Will:**
1. Analyze logs using @QAFoundBugs tools
2. Identify root cause
3. Create folder: `[Bug_Title] - [RequestID]`
4. Generate 3 files:
   - `jira_ticket.txt` (following bug-data.txt template)
   - `chat_message.txt`
   - `ANALYSIS_SUMMARY.md`

**Step 3: Use Generated Files**
1. Copy `jira_ticket.txt` → Paste to JIRA
2. Copy `chat_message.txt` → Paste to dev chat
3. Review `ANALYSIS_SUMMARY.md` for technical details

### 🎨 What's Different

| Aspect | v1.x (Python) | v2.0 (TXT) |
|--------|---------------|------------|
| **Execution** | Run Python script | Prompt Cursor AI |
| **Dependencies** | Python 3 required | None |
| **Maintenance** | Code updates needed | Update prompts only |
| **Flexibility** | Fixed logic | AI-driven analysis |
| **Folder Name** | `reqid - issue - timestamp` | `Bug_Title - reqid` |
| **Template** | Custom format | bug-data.txt format |

### 🚀 Migration Guide

**For Existing Users:**
1. Delete old Python scripts (already done)
2. Use `bug_analyzer_prompt.txt` instead
3. Mention `@bug_analyzer_prompt.txt` in Cursor
4. Follow new prompting format
5. Folders will use new naming convention

**Template Changes:**
- JIRA tickets now include "Impact Analysis" section
- "Initial Judgment" field added
- "Evidence and Troubleshooting" checklist added
- More structured "Root cause analysis" section

---

## [v1.1.0] - 2025-11-12

### 🧪 v1.1.0 Testing Results (Historical Reference)

#### Test 1: Without Error Response
- ✅ Shows analysis
- ✅ Provides warning
- ✅ Does NOT create folder
- ✅ Hints to provide error response

#### Test 2: With Error Response
- ✅ Detects "no open channels" error
- ✅ Provides complete analysis
- ✅ Creates folder with 3 files
- ✅ Detailed root cause for SIP issue

### 📝 Bahasa Indonesia - Ringkasan v1.1.0

**Masalah yang Diperbaiki:**
- Folder duplikat tidak dibuat lagi
- Folder HANYA dibuat jika error response disediakan
- Tanpa error response = tampilkan analisis saja, TIDAK buat folder

**Fitur yang Ditambahkan:**
- Smart folder creation logic
- New error analyzer: "No Open Channels" untuk SIP cross-border
- Auto-generated ANALYSIS_SUMMARY.md
- Enhanced error response parsing (support multiple formats)

---

### 🎯 Major Improvements

#### Smart Folder Creation
- **FIXED**: Script no longer creates folders for incomplete analysis
- Folders are ONLY created when error response is provided and analyzed
- Prevents duplicate folders when retrying analysis
- Cleaner bug_reports directory

#### New Error Analyzer: "No Open Channels"
- Added specialized analyzer for SIP cross-border listing errors
- Detects `marketplace.listing.upload.processing` errors
- Identifies missing logistics channel configurations
- Provides detailed root cause for TH → LA (and other routes)

#### Enhanced Error Response Parsing
- Now supports multiple error response formats:
  - `error_msg` or `msg` field
  - `error` or `code` field
- Better compatibility with different API responses

#### Auto-Generated Summary
- Automatically creates `ANALYSIS_SUMMARY.md` in each report folder
- Provides detailed technical analysis
- Includes verification steps and next actions

### 📝 Behavior Changes

**Before:**
```bash
# Without error response - creates folder with incomplete data ❌
python3 bug_analyzer_unified.py --request-id "abc123" --env test --region id --context "test"
# Result: Creates folder with generic analysis
```

**After:**
```bash
# Without error response - NO folder created ✅
python3 bug_analyzer_unified.py --request-id "abc123" --env test --region id --context "test"
# Result: Shows analysis but doesn't save (warns to provide error response)

# With error response - creates complete folder ✅
python3 bug_analyzer_unified.py --request-id "abc123" --env test --region id --context "test" \
  --error-json '{"code":405300005,"msg":"no open channels"}'
# Result: Creates folder with complete analysis
```

### 🔧 Technical Details

#### New Analyzer Method
```python
def _analyze_no_open_channels_error(self, input_data: Dict, error_msg: str) -> Dict:
    """Analyze 'no open channels' error for SIP cross-border listing."""
```

**Detects:**
- Error code: 405300005
- Error message containing: "no open channels"
- Service chain: crossupload.api → marketplace.listing.upload.processing
- Extracts shop ID from error message
- Identifies source and target regions

**Provides:**
- Detailed root cause analysis
- Impact assessment
- Required actions for Logistics/SIP/Platform teams
- Verification steps

#### Smart Save Logic
```python
# Check if analysis is placeholder or real
is_placeholder = (
    error_code == 'PENDING_LOG_ANALYSIS' or 
    (analysis.get('root_cause', '').startswith('Error occurred in') and not error_response)
)

if is_placeholder:
    # Don't save - just show warning
else:
    # Save complete analysis to folder
```

### 📁 Generated Files

When analysis is complete, creates:
1. `jira_ticket.txt` - Ready-to-paste JIRA ticket
2. `chat_message.txt` - Ready-to-send dev chat message
3. `ANALYSIS_SUMMARY.md` - Detailed technical analysis (NEW!)

### 🎯 Use Cases

#### Use Case 1: Quick Check (No Folder Created)
```bash
# Just want to see what the error might be
python3 bug_analyzer_unified.py \
  --request-id "e3e3e7f34362af7d998a59042f261a01" \
  --environment "test" \
  --region "th" \
  --context "Can't create SKU"

# Output: Shows analysis but doesn't save
# ⚠️ Note: Analysis is incomplete (no error response provided)
# Reports NOT saved - provide error response for complete analysis
```

#### Use Case 2: Complete Analysis (Folder Created)
```bash
# Have error response, want complete analysis
python3 bug_analyzer_unified.py \
  --request-id "e3e3e7f34362af7d998a59042f261a01" \
  --environment "test" \
  --region "th" \
  --context "Can't create SKU from TH to LA" \
  --error-json '{"code":405300005,"msg":"no open channels"}'

# Output: Creates folder with 3 files
# ✅ Reports saved to: bug_reports/e3e3e7f34362af7d - ...
```

### 🐛 Bug Fixes
- Fixed duplicate folder creation on retry
- Fixed error response parsing for different formats
- Fixed generic error handling fallback

### 📚 Documentation
- Updated README with new behavior
- Added examples for both scenarios
- Documented new error analyzer

---

## [v1.0.0] - 2025-11-10

### Initial Release
- Basic bug analysis from request ID
- Multiple error type analyzers
- JIRA and chat template generation
- Automatic folder organization

