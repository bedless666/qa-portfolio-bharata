# 📝 Test Case Migration Tool

> **This tool is designed to migrate test cases from old CSV format to new standardized format, ensuring consistency across regression test suites and maintaining proper test case structure with PIC assignments and regional coverage.**

A comprehensive guide and reference for migrating legacy test cases to the new standardized format used by the Marketplace Regression QA team.

---

## 📋 Overview

**Purpose**: Streamline the process of converting old test case formats to new standardized formats while preserving test coverage, PIC assignments, and regional information.

**Key Capabilities**:
- ✅ Structured migration process from old to new CSV format
- ✅ PIC (Person In Charge) mapping and regional assignment
- ✅ Component-based test case organization
- ✅ Automated flow analysis and step grouping
- ✅ Reference samples and templates for consistency

---

## 🎯 What This Tool Does

This is a **methodology and reference guide** (not an automated script) that helps QA engineers manually migrate test cases while following standardized rules.

**Migration Process**:
1. **Identify** test cases from old format CSV
2. **Extract** regional coverage from PIC mapping
3. **Analyze** test flow and group by components
4. **Determine** involved components (Homepage, PDP, Cart, Checkout, etc.)
5. **Restructure** into new format with proper headers and metadata
6. **Validate** against sample test cases

---

## 📁 Folder Structure

```
03-test-case-migration/
├── MIGRATION_GUIDE.txt          # Step-by-step migration instructions
├── Old test case/               # Legacy test case CSV files
│   └── ID Team Regression Case[P0] - Shopee(English).csv
├── New Test Case/               # Migrated test cases in new format
│   └── MP Regression Cases New Format - Buyer Flow 3 (TC 14).csv
└── Sample test case and docs/   # Reference samples and PIC mapping
    ├── MP Regression Cases New Format - Buyer Flow.csv
    └── ID Team Regression Case[P0] - PIC X Test Case.csv
```

---

## 🚀 Quick Start

### 1. Read Migration Guide

```bash
cat MIGRATION_GUIDE.txt
```

The guide contains:
- **Step-by-step process** for migration
- **Component identification** rules
- **Format specifications** for new CSV structure
- **Example transformations** with before/after samples

### 2. Review Sample Files

**Old Format Reference**:
- `Old test case/ID Team Regression Case[P0] - Shopee(English).csv`

**New Format Reference**:
- `Sample test case and docs/MP Regression Cases New Format - Buyer Flow.csv`

**PIC Mapping Reference**:
- `Sample test case and docs/ID Team Regression Case[P0] - PIC X Test Case.csv`

### 3. Start Migration

1. Open old test case CSV
2. Identify test case by numbering (e.g., `[14]`, `[15]`)
3. Extract PIC and regional coverage
4. Analyze flow and group by components
5. Create new test case entries following new format
6. Validate against sample files

---

## 📊 Key Migration Rules

### Component Mapping

Test steps are grouped by these components:
- **Homepage**: Search, category browsing
- **PDP (Product Detail Page)**: Product viewing, variant selection
- **Cart**: Cart management, item updates
- **Checkout**: Address, shipping, payment selection
- **Order Payment**: Payment processing
- **Order Data & Ops**: Order confirmation, tracking
- **Seller Fulfilment**: Shipping, delivery updates

### Regional Coverage

Extract from PIC names:
- `Gafiliano Gapili (ID), Trisha Theophania (BR)` → `region=ID/BR`
- Format: `region=ID/BR/TW` (slash-separated, no spaces)

### Test Case Splitting

If a test case involves multiple components, split into separate test case entries:
- **Old**: One test case covering Homepage → PDP → Cart → Checkout
- **New**: Four separate test cases, one per component

---

## 📚 Reference Documents

- **Migration Guide**: `MIGRATION_GUIDE.txt` - Complete step-by-step instructions
- **Old Format**: `Old test case/` - Legacy test case files
- **New Format**: `New Test Case/` - Migrated test case outputs
- **Samples**: `Sample test case and docs/` - Reference templates and PIC mapping

---

## 🎯 Use Cases

1. **Standardizing Legacy Test Cases**: Convert old regression test suites to new format
2. **Onboarding New QA Members**: Reference guide for understanding test case structure
3. **Maintaining Consistency**: Ensure all test cases follow the same format across teams
4. **Regional Coverage Tracking**: Properly assign and track PIC responsibilities per region

---

## 📝 Notes

- This is a **manual migration process** guided by structured rules
- The `MIGRATION_GUIDE.txt` contains detailed examples and edge cases
- Sample files serve as templates for validation
- PIC mapping ensures proper regional coverage and accountability

---

## 🔗 Related Tools

- **JIRA Weekly Summary** (`02-jira-weekly-summary/`) - For tracking migrated test case execution
- **Monthly Regression Schedule** (`04-monthly-regression-schedule/`) - For scheduling migrated test cases
- **RN & Native Regression QAoD** (`06-rn-regression-qaod/`) - Uses standardized test case format

---

**Last Updated**: February 2024  
**Team**: Marketplace Regression QA Team
