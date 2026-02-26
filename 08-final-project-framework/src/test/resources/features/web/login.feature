@web
Feature: User Login on DemoBlaze

  Scenario: Successful login
    Given user is on the login page
    When user enters username "demo_user" and password "demo_pass123"
    And user clicks the login button
    Then user should be redirected to the homepage

  Scenario: Login with incorrect credentials (Negative Test)
    Given user is on the login page
    When user enters username "wronguser" and password "wrongpass"
    And user clicks the login button
    Then an error message should be displayed

   Scenario: End-to-end login and complete checkout
       Given user is on the login page
       When user enters username "demo_user" and password "demo_pass123"
       And user clicks the login button
       Then user should be redirected to the homepage
       When user adds an item to the cart
       And user navigates to the cart page
       Then the cart page should be displayed
       When user proceeds to checkout
       And user enters payment details and confirms purchase
       Then user should see a confirmation message

  Scenario: Logout after login
    Given user is logged in
    When user clicks logout
    Then user should be logged out

  Scenario: Attempt login without entering credentials
    Given user is on the login page
    When user clicks the login button
    Then an error message should be displayed
