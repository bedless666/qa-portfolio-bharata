package com.example.stepdefinitions;

import io.cucumber.java.en.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import com.example.pages.LoginPage;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginSteps {
    WebDriver driver;
    LoginPage loginPage;

    @Given("User is on login page")
    public void user_is_on_login_page() {
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver"); // Sesuaikan path
        driver = new ChromeDriver();
        driver.get("https://example.com/login"); // Sesuaikan URL login
        loginPage = new LoginPage(driver);
    }

    @When("User enters valid username and password")
    public void user_enters_valid_username_and_password() {
        loginPage.enterUsername("validUser");
        loginPage.enterPassword("validPass");
    }

    @When("User enters invalid username or password")
    public void user_enters_invalid_username_or_password() {
        loginPage.enterUsername("invalidUser");
        loginPage.enterPassword("invalidPass");
    }

    @When("User clicks the login button")
    public void user_clicks_the_login_button() {
        loginPage.clickLoginButton();
    }

    @Then("User should be redirected to the dashboard")
    public void user_should_be_redirected_to_the_dashboard() {
        assertTrue(driver.getCurrentUrl().contains("dashboard"));
        driver.quit();
    }

    @Then("User should see an error message")
    public void user_should_see_an_error_message() {
        // Implementasi pengecekan pesan error
        driver.quit();
    }
}
