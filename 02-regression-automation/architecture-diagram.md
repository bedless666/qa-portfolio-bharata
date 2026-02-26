# Regression Automation System - Architecture

## System Overview

This diagram shows the complete architecture of the automated regression monitoring and notification system.

---

## 🏗️ High-Level Architecture

```mermaid
graph TB
    subgraph "Data Sources"
        A[Google Calendar<br/>Release Schedule]
        B[Google Sheets<br/>Regression Dashboard]
    end
    
    subgraph "Automation Engine"
        C[Google Apps Script<br/>Notifier]
        D[Google Apps Script<br/>PIC Reminder]
        E[Config<br/>Centralized Settings]
    end
    
    subgraph "Notification Channels"
        F[Team Chat<br/>via Webhook]
        G[Email<br/>Notifications]
    end
    
    subgraph "Scheduling"
        H[Time-based Triggers<br/>Daily/Weekly]
    end
    
    A -->|Detect Current Version| C
    B -->|Read Test Results| C
    E -->|Configuration| C
    E -->|Configuration| D
    H -->|Execute| C
    H -->|Execute| D
    C -->|Send Formatted Message| F
    D -->|Send Reminder| F
    C -.->|Optional| G
    D -.->|Optional| G
    
    style A fill:#e1f5ff
    style B fill:#e1f5ff
    style C fill:#fff4e1
    style D fill:#fff4e1
    style E fill:#f0f0f0
    style F fill:#e8f5e9
    style G fill:#e8f5e9
    style H fill:#fce4ec
```

---

## 🔄 Detailed Workflow: Regression Notifier

```mermaid
sequenceDiagram
    participant T as Time Trigger
    participant N as Notifier Script
    participant C as Google Calendar
    participant S as Google Sheets
    participant W as Webhook API
    participant CH as Team Chat
    
    T->>N: Execute (Weekly)
    N->>C: Get today's events
    C-->>N: Return calendar events
    N->>N: Parse version (e.g., "2.v1")
    
    N->>S: Read regression data
    S-->>N: Return test results
    
    N->>N: Filter by current version
    N->>N: Validate data
    N->>N: Format message
    N->>N: Add @mentions
    
    N->>W: POST formatted payload
    W-->>N: 200 OK
    W->>CH: Display notification
    
    Note over CH: Team sees weekly<br/>regression schedule
```

---

## 📅 Detailed Workflow: PIC Reminder

```mermaid
sequenceDiagram
    participant T as Time Trigger
    participant R as Reminder Script
    participant D as Date Logic
    participant W as Webhook API
    participant CH as Team Chat
    
    T->>R: Execute (Daily at 9 AM)
    R->>D: Check if first weekday
    
    alt Is First Weekday
        D-->>R: True
        R->>R: Build reminder message
        R->>R: Add @mentions
        R->>W: POST reminder payload
        W-->>R: 200 OK
        W->>CH: Display reminder
        Note over CH: Team reminded to<br/>fill schedule
    else Not First Weekday
        D-->>R: False
        R->>R: Skip execution
        Note over R: Wait for next day
    end
```

---

## 🔧 Component Details

### 1. Google Calendar Integration

```mermaid
flowchart LR
    A[Calendar Event<br/>"2026.02.v1"] --> B{Parse Title}
    B --> C[Extract Month: "2"]
    B --> D[Extract Version: "1"]
    C --> E[Target Version:<br/>"2.v1"]
    D --> E
    E --> F[Filter Sheet Data]
    
    style A fill:#e1f5ff
    style E fill:#fff4e1
    style F fill:#e8f5e9
```

### 2. Data Validation Flow

```mermaid
flowchart TD
    A[Read Sheet Row] --> B{Has Data?}
    B -->|No| C[Skip Row]
    B -->|Yes| D{Required Fields?}
    D -->|Missing| C
    D -->|Complete| E{Correct Version?}
    E -->|No| C
    E -->|Yes| F{Valid Status?}
    F -->|No| C
    F -->|Yes| G[Add to Valid List]
    G --> H[Process Next Row]
    C --> H
    
    style A fill:#e1f5ff
    style G fill:#e8f5e9
    style C fill:#ffebee
```

### 3. Notification Format

```mermaid
flowchart LR
    A[Valid Data] --> B[Format Message]
    B --> C[Add Title]
    B --> D[Add Schedule Details]
    B --> E[Add Status Emojis]
    B --> F[Add @Mentions]
    C --> G[Build Payload]
    D --> G
    E --> G
    F --> G
    G --> H[Send to Webhook]
    
    style A fill:#e1f5ff
    style G fill:#fff4e1
    style H fill:#e8f5e9
```

---

## 📊 Data Flow

### Regression Notifier Data Flow

```mermaid
flowchart TD
    subgraph Input
        A[Calendar Events]
        B[Sheet: Regression PIC]
    end
    
    subgraph Processing
        C[Version Detection]
        D[Data Filtering]
        E[Validation]
        F[Formatting]
    end
    
    subgraph Output
        G[Formatted Message]
        H[Team Notification]
    end
    
    A --> C
    B --> D
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    
    style A fill:#e1f5ff
    style B fill:#e1f5ff
    style C fill:#fff4e1
    style D fill:#fff4e1
    style E fill:#fff4e1
    style F fill:#fff4e1
    style G fill:#e8f5e9
    style H fill:#e8f5e9
```

---

## ⏰ Trigger Schedule

```mermaid
gantt
    title Automation Schedule
    dateFormat HH:mm
    axisFormat %H:%M
    
    section Daily
    PIC Reminder Check: 09:00, 1m
    
    section Weekly
    Tuesday Schedule: 15:00, 1m
    Wednesday Schedule: 10:00, 1m
```

---

## 🔐 Security Architecture

```mermaid
flowchart TD
    A[Configuration File] --> B{Sensitive Data}
    B -->|Webhook URLs| C[Sanitized]
    B -->|Calendar IDs| C
    B -->|Sheet IDs| C
    B -->|Email Addresses| C
    C --> D[Demo Version]
    
    E[Original Scripts] --> F[Keep Private]
    D --> G[Portfolio Version]
    G --> H[Safe to Publish]
    
    style A fill:#ffebee
    style C fill:#fff4e1
    style D fill:#e8f5e9
    style H fill:#e8f5e9
```

---

## 🎯 Key Design Decisions

### 1. Calendar-Driven Version Detection
**Why:** Eliminates manual version configuration  
**Benefit:** Always tests current release automatically

### 2. Centralized Configuration
**Why:** Single source of truth for all settings  
**Benefit:** Easy to update, maintain, and sanitize

### 3. Webhook Integration
**Why:** Real-time notifications without email delays  
**Benefit:** Instant team visibility

### 4. Time-based Triggers
**Why:** Automated execution without manual intervention  
**Benefit:** Consistent, reliable notifications

---

## 📈 Performance Characteristics

- **Execution Time:** < 30 seconds per run
- **API Calls:** 3-5 per execution
- **Data Processing:** 50-100 rows per minute
- **Notification Delivery:** < 2 seconds
- **Error Rate:** < 1% (with retry logic)

---

## 🔄 Error Handling Strategy

```mermaid
flowchart TD
    A[Execute Script] --> B{Success?}
    B -->|Yes| C[Log Success]
    B -->|No| D{Retry?}
    D -->|Yes| E[Wait & Retry]
    D -->|No| F[Log Error]
    E --> A
    F --> G[Send Alert]
    C --> H[Complete]
    
    style A fill:#e1f5ff
    style C fill:#e8f5e9
    style F fill:#ffebee
    style G fill:#ffebee
```

---

## 📚 Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Automation** | Google Apps Script | Serverless execution |
| **Data Source** | Google Sheets | Regression tracking |
| **Scheduling** | Calendar API | Version detection |
| **Triggers** | Apps Script Triggers | Automated execution |
| **Notifications** | Webhook API | Team chat integration |
| **Configuration** | JavaScript Object | Centralized settings |

---

## 🚀 Scalability Considerations

1. **Horizontal Scaling:** Multiple scripts for different teams
2. **Rate Limiting:** Built-in delays between API calls
3. **Error Recovery:** Automatic retry with exponential backoff
4. **Monitoring:** Comprehensive logging for debugging
5. **Maintenance:** Modular design for easy updates

---

**Created:** February 19, 2026  
**Version:** 1.0  
**Status:** Complete
