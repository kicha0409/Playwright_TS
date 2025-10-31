import { Given, When, Then} from '@cucumber/cucumber';
import { AddItem } from '../pageObjects/add-items.page.ts';

const addItem = new AddItem();

Given('Launch the application', { timeout: 100 * 1000 }, async function () {
    await addItem.launchApplication();
   
});

When('the customer enters an item to search {string}', { timeout: 100 * 1000 }, async function (searchString) {
    await addItem.enterSearchString(searchString);
});

Then('verify the search result is displayed', { timeout: 100 * 1000 }, async function () {
    await addItem.verifyResultsPage();
});

Then('open the first {string} items from the results page', { timeout: 100 * 1000 }, async function (itemCount) {
    await addItem.openResults(itemCount);
});

When('the customer navigates to cart page', { timeout: 100 * 1000 }, async function () {
    await addItem.navigateToCartPage();
});

Then('verify the items on cart page', { timeout: 100 * 1000 }, async function () {
    await addItem.verifyItemsOnCartPage();
});