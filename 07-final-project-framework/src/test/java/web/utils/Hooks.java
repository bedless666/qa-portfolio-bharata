package web.utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import io.github.bonigarcia.wdm.WebDriverManager;
import io.cucumber.java.Before;
import io.cucumber.java.After;
import java.time.Duration;

public class Hooks {
    private static WebDriver driver;

    @Before
    public void setUp() {
        if (driver == null) {
            try {
                System.out.println("🔧 Setting up ChromeDriver using WebDriverManager...");
                WebDriverManager.chromedriver().setup();  // WebDriverManager menangani versi ChromeDriver

                ChromeOptions options = new ChromeOptions();
                options.addArguments("--headless"); // Mode headless untuk CI/CD
                options.addArguments("--disable-gpu");
                options.addArguments("--no-sandbox");
                options.addArguments("--disable-dev-shm-usage");

                driver = new ChromeDriver(options);
                driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

                System.out.println("✅ ChromeDriver successfully initialized.");
            } catch (Exception e) {
                System.err.println("❌ Error initializing WebDriver: " + e.getMessage());
                throw new RuntimeException("Failed to initialize WebDriver", e);
            }
        }
    }

    @After
    public void tearDown() {
        if (driver != null) {
            System.out.println("🛑 Closing WebDriver...");
            driver.quit();
            driver = null;
        }
    }

    public static WebDriver getDriver() {
        if (driver == null) {
            throw new IllegalStateException("❌ WebDriver not initialized. Ensure @Before in Hooks.java is executed.");
        }
        return driver;
    }
}
