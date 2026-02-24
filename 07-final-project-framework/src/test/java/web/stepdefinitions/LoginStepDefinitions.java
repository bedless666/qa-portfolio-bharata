package web.stepdefinitions;

import io.cucumber.java.en.*;
import org.junit.Assert;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import web.pages.LoginPage;
import web.utils.Hooks;

import java.time.Duration;

import static org.junit.Assert.assertTrue;

public class LoginStepDefinitions {
    private WebDriver driver;
    private LoginPage loginPage;

    public LoginStepDefinitions() {
        this.driver = Hooks.getDriver();
        this.loginPage = new LoginPage(driver);
    }

    @Given("user is on the login page")
    public void user_is_on_the_login_page() {
        driver.get("https://www.demoblaze.com");
        loginPage.openLoginModal();
    }

    @When("user enters username {string} and password {string}")
    public void user_enters_credentials(String username, String password) {
        loginPage.enterUsername(username);
        loginPage.enterPassword(password);
    }

    @When("user clicks the login button")
    public void user_clicks_login_button() {
        handleUnexpectedAlert(); // Tambahan untuk menangani alert sebelum klik
        loginPage.clickLogin();
    }

    @Then("user should be redirected to the homepage")
    public void user_should_be_redirected_to_homepage() {
        Assert.assertTrue("User was not redirected to the homepage", loginPage.isUserLoggedIn());
    }

    @Then("an error message should be displayed")
    public void error_message_should_be_displayed() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        try {
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            String errorMessage = alert.getText();
            alert.accept(); // Tutup alert setelah ditangkap

            // Validasi pesan error yang mungkin muncul
            assertTrue("Unexpected error message: " + errorMessage,
                    errorMessage.contains("Wrong password.") ||
                            errorMessage.contains("User does not exist.") ||
                            errorMessage.contains("Please fill out Username and Password."));
        } catch (TimeoutException e) {
            // Tambahkan fallback untuk mengecek elemen error di halaman
            if (!loginPage.isErrorMessageDisplayed()) {
                Assert.fail("No alert or error message displayed after incorrect login");
            }
        }
    }

    @Given("user is logged in")
    public void user_is_logged_in() {
        user_is_on_the_login_page();
        user_enters_credentials("demo_user", "demo_pass123");
        user_clicks_login_button();
        Assert.assertTrue("Login failed, username not displayed.", loginPage.isUserLoggedIn());
    }

    @When("user clicks logout")
    public void user_clicks_logout() {
        loginPage.clickLogout();
    }

    @Then("user should be logged out")
    public void user_should_be_logged_out() {
        Assert.assertTrue("Logout failed, login button not visible", loginPage.isLoginButtonVisible());
    }

    @When("user clicks the login button without entering credentials")
    public void user_clicks_login_without_credentials() {
        handleUnexpectedAlert(); // Tambahan untuk menangani alert sebelum klik
        loginPage.clickLogin();
    }

    // Menangani alert tak terduga agar test tidak gagal
    private void handleUnexpectedAlert() {
        try {
            Alert alert = driver.switchTo().alert();
            System.out.println("Unexpected alert detected: " + alert.getText());
            alert.accept();
        } catch (NoAlertPresentException ignored) {
        }
    }
}
