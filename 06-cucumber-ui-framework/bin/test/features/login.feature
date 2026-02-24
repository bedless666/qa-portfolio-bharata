Feature: Login

  Scenario: Successful login with valid credentials
    Given User is on login page
    When User enters valid username and password
    And User clicks the login button
    Then User should be redirected to the dashboard

  Scenario: Unsuccessful login with invalid credentials
    Given User is on login page
    When User enters invalid username or password
    And User clicks the login button
    Then User should see an error message
