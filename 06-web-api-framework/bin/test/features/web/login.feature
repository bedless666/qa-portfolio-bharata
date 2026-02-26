Feature: Login Functionality

  @web
  Scenario: User login with valid credentials
    Given User is on the login page
    When User enters valid username and password
    And User clicks on login button
    Then User should be redirected to homepage
