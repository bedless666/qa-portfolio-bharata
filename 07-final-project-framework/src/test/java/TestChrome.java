import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;

public class TestChrome {
    public static void main(String[] args) {
        try {
            System.out.println("🔄 Menginisialisasi ChromeDriver...");

            // Setup WebDriverManager untuk mengelola ChromeDriver
            WebDriverManager.chromedriver().setup();

            // Inisialisasi WebDriver
            WebDriver driver = new ChromeDriver();

            // Buka Google.com
            driver.get("https://www.google.com");

            System.out.println("✅ ChromeDriver berhasil dijalankan dan membuka Google.");

            // Tunggu 5 detik agar bisa melihat hasilnya
            Thread.sleep(5000);

            // Tutup browser
            driver.quit();
            System.out.println("🚪 WebDriver ditutup.");
        } catch (Exception e) {
            System.err.println("❌ Gagal menjalankan ChromeDriver: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
