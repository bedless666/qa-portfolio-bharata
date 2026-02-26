# Java Gradle API Testing Setup

> 📌 **Portfolio Project** | Part of [QA Portfolio - Bharata](../README.md)

---

## 📋 Overview

A foundational API automation framework built with Java, TestNG, and Apache HTTP Client. This project demonstrates basic API testing setup and configuration for REST API automation.

**Purpose**: Educational project showcasing API testing fundamentals and Gradle build configuration.

---

## 🎓 Project Context

> **Learning Project Notice**  
> This project was developed as part of a professional QA bootcamp training program to establish foundational API testing skills. While it demonstrates understanding of core concepts and proper project setup, it represents early-stage educational work rather than production implementation from professional employment.
> 
> **Value Proposition**: Showcases ability to learn API testing fundamentals, configure build tools (Gradle), integrate testing frameworks (TestNG), and establish proper project structure in a structured learning environment. This foundation enabled development of more advanced frameworks shown in other portfolio projects.

---

## 🎯 Key Features

- ✅ TestNG test framework integration
- ✅ Apache HTTP Client for API requests
- ✅ Gradle build automation
- ✅ Test suite configuration with `testng.xml`
- ✅ Clean project structure

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 11+ | Programming language |
| Gradle | 7.x | Build tool |
| TestNG | 7.5 | Test framework |
| Apache HTTP Client | 4.5.13 | HTTP request handling |

---

## 📂 Project Structure

```
src/
└── test/
    └── java/
        └── com/
            └── example/
                ├── requests/      # HTTP request helpers
                ├── tests/         # Test cases
                └── utilities/     # Utility classes
```

---

## 🚀 Quick Start

### Prerequisites
- Java 11 or higher
- Gradle 7.x

### Installation

```bash
# Clone or download this project
cd 09-java-gradle-setup

# Build and run tests
./gradlew clean build test
```

---

## 📝 Test Configuration

The framework uses `testng.xml` for test suite configuration:

```xml
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd">
<suite name="API Test Suite">
    <test name="API Tests">
        <classes>
            <class name="com.example.tests.APITest"/>
        </classes>
    </test>
</suite>
```

---

## 🧪 Test Types Covered

1. **Positive Tests**: Valid input scenarios
2. **Negative Tests**: Invalid input handling
3. **Boundary Tests**: Edge cases and limits

---

## 📊 What This Demonstrates

### Technical Skills
- ✅ Java programming fundamentals
- ✅ Gradle build configuration
- ✅ TestNG framework setup
- ✅ HTTP client integration
- ✅ Test structure organization

### QA Competencies
- ✅ Test framework design
- ✅ Build automation setup
- ✅ Dependency management
- ✅ Test configuration
- ✅ Project organization

---

## 🔗 Related Projects

This is a foundational project. For more advanced implementations, see:
- [05-web-api-framework](../05-web-api-framework/) - Full Web + API framework
- [08-api-testing-basics](../08-api-testing-basics/) - Similar API testing approach

---

## 📌 Portfolio Context

**Timeline**: Early learning project (2022)  
**Role**: Personal project for skill development  
**Status**: ✅ Educational reference

This project represents foundational API testing skills that evolved into more comprehensive frameworks shown in other portfolio projects.

---

**Last Updated**: February 19, 2026  
**Part of**: [Bharata's QA Portfolio](../README.md)
