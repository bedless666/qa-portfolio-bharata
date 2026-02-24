package stepdefinitions.api;

import io.cucumber.java.en.*;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import static org.hamcrest.Matchers.*;

public class GetUserSteps {
    Response response;

    @Given("API endpoint for user exists")
    public void apiEndpointExists() {
        RestAssured.baseURI = "https://dummyapi.io/data/v1/user/";
    }

    @When("I send a GET request to fetch user")
    public void sendGetRequest() {
        response = RestAssured.given()
                .header("app-id", "YOUR_APP_ID")
                .when()
                .get("60d0fe4f5311236168a109ca");
    }

    @Then("The response should contain user details")
    public void the_response_should_contain_user_details() {
        System.out.println("Response Status Code: " + response.getStatusCode());
        System.out.println("Response Body: " + response.getBody().asString());

        response.then()
                .statusCode(200)
                .body("id", notNullValue()) // Pastikan ID user ada
                .body("firstName", notNullValue()) // Validasi tambahan
                .body("lastName", notNullValue());
    }

}
