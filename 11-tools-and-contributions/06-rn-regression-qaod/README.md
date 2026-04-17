# 🚀 RN & Native Regression QAoD Tool

> **Automated regression testing task generator for Seller App (React Native & Native platforms)**

An Electron-based desktop application that automates the creation of regression testing tasks, including Team Chat notifications and JIRA ticket generation, for the Marketplace Seller App QAoD team.

---

## 📋 Overview

**Purpose**: Streamline the regression testing workflow by automating repetitive tasks like message formatting, PIC assignment, and ticket creation.

**Key Capabilities**:
- ✅ Generate formatted Team Chat messages with automatic PIC mentions
- ✅ Create JIRA tickets with standardized templates
- ✅ Support 12+ regression templates (RN Staging, Native Adhoc, Native Live, Native Hotfix)
- ✅ Automatic task logging to Google Sheets
- ✅ Smart workflow orchestration via SMART API integration

---

## 🎯 Why Electron?

This tool uses **Electron** to create a desktop application instead of a simple web page. Here's why:

### 1. **CORS Bypass** 🔓
- **Problem**: Web browsers block cross-origin requests to Marketplace's internal APIs (SMART Workflow API)
- **Solution**: Electron's main process runs a local HTTP proxy server that forwards requests without CORS restrictions
- **Benefit**: Direct API integration without backend deployment

### 2. **Native Desktop Experience** 💻
- **Offline Capability**: Works without internet for form filling (only needs connection when submitting)
- **System Integration**: Can be launched like any native app (no browser required)
- **Persistent State**: Maintains form data between sessions

### 3. **Security & Control** 🔒
- **Secure API Credentials**: Deployment keys stored locally, not exposed in browser
- **Controlled Environment**: Runs on local machine, no external hosting required
- **No Server Maintenance**: Self-contained application, no infrastructure costs

### 4. **Enhanced Functionality** ⚡
- **Local HTTP Server**: Serves HTML files and handles API proxying on port 3847
- **IPC Communication**: Secure bridge between UI (renderer) and backend (main process)
- **Cross-Platform**: Builds for Windows, macOS, and Linux from single codebase

**Architecture**:
```
[HTML Form UI] → [Electron Renderer] → [IPC Bridge] → [Main Process + HTTP Server] 
                                                              ↓
                                                    [API Proxy (CORS bypass)]
                                                              ↓
                                                    [SMART Workflow API]
                                                              ↓
                                            [Team Chat + JIRA Integration]
```

---

## 🏗️ Project Structure

```
06-rn-regression-qaod/
├── Index-with-api.html          # Main application UI (181KB)
├── electron-app/                # Electron wrapper
│   ├── main.js                  # Main process + HTTP server + API proxy
│   ├── preload.js               # Security bridge (IPC)
│   └── package.json             # Dependencies & build config
└── docs/                        # Documentation
    ├── README.md                # Quick start guide
    ├── WORKFLOW.md              # Technical workflow details
    ├── TROUBLESHOOTING.md       # Common issues & solutions
    └── CHANGELOG.md             # Version history
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Access to Marketplace internal network

### Installation & Run

```bash
# Navigate to electron app directory
cd electron-app/

# Install dependencies (first time only)
npm install

# Start the application
npm start
```

The app will:
1. Launch Electron window
2. Start HTTP server on `http://127.0.0.1:3847`
3. Load the HTML interface automatically

---

## 📖 Usage

### Basic Workflow

1. **Select Template**: Choose from 12 regression templates
   - RN Staging (TC1-TC4)
   - Native Staging (TC1-TC4)
   - Native Adhoc
   - Native Live
   - Native Hotfix

2. **Fill Form**: Enter required information
   - Version number
   - Date & time
   - Build links (if applicable)
   - Additional notes

3. **Generate**: Click "Generate" button
   - Team Chat message posted automatically
   - JIRA ticket created with proper format
   - Task logged to Google Sheets

4. **Copy & Share**: Use generated content in Team Chat/JIRA

---

## 🔑 Key Features

### 1. **Smart PIC Assignment**
- Automatically assigns region-specific PICs based on template
- Mentions PICs in Team Chat messages
- Includes PIC emails in JIRA ticket

### 2. **Template Standardization**
- 12 pre-configured templates ensure consistency
- Automatic formatting (Jira Wiki Markup → Team Chat Markdown)
- Version-specific content generation

### 3. **Multi-Platform Integration**
- **Team Chat**: Post messages with threads and mentions
- **JIRA**: Create tickets with custom fields
- **Google Sheets**: Log tasks for tracking

### 4. **Smart Workflow Orchestration**
- LLM-powered text conversion (Jira markup → Team Chat markdown)
- Automated URL replacement
- Error detection & validation

---

## 📚 Documentation

For detailed information, see:

- **[WORKFLOW.md](docs/WORKFLOW.md)** - Technical architecture & API details
- **[TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)** - Common issues & debugging
- **[CHANGELOG.md](docs/CHANGELOG.md)** - Version history & updates

---

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Electron (Node.js)
- **APIs**: SMART Workflow API, Team Chat Webhook, JIRA API
- **Build**: electron-builder (cross-platform packaging)

---

## 📊 Impact

**Time Saved**: ~15 minutes per regression task
**Tasks Automated**: 50+ tasks/month
**Error Reduction**: 95% (standardized templates eliminate manual formatting errors)

---

## 👥 Team

**Maintained by**: Marketplace QAoD Team  
**Developer**: Bharata Aryaseta (qa.engineer@company.example)  
**Version**: v4.1 (Production)

---

## 📝 Notes

- **Environment**: Currently configured for Production deployment
- **Access**: Requires Marketplace internal network access
- **Support**: See TROUBLESHOOTING.md for common issues

---

**Last Updated**: February 2026
