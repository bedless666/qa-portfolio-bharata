package stepdefinitions.web;

import io.cucumber.java.en.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.chrome.ChromeOptions;


public class LoginSteps {
    WebDriver driver;

    @Given("User is on the login page")
    public void userIsOnLoginPage() {
        WebDriverManager.chromedriver().setup(); // Download ChromeDriver otomatis

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless"); // Jalankan tanpa UI (opsional)
        options.addArguments("--disable-gpu");
        options.addArguments("--no-sandbox");

        driver = new ChromeDriver(options);
        driver.get("https://www.demoblaze.com");
    }


    @When("User enters valid username and password")
    public void userEntersValidCredentials() {
        driver.findElement(By.id("loginusername")).sendKeys("testuser");
        driver.findElement(By.id("loginpassword")).sendKeys("password123");
    }

    @And("User clicks on login button")
    public void userClicksLoginButton() {
        driver.findElement(By.xpath("//button[contains(text(),'Log in')]")).click();
    }

    @Then("User should be redirected to homepage")
    public void userRedirectedToHomepage() {
        WebElement logoutButton = driver.findElement(By.id("logout2"));
        assert logoutButton.isDisplayed();
        driver.quit();
    }
}
