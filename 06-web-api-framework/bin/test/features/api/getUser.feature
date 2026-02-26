Feature: Get User API

  @api
  Scenario: Get user by ID
    Given API endpoint for user exists
    When I send a GET request to fetch user
    Then The response should contain user details
