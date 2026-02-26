# 🥒 Cucumber UI Test Framework

> 📌 **Portfolio Project** | Part of [QA Portfolio - Bharata](../README.md)

---

## 📋 Overview

A clean, focused UI automation framework built with Cucumber, Java, Gradle, and Selenium. This project demonstrates BDD (Behavior-Driven Development) test automation with Page Object Model design pattern.

**Purpose**: Educational framework showcasing Cucumber BDD and Selenium WebDriver fundamentals.

---

## 🎓 Project Context

> **Learning Project Notice**  
> This project was developed as part of a professional QA bootcamp training program to build foundational automation skills. While it demonstrates technical capabilities and best practices learned during the training, it represents educational work rather than production implementation from professional employment.
> 
> **Value Proposition**: Showcases ability to learn and implement BDD testing methodology, master Cucumber framework, and apply Page Object Model design pattern in a structured learning environment.

---

## 🎯 Key Features

- ✅ **BDD with Cucumber**: Gherkin syntax for readable test scenarios
- ✅ **Page Object Model**: Maintainable UI test structure
- ✅ **Selenium WebDriver**: Browser automation
- ✅ **Gradle Build**: Modern dependency management
- ✅ **Clean Architecture**: Separation of concerns

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 11+ | Programming language |
| Gradle | 7.x | Build automation |
| Cucumber | 7.14.0 | BDD framework |
| Selenium | 4.5.0 | Web automation |
| JUnit | 5.9.0 | Test runner |

---

## 📂 Project Structure

```
cucumber-ui-test/
├── src/
│   ├── main/java/
│   │   └── com/example/pages/     # Page Object Model
│   │       ├── LoginPage.java
│   │       └── ...
│   ├── test/
│       ├── java/
│       │   ├── com/example/stepdefinitions/  # Cucumber steps
│       │   └── com/example/runners/          # Test runners
│       └── resources/
│           └── features/                     # Gherkin scenarios
│               └── login.feature
├── build.gradle
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Java 11 or higher
- Gradle 7.x
- Chrome browser

### Installation & Execution

```bash
# Navigate to project
cd 06-cucumber-ui-framework

# Install dependencies
./gradlew clean build

# Run tests
./gradlew test
```

---

## 🧪 Test Scenarios

### Login Feature

```gherkin
Feature: Login Functionality

  Scenario: Successful login with valid credentials
    Given User is on login page
    When User enters valid username and password
    And User clicks the login button
    Then User should be redirected to the dashboard

  Scenario: Unsuccessful login with invalid credentials
    Given User is on login page
    When User enters invalid username or password
    And User clicks the login button
    Then User should see an error message
```

---

## 🏗️ Architecture Highlights

### Page Object Model Example

```java
public class LoginPage {
    private WebDriver driver;
    
    // Locators
    private By usernameField = By.id("username");
    private By passwordField = By.id("password");
    private By loginButton = By.id("login");
    
    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }
    
    // Actions
    public void enterUsername(String username) {
        driver.findElement(usernameField).sendKeys(username);
    }
    
    public void enterPassword(String password) {
        driver.findElement(passwordField).sendKeys(password);
    }
    
    public void clickLogin() {
        driver.findElement(loginButton).click();
    }
}
```

---

## 📊 What This Demonstrates

### Technical Skills
- ✅ Cucumber BDD framework
- ✅ Gherkin scenario writing
- ✅ Selenium WebDriver
- ✅ Page Object Model pattern
- ✅ Java programming
- ✅ Gradle build configuration
- ✅ Step definition implementation

### QA Competencies
- ✅ BDD test design
- ✅ UI test automation
- ✅ Test maintainability
- ✅ Clean code practices
- ✅ Framework architecture
- ✅ Test scenario documentation

---

## 🎓 Key Concepts Demonstrated

1. **Behavior-Driven Development**
   - Business-readable test scenarios
   - Gherkin syntax (Given-When-Then)
   - Collaboration between QA and stakeholders

2. **Page Object Model**
   - Separation of test logic and page elements
   - Reusable page components
   - Maintainable test code

3. **Test Organization**
   - Feature files for scenarios
   - Step definitions for implementation
   - Runners for test execution

---

## 🔗 Related Projects

- [05-web-api-framework](../05-web-api-framework/) - Combined Web + API framework
- [07-final-project-framework](../07-final-project-framework/) - Advanced implementation
- [01-regression-automation](../01-regression-automation/) - Professional automation work

---

## 📌 Portfolio Context

**Timeline**: 2024 (Educational project - Final Project Jayjay)  
**Role**: Personal learning project  
**Status**: ✅ Complete & functional  
**Purpose**: Master Cucumber BDD and Selenium fundamentals

This project represents a focused approach to learning BDD and UI automation, establishing a foundation for more complex frameworks.

---

## 📄 Notes

- Framework uses generic test examples
- All test data is safe for public sharing
- Designed for educational purposes
- Demonstrates core BDD and Selenium concepts

---

**Last Updated**: February 19, 2026  
**Part of**: [Bharata's QA Portfolio](../README.md)
