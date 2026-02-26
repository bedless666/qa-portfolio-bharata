@api
Feature: API Testing with JSONPlaceholder

  Scenario: Get user by valid ID
    Given user has access to the API
    When user sends a request to get user with ID "1"
    Then the response status should be 200

  Scenario: Get user by invalid ID (Negative Test)
    Given user has access to the API
    When user sends a request to get user with ID "99999"
    Then the response status should be 404

  Scenario: Get all users
    Given user has access to the API
    When user sends a request to get all users
    Then the response status should be 200

  Scenario: Create a new user
    Given user has access to the API
    When user sends a POST request to create a new user
    Then the response status should be 201

  Scenario: Delete a user
    Given user has access to the API
    When user sends a DELETE request to remove user with ID "1"
    Then the response status should be 200
