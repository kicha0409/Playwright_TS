Feature: Verify adding a product to the cart and compare the product details on PDP and cart page
  
  @VerifyCart @Regression @Smoke
  Scenario: Add an item to cart page and verify whether the details are matching in the cart page as expected 
    Given Launch the application
    When the customer enters an item to search 'shirt'
    Then verify the search result is displayed
    And open the first '2' items from the results page
    When the customer navigates to cart page
    Then verify the items on cart page
    