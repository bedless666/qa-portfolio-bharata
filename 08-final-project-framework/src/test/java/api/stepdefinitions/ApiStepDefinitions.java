package api.stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.restassured.response.Response;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class ApiStepDefinitions {

    private String baseUrl = "https://jsonplaceholder.typicode.com/users";
    private Response response;

    @Given("user has access to the API")
    public void user_has_access_to_the_API() {
        System.out.println("Using public API, no API key required.");
    }

    @When("user sends a request to get user with ID {string}")
    public void user_sends_request_to_get_user(String userId) {
        response = given()
                .when()
                .get(baseUrl + "/" + userId);
    }

    @When("user sends a request to get all users")
    public void user_sends_request_to_get_all_users() {
        response = given()
                .when()
                .get(baseUrl);
    }

    @When("user sends a POST request to create a new user")
    public void user_sends_post_request_to_create_new_user() {
        response = given()
                .header("Content-Type", "application/json")
                .body("{ \"name\": \"New User\", \"email\": \"newuser@example.com\" }")
                .when()
                .post(baseUrl);
    }

    @When("user sends a DELETE request to remove user with ID {string}")
    public void user_sends_delete_request_to_remove_user(String userId) {
        response = given()
                .when()
                .delete(baseUrl + "/" + userId);
    }

    @Then("the response status should be {int}")
    public void the_response_status_should_be(Integer statusCode) {
        response.then().statusCode(statusCode);
    }
}
