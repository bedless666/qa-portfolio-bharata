package web.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class CartPage {
    private WebDriver driver;
    private WebDriverWait wait;

    private By cartButton = By.id("cartur");
    private By placeOrderButton = By.xpath("//button[contains(text(),'Place Order')]");
    private By nameField = By.id("name");
    private By countryField = By.id("country");
    private By creditCardField = By.id("card");
    private By purchaseButton = By.xpath("//button[contains(text(),'Purchase')]");
    private By confirmationMessage = By.xpath("//h2[contains(text(),'Thank you for your purchase!')]");
    private By cartItems = By.xpath("//tbody/tr/td[2]"); // Locator untuk nama produk dalam cart

    public boolean isConfirmationMessageDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(confirmationMessage)).isDisplayed();
    }


    public CartPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void openCartPage() {
        wait.until(ExpectedConditions.elementToBeClickable(cartButton)).click();
        wait.until(ExpectedConditions.urlContains("cart.html"));
    }

    public boolean isCartPageDisplayed() {
        return wait.until(ExpectedConditions.urlContains("cart.html"));
    }

    public void clickPlaceOrder() {
        wait.until(ExpectedConditions.elementToBeClickable(placeOrderButton)).click();
    }

    public void enterCheckoutDetails(String name, String country, String card) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(nameField)).sendKeys(name);
        wait.until(ExpectedConditions.visibilityOfElementLocated(countryField)).sendKeys(country);
        wait.until(ExpectedConditions.visibilityOfElementLocated(creditCardField)).sendKeys(card);
    }


    public void confirmPurchase() {
        wait.until(ExpectedConditions.elementToBeClickable(purchaseButton)).click();
    }

    public boolean isConfirmationDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(confirmationMessage)).isDisplayed();
    }

    public boolean isItemInCart(String itemName) {
        List<WebElement> items = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(cartItems));
        return items.stream().anyMatch(item -> item.getText().equalsIgnoreCase(itemName));
    }

    public String getConfirmationText() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(confirmationMessage)).getText();
    }


}
