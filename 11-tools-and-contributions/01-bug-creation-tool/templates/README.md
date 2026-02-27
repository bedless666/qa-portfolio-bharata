# Bug Report Templates

This folder contains template files that show the structure of generated bug reports.

## Template Files

### 1. `jira_ticket_template.txt`
Template for JIRA ticket following bug-data.txt format.

**Sections:**
- Summary (with platform, device, region, environment)
- Configuration (OS, environment, account, etc)
- Impact Analysis (user impact, test impact, workaround)
- Reproducible Steps
- Expected vs Actual Results
- Evidence Checklist
- Initial Judgment
- Root Cause Analysis (detailed with solution steps)

### 2. `chat_message_template.txt`
Template for developer chat message.

**Sections:**
- Brief issue summary
- TraceID and error details
- Root cause identification
- Impact level
- Action items
- JIRA ticket link

### 3. `ANALYSIS_SUMMARY_template.txt`
Template for detailed technical analysis in plain text format.

**Sections:**
- Issue Overview (TraceID, Environment, Region, Severity)
- Problem Statement
- Error Details (Code, Message, Service, Component)
- Root Cause Analysis
- Service Chain
- Configuration/Data Issues (if applicable)
- Impact Assessment (User & System)
- Teams to Contact (Primary, Secondary, Tertiary)
- Solution Steps
- Verification Steps
- Log Evidence
- Next Steps

## How These Templates Are Used

When you use `@run_analyze.txt` with Cursor AI, it will:

1. Read bug data from `@bug-data.txt`
2. Analyze logs using TraceID via `@QAFoundBugs`
3. Use these templates as structure
4. Fill in the details based on analysis
5. Generate 3 files in folder: `result/[Bug_Title] - [RequestID]/`

**Note:** Analysis Summary is now in plain text format (.txt) for faster generation and easier readability.

## Example Usage

See the main `README.md` for complete usage examples with Cursor AI.

## Customization

You can modify these templates to match your team's requirements. The Cursor AI will adapt to the template structure you provide.

**Tips:**
- Keep templates simple for faster generation
- Plain text format (.txt) is faster than markdown (.md)
- Focus on essential sections for quick bug reporting
- Remove optional sections if not needed for your workflow

