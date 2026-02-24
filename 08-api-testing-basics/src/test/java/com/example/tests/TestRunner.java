package com.example.tests;

import org.testng.TestNG;
import org.testng.collections.Lists;

import java.util.List;

public class TestRunner {

    public static void main(String[] args) {
        TestNG testng = new TestNG();
        List<String> suites = Lists.newArrayList();
        suites.add("testng.xml"); // assuming testng.xml file exists with test suite configuration
        testng.setTestSuites(suites);
        testng.run();
    }
}
