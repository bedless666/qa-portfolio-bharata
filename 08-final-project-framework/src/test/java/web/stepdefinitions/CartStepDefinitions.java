package web.stepdefinitions;

import io.cucumber.java.en.*;
import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import web.pages.CartPage;
import web.pages.ProductPage;
import web.utils.Hooks;

public class CartStepDefinitions {
    private WebDriver driver;
    private CartPage cartPage;
    private ProductPage productPage;

    public CartStepDefinitions() {
        this.driver = Hooks.getDriver();
        this.cartPage = new CartPage(driver);
        this.productPage = new ProductPage(driver);
    }

    @When("user adds an item to the cart")
    public void user_adds_item_to_cart() {
        productPage.openFirstProduct();
        productPage.addToCart();
        productPage.acceptAlertIfExists();
    }

    @When("user navigates to the cart page")
    public void user_navigates_to_cart_page() {
        cartPage.openCartPage();
    }

    @Then("the cart page should be displayed")
    public void cart_page_should_be_displayed() {
        Assert.assertTrue("Cart page is not displayed", cartPage.isCartPageDisplayed());
    }

    @When("user proceeds to checkout")
    public void user_proceeds_to_checkout() {
        cartPage.clickPlaceOrder();
    }

    @When("user enters payment details and confirms purchase")
    public void user_enters_payment_details_and_confirms() {
        cartPage.enterCheckoutDetails("Test User", "Indonesia", "1234567890");
        cartPage.confirmPurchase();
    }

    @Then("user should see a confirmation message")
    public void user_should_see_confirmation_message() {
        Assert.assertTrue("Confirmation message is not displayed", cartPage.isConfirmationMessageDisplayed());
    }
}
