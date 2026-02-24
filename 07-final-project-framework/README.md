# 🎓 Final Project: Advanced Automation Framework

> 📌 **Portfolio Project** | Part of [QA Portfolio - Bharata](../README.md)

---

## 📋 Overview

An advanced automation test framework combining **Web UI Testing** and **API Testing** with comprehensive test scenarios, modern architecture, and production-ready practices. This project represents a capstone implementation of test automation skills.

**Key Highlight**: Production-quality framework with extensive test coverage, proper error handling, and CI/CD integration.

---

## 🎯 Key Features

### Framework Architecture
- ✅ **Unified Framework**: Web UI + API testing in one codebase
- ✅ **BDD with Cucumber**: Business-readable test scenarios
- ✅ **Page Object Model**: Maintainable UI test structure
- ✅ **Robust Error Handling**: Alert handling, timeouts, fallbacks
- ✅ **CI/CD Ready**: GitHub Actions integration
- ✅ **Comprehensive Reporting**: Multiple report formats

### Advanced Capabilities
- ✅ Dynamic wait strategies
- ✅ Alert/modal handling
- ✅ End-to-end test flows
- ✅ Parallel test execution support
- ✅ Detailed test reports

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 17 | Programming language |
| **Gradle** | 7.x | Build automation |
| **Cucumber** | 7.14.0 | BDD framework |
| **Selenium** | 4.x | Web automation |
| **Rest Assured** | Latest | API testing |
| **JUnit Jupiter** | 5.10.0 | Test execution |
| **Allure** | Latest | Advanced reporting |

---

## 📂 Project Structure

```
final-project-automation/
├── src/
│   ├── test/
│       ├── java/
│       │   ├── web/
│       │   │   ├── pages/
│       │   │   │   ├── LoginPage.java
│       │   │   │   └── CartPage.java
│       │   │   ├── stepdefinitions/
│       │   │   │   ├── LoginStepDefinitions.java
│       │   │   │   └── CartStepDefinitions.java
│       │   │   ├── runners/WebTestRunner.java
│       │   │   └── utils/Hooks.java
│       │   └── api/
│       │       ├── stepdefinitions/ApiStepDefinitions.java
│       │       └── runners/ApiTestRunner.java
│       └── resources/
│           └── features/
│               ├── web/login.feature
│               └── api/sample.feature
├── .github/workflows/ci.yml
├── build.gradle
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Gradle 7.x+
- Chrome browser (for UI tests)

### Installation

```bash
# Navigate to project
cd 07-final-project-framework

# Build and install dependencies
./gradlew clean build
```

### Execution

```bash
# Run all tests
./gradlew test

# Run API tests only
./gradlew testApi

# Run Web UI tests only
./gradlew testWeb
```

---

## 🧪 Test Coverage

### Web UI Test Scenarios

**Target Application**: [DemoBlaze](https://www.demoblaze.com/)

1. **Successful Login**
   - Valid credentials authentication
   - Homepage redirection verification

2. **Login with Incorrect Credentials** (Negative)
   - Invalid username/password handling
   - Error message validation

3. **End-to-End Login & Checkout**
   - Complete user journey
   - Cart management
   - Checkout flow
   - Purchase confirmation

4. **Logout After Login**
   - Session termination
   - State verification

5. **Login Without Credentials** (Negative)
   - Empty field validation
   - Error message display

### API Test Scenarios

**Target API**: DummyAPI

- GET requests (retrieve data)
- POST requests (create resources)
- PUT requests (update resources)
- DELETE requests (remove resources)
- Response validation
- Status code verification

---

## 🏗️ Architecture Highlights

### Page Object Model

```java
public class LoginPage {
    private WebDriver driver;
    
    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }
    
    public void openLoginModal() {
        // Implementation
    }
    
    public void enterUsername(String username) {
        // Implementation
    }
    
    public boolean isUserLoggedIn() {
        // Verification logic
    }
}
```

### Robust Error Handling

```java
private void handleUnexpectedAlert() {
    try {
        Alert alert = driver.switchTo().alert();
        System.out.println("Unexpected alert: " + alert.getText());
        alert.accept();
    } catch (NoAlertPresentException ignored) {
        // No alert present, continue
    }
}
```

### Step Definitions

```java
@When("user enters username {string} and password {string}")
public void user_enters_credentials(String username, String password) {
    loginPage.enterUsername(username);
    loginPage.enterPassword(password);
}
```

---

## 📊 What This Demonstrates

### Technical Skills
- ✅ Advanced Selenium techniques
- ✅ Dynamic wait strategies
- ✅ Alert/modal handling
- ✅ Exception handling
- ✅ Test hooks (setup/teardown)
- ✅ Cucumber integration
- ✅ REST API testing
- ✅ CI/CD pipeline configuration

### QA Competencies
- ✅ Comprehensive test coverage
- ✅ End-to-end testing
- ✅ Negative test scenarios
- ✅ Test framework design
- ✅ Production-ready code quality
- ✅ Test maintainability
- ✅ Documentation practices

---

## 🎯 Key Achievements

1. **Robust Framework**: Handles real-world scenarios (alerts, timeouts)
2. **Clean Architecture**: Modular, maintainable code structure
3. **Comprehensive Testing**: Positive, negative, and E2E scenarios
4. **CI/CD Integration**: Automated testing pipeline
5. **Professional Quality**: Production-ready implementation

---

## 📊 Test Reports

### Report Types Generated
- **Cucumber HTML**: Visual test results
- **Cucumber JSON**: Machine-readable results
- **Allure Reports**: Advanced analytics
- **JUnit Reports**: Standard test output

---

## 🔗 Related Projects

- [05-web-api-framework](../05-web-api-framework/) - Similar unified approach
- [06-cucumber-ui-framework](../06-cucumber-ui-framework/) - Simpler UI framework
- [01-regression-automation](../01-regression-automation/) - Professional automation work
- [10-stockbit-technical-test](../10-stockbit-technical-test/) - Technical assessment project

---

## 📌 Portfolio Context

**Timeline**: 2025 (Advanced learning project)  
**Role**: Personal project  
**Status**: ✅ Complete & functional  
**Purpose**: Demonstrate advanced automation skills

This project represents a significant step up in test automation complexity, showcasing production-ready code quality and comprehensive testing practices.

---

## 📄 Notes

- All test credentials sanitized for portfolio (demo_user/demo_pass123)
- Framework tests against public demo sites
- No sensitive or proprietary data
- Ready for public sharing

---

**Last Updated**: February 19, 2026  
**Part of**: [Bharata's QA Portfolio](../README.md)
