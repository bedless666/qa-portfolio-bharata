# 🚀 Web + API Automation Framework

> 📌 **Portfolio Project** | Part of [QA Portfolio - Bharata](../README.md)

---

## 📌 Overview

A comprehensive automation test framework that integrates **Web UI Testing** and **API Testing** in a single project. Built with modern tools and best practices, this framework demonstrates full-stack test automation capabilities with CI/CD integration.

**Key Highlight**: Unified framework for both UI and API testing with GitHub Actions automation.

---

## 🎯 Key Features

### Framework Capabilities
- ✅ **Dual Testing**: Web UI + API in one framework
- ✅ **BDD Approach**: Cucumber with Gherkin syntax
- ✅ **Page Object Model**: Clean, maintainable UI test structure
- ✅ **CI/CD Integration**: GitHub Actions for automated test execution
- ✅ **Comprehensive Reporting**: HTML & JSON test reports
- ✅ **Gradle Build**: Modern dependency management

### Test Coverage
- ✅ Web UI scenarios (login, cart, checkout)
- ✅ API scenarios (CRUD operations)
- ✅ Positive & negative test cases
- ✅ End-to-end workflows

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Java 17** | Programming language |
| **Gradle** | Build automation |
| **Cucumber** | BDD test framework |
| **Selenium WebDriver** | Web UI automation |
| **Rest Assured** | API testing |
| **JUnit** | Test execution |
| **GitHub Actions** | CI/CD automation |

---

## 📂 Project Structure

```
src/
├── main/java/
│   └── com/automation/
│       └── Main.java
├── test/
    ├── java/
    │   ├── api/
    │   │   ├── runners/ApiTestRunner.java
    │   │   └── stepdefinitions/ApiStepDefinitions.java
    │   ├── web/
    │   │   ├── pages/
    │   │   │   ├── LoginPage.java
    │   │   │   └── CartPage.java
    │   │   ├── runners/WebTestRunner.java
    │   │   ├── stepdefinitions/
    │   │   │   ├── LoginStepDefinitions.java
    │   │   │   └── CartStepDefinitions.java
    │   │   └── utils/Hooks.java
    │   └── TestChrome.java
    └── resources/
        └── features/
            ├── api/sample.feature
            └── web/login.feature
```

---

## 🚀 Installation & Setup

### Prerequisites
- Java 17 or higher
- Gradle 7.x or higher
- Chrome browser (for Web UI tests)

### Quick Start

```bash
# Clone or navigate to project
cd 05-web-api-framework

# Install dependencies
./gradlew clean build

# Run all tests
./gradlew test

# Run API tests only
./gradlew testApi

# Run Web UI tests only
./gradlew testWeb
```

---

## 🧪 Test Scenarios

### Web UI Tests
**Target**: [DemoBlaze](https://www.demoblaze.com/)

| Scenario | Type | Description |
|----------|------|-------------|
| Login with valid credentials | Positive | Successful authentication |
| Login with invalid credentials | Negative | Error handling |
| Login without credentials | Negative | Validation check |
| End-to-end checkout | E2E | Full user journey |
| Logout after login | Positive | Session management |

### API Tests
**Target**: [DummyAPI](https://dummyapi.io/)

| Endpoint | Method | Scenario |
|----------|--------|----------|
| `/user/{id}` | GET | Retrieve user data |
| `/user/create` | POST | Create new user |
| `/user/{id}` | PUT | Update user data |
| `/user/{id}` | DELETE | Delete user |
| `/tag` | GET | List all tags |

---

## 📊 Reporting

### Local Reports
After test execution, reports are available at:
- **Cucumber API Report**: `build/reports/cucumber/testapi/cucumber-api.html`
- **Cucumber Web Report**: `build/reports/cucumber/testweb/cucumber-web.html`

### CI/CD Reports
- Tests run automatically on push/PR via GitHub Actions
- Reports uploaded as artifacts in GitHub Actions tab

---

## 🔄 CI/CD Integration

### GitHub Actions Workflow

Tests run automatically when:
- ✅ Push to `main` branch
- ✅ Pull request created
- ✅ Manual workflow dispatch

### Workflow Features
- Parallel test execution
- Automatic report generation
- Artifact upload for test results
- Build status badges

---

## 📊 What This Demonstrates

### Technical Skills
- ✅ Multi-layer test automation (UI + API)
- ✅ BDD with Cucumber & Gherkin
- ✅ Page Object Model design pattern
- ✅ Selenium WebDriver proficiency
- ✅ REST API testing with Rest Assured
- ✅ Gradle build configuration
- ✅ CI/CD pipeline setup

### QA Competencies
- ✅ Test framework architecture
- ✅ Test scenario design
- ✅ Positive & negative testing
- ✅ End-to-end test flows
- ✅ Test automation best practices
- ✅ Continuous integration
- ✅ Test reporting & documentation

---

## 🎓 Key Learnings

This project showcases:
1. **Unified Framework**: Single codebase for UI and API tests
2. **Scalability**: Modular structure for easy expansion
3. **Maintainability**: Page Object Model for UI tests
4. **Automation**: CI/CD integration for continuous testing
5. **Best Practices**: Clean code, separation of concerns

---

## 🔗 Related Projects

- [06-cucumber-ui-framework](../06-cucumber-ui-framework/) - Focused UI testing
- [07-final-project-framework](../07-final-project-framework/) - Advanced implementation
- [08-api-testing-basics](../08-api-testing-basics/) - API testing fundamentals

---

## 📌 Portfolio Context

**Timeline**: 2024 (Learning project)  
**Role**: Personal project  
**Status**: ✅ Complete & functional  
**Purpose**: Demonstrate full-stack test automation skills

This framework represents a comprehensive approach to test automation, combining UI and API testing in a single, maintainable codebase with modern CI/CD practices.

---

## 📄 Notes

- Framework uses public demo sites for testing (DemoBlaze, DummyAPI)
- All test data is generic and safe for public sharing
- CI/CD configuration included for easy deployment
- Extensible structure for adding more test scenarios

---

**Last Updated**: February 19, 2026  
**Part of**: [Bharata's QA Portfolio](../README.md)
