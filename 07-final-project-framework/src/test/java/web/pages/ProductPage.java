package web.pages;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class ProductPage {
    private WebDriver driver;
    private WebDriverWait wait;

    private By productList = By.xpath("//a[contains(@class,'hrefch')]");
    private By addToCartButton = By.xpath("//a[contains(text(),'Add to cart')]");

    public ProductPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void openProductPage(String productName) {
        List<WebElement> products = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(productList));

        products.stream()
                .filter(product -> product.getText().equalsIgnoreCase(productName))
                .findFirst()
                .ifPresent(product -> {
                    scrollToElement(product);
                    product.click();
                    wait.until(ExpectedConditions.visibilityOfElementLocated(addToCartButton));
                });
    }

    public void addToCart() {
        WebElement addButton = wait.until(ExpectedConditions.elementToBeClickable(addToCartButton));
        scrollToElement(addButton);
        addButton.click();
    }

    private void scrollToElement(WebElement element) {
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
    }

    public void openFirstProduct() {
        WebElement firstProduct = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(productList)).get(0);
        scrollToElement(firstProduct);
        firstProduct.click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(addToCartButton));
    }

    public void acceptAlertIfExists() {
        try {
            wait.until(ExpectedConditions.alertIsPresent()).accept();
        } catch (TimeoutException ignored) {
        }
    }


}
