# 🔄 Technical Workflow Documentation

Detailed technical architecture and workflow for the RN & Native Regression QAoD Tool.

---

## 📐 System Architecture

### High-Level Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                  │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  Index-with-api.html (HTML + CSS + JavaScript)                 │  │
│  │  - 12 Regression Templates                                     │  │
│  │  - Form Validation & Data Collection                           │  │
│  │  - API Payload Builder                                         │  │
│  └────────────────────────────────────────────────────────────────┘  │
└────────────────────────┬─────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────────┐
│                      ELECTRON LAYER                                   │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  Main Process (main.js)                                      │    │
│  │  - HTTP Server (127.0.0.1:3847)                              │    │
│  │  - API Proxy Handler (/api/proxy endpoint)                   │    │
│  │  - CORS Header Injection                                     │    │
│  │  - HTTPS Request Forwarding                                  │    │
│  └─────────────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  Preload Script (preload.js)                                 │    │
│  │  - Context Bridge (secure IPC)                               │    │
│  │  - Environment Detection API                                 │    │
│  └─────────────────────────────────────────────────────────────┘    │
└────────────────────────┬─────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    SMART WORKFLOW API                                 │
│                  (smart.shopee.io)                                    │
│  - Workflow Orchestration Engine                                     │
│  - Multi-node execution pipeline                                     │
└────────────────────────┬─────────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
    ┌────────┐     ┌─────────┐    ┌──────────┐
    │  LLM   │     │  JIRA   │    │ SeaTalk  │
    │  Node  │     │  Node   │    │   Node   │
    │ (25242)│     │ (25243) │    │ (25244)  │
    └────────┘     └─────────┘    └──────────┘
```

---

## 🔀 Detailed Workflow Steps

### Phase 1: User Input Collection

1. **Template Selection**
   - User selects from dropdown (e.g., "RN Staging - TC1")
   - JavaScript loads template-specific configuration
   - Form fields auto-populate with defaults

2. **Data Entry**
   - Version number (e.g., `2026.v2.103`)
   - Date & Time
   - PIC assignments per region
   - Additional notes/context

3. **Validation**
   - Required fields check
   - Format validation (version pattern, date format)
   - PIC email validation

---

### Phase 2: Payload Construction

**JavaScript Logic** (in `Index-with-api.html`):

```javascript
const requestBody = {
    // Main title for SeaTalk message
    InputTitle: `RN Staging Regression - ${version}`,
    
    // Detailed description in Jira Wiki Markup
    InputDescription: generateJiraMarkup(templateData),
    
    // JIRA ticket title
    jiraTitle: `[QAoD] RN Staging Regression - ${version}`,
    
    // PIC email array
    pic: [
        "user.id@shopee.com",
        "user.vn@shopee.com",
        // ... other PICs
    ],
    
    // Task metadata for Google Sheets logging
    taskData: {
        template: "RN_STAGING_TC1",
        version: version,
        date: date,
        time: time,
        pics: picsObject,
        notes: additionalNotes
    }
};
```

---

### Phase 3: API Request Routing

**Environment Detection**:

```javascript
// Check if running in Electron
const isElectron = window.electronAPI && window.electronAPI.isElectron;

if (isElectron) {
    // Use local proxy to bypass CORS
    apiUrl = 'http://127.0.0.1:3847/api/proxy';
} else {
    // Direct API call (will fail due to CORS in browser)
    apiUrl = 'https://smart.shopee.io/api/v1/...';
}
```

**Proxy Request** (Electron mode):

```javascript
fetch('http://127.0.0.1:3847/api/proxy', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Target-URL': 'https://smart.shopee.io/api/v1/workflow/...'
    },
    body: JSON.stringify(requestBody)
})
```

---

### Phase 4: Electron Proxy Handling

**Main Process** (`main.js`):

```javascript
function handleApiProxy(req, res) {
    // 1. Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    
    // 2. Extract target URL from header
    const targetUrl = req.headers['x-target-url'];
    
    // 3. Forward request to SMART API
    const apiReq = https.request(targetUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // ... forward other headers
        }
    });
    
    // 4. Pipe request body
    req.pipe(apiReq);
    
    // 5. Return response to client
    apiReq.on('response', (apiRes) => {
        apiRes.pipe(res);
    });
}
```

---

### Phase 5: SMART Workflow Execution

**Node Execution Order**:

1. **LLM Node (25242)** - Text Conversion
   ```python
   # Input: InputDescription (Jira Wiki Markup)
   # Process: Convert to SeaTalk Markdown
   # Output: Formatted text for SeaTalk
   
   # Example conversions:
   # {color:red}text{color} → **text** (bold)
   # * bullet → • bullet
   # h3. heading → ### heading
   ```

2. **JIRA Node (25243)** - Ticket Creation
   ```python
   # Input: jiraTitle, InputDescription, pic array
   # Process: Create SPMR ticket via JIRA API
   # Output: ticket_id, ticket_url
   
   # Custom fields:
   # - Assignee: QAoD team
   # - Labels: regression, seller-app
   # - PICs: From pic array
   ```

3. **SeaTalk Node (25244)** - Notification
   ```python
   # Input: InputTitle, converted description, pic array
   # Process: Post message + create thread + mention PICs
   # Output: message_id, thread_id
   
   # Message structure:
   # - Main message: InputTitle + summary
   # - Thread: Full test instructions
   # - Mentions: @pic[0] @pic[1] ...
   ```

---

## 🗂️ Template System

### Template Structure

Each template contains:

```javascript
{
    name: "RN Staging - TC1",
    type: "RN_STAGING",
    defaultPICs: {
        ID: "user.id@shopee.com",
        VN: "user.vn@shopee.com",
        TH: "user.th@shopee.com",
        // ... other regions
    },
    messageFormat: {
        title: "RN Staging Regression - {{version}}",
        description: `
            Staging Regression - {{version}}
            
            Date:
            {{date}}, {{time}}
            
            PIC:
            {{pics}}
            
            Test Instructions:
            ...
        `
    },
    jiraFormat: {
        title: "[QAoD] RN Staging Regression - {{version}}",
        description: "..." // Jira Wiki Markup
    }
}
```

### Variable Substitution

**Placeholders**:
- `{{version}}` → User input version
- `{{date}}` → User input date
- `{{time}}` → User input time
- `{{pics}}` → Formatted PIC list with mentions

---

## 🔌 API Integration Details

### SMART Workflow API

**Endpoint**:
```
POST https://smart.shopee.io/api/v1/workflow/trigger/deployment/{hash_id}
```

**Authentication**:
```
X-Deployment-Key: {deployment_key}
```

**Request Headers**:
```
Content-Type: application/json
X-Deployment-Key: wxqjm1ghy5rynyb86ka51zre
```

**Response Format**:
```json
{
    "status": "success",
    "execution_id": "...",
    "results": {
        "jira_ticket_id": "SPMR-12345",
        "seatalk_message_id": "...",
        "seatalk_thread_id": "..."
    }
}
```

---

## 📦 Build & Distribution

### Package Configuration (`package.json`)

```json
{
    "name": "qaod-regression-tool",
    "version": "4.1.0",
    "main": "main.js",
    "scripts": {
        "start": "electron .",
        "build": "electron-builder"
    },
    "build": {
        "appId": "com.shopee.qaod.regression",
        "productName": "QAoD Regression Tool",
        "mac": {
            "target": ["dmg", "zip"],
            "category": "public.app-category.developer-tools"
        },
        "win": {
            "target": ["nsis", "portable"]
        }
    }
}
```

### Build Commands

```bash
# Build for current platform
npm run build

# Build for specific platform
npm run build -- --mac
npm run build -- --win
npm run build -- --linux
```

---

## 🎯 Performance Metrics

- **App Launch Time**: ~2-3 seconds
- **API Response Time**: ~3-5 seconds (depends on SMART API)
- **Total Workflow Time**: ~10-15 seconds (from click to completion)
- **Memory Usage**: ~150-200 MB (Electron + Chromium)

---

## 🔍 Debugging Guide

### Check Electron Environment

```javascript
// In DevTools Console
console.log(window.electronAPI);
// Should output: { isElectron: true, platform: 'darwin', version: '...' }
```

### Verify Proxy Server

```bash
# Check if port 3847 is listening
lsof -i :3847

# Expected output:
# COMMAND   PID   USER   FD   TYPE  DEVICE  NODE NAME
# Electron  1234  user   20u  IPv4  0x...   TCP localhost:3847 (LISTEN)
```

### Test API Directly

```bash
# Test proxy endpoint
curl -X POST http://127.0.0.1:3847/api/proxy \
  -H "Content-Type: application/json" \
  -H "X-Target-URL: https://smart.shopee.io/api/v1/workflow/..." \
  -d '{"InputTitle":"Test"}'
```

---

## 📝 Code Maintenance

### Key Files to Modify

**Change Templates**:
- Edit `Index-with-api.html` (search for template definitions)

**Change API Endpoint**:
- Edit `API_CONFIG` in `Index-with-api.html`

**Change Proxy Port**:
- Edit `PORT` constant in `main.js` (default: 3847)

**Add New Workflow Nodes**:
- Update SMART Workflow platform (not client-side)

---

## 🌟 Best Practices

1. **Always test in Test environment first** before switching to Production
2. **Keep deployment keys secure** (never commit to public repos)
3. **Monitor SMART Workflow logs** for API errors
4. **Backup HTML file** before major changes (use `rollback/` folder)
5. **Document variable naming** (follow VARIABLE_NAMING_GUIDE.md conventions)

---

## 🔗 External Dependencies

- **SMART Workflow Platform**: https://smart.shopee.io
- **JIRA API**: Shopee internal JIRA instance
- **SeaTalk Webhook**: Shopee internal messaging
- **Google Sheets API**: For task logging (via SMART workflow)

---

**Maintained by**: Shopee QAoD Team  
**Technical Contact**: bharata.aryaseta@shopee.com  
**Last Updated**: February 2026
