# API Testing Basics with TestNG

> 📌 **Portfolio Project** | Part of [QA Portfolio - Bharata](../README.md)

---

## 📋 Overview

A foundational API automation framework demonstrating core API testing concepts using Java, TestNG, and Apache HTTP Client.

**Purpose**: Educational project showcasing API testing fundamentals and test automation setup.

---

## 🎯 Key Features

- ✅ TestNG framework integration
- ✅ Apache HTTP Client for REST API calls
- ✅ Gradle build automation
- ✅ Structured test organization
- ✅ XML-based test suite configuration

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
                ├── requests/      # HTTP request utilities
                ├── tests/         # Test cases
                └── utilities/     # Helper classes
```

---

## 🚀 Quick Start

### Prerequisites
- Java 11 or higher
- Gradle 7.x or higher

### Installation & Execution

```bash
# Navigate to project
cd 08-api-testing-basics

# Build project
./gradlew clean build

# Run tests
./gradlew test
```

---

## 🧪 Test Coverage

### Test Types Implemented

1. **Positive Tests**
   - Valid API requests with correct parameters
   - Expected successful responses

2. **Negative Tests**
   - Invalid input handling
   - Wrong data types
   - Missing required fields
   - Expected error responses

3. **Boundary Tests**
   - Edge cases
   - Maximum/minimum values
   - Limit testing

---

## 📝 Configuration

### Gradle Dependencies

```gradle
dependencies {
    // TestNG for test framework
    testImplementation group: 'org.testng', name: 'testng', version: '7.5'
    
    // Apache HTTP Client for API calls
    implementation 'org.apache.httpcomponents:httpclient:4.5.13'
}
```

### TestNG Suite Configuration

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

## 📊 What This Demonstrates

### Technical Skills
- ✅ Java programming
- ✅ HTTP request/response handling
- ✅ TestNG test framework
- ✅ Gradle build configuration
- ✅ Test suite organization

### QA Competencies
- ✅ API testing fundamentals
- ✅ Test case design (positive, negative, boundary)
- ✅ Test automation setup
- ✅ Build tool integration
- ✅ Project structure best practices

---

## 🎓 Learning Outcomes

This project demonstrates understanding of:
- REST API testing concepts
- Test framework configuration
- Build automation with Gradle
- Test organization and structure
- HTTP client usage in Java

---

## 🔗 Related Projects

For more advanced implementations, see:
- [05-web-api-framework](../05-web-api-framework/) - Comprehensive Web + API framework
- [07-final-project-framework](../07-final-project-framework/) - Advanced automation framework

---

## 📌 Portfolio Context

**Timeline**: Early learning project (2022)  
**Role**: Personal project for skill development  
**Status**: ✅ Educational reference  
**Package**: `org.bharata` (personal namespace)

This project represents foundational API testing knowledge that evolved into more sophisticated frameworks in later projects.

---

**Last Updated**: February 19, 2026  
**Part of**: [Bharata's QA Portfolio](../README.md)
