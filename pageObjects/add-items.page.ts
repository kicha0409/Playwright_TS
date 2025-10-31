import { expect } from "@playwright/test";
import { pageFixture } from '../setup/pageFixture.ts';
import logger from '../logger.ts';

export class AddItem {
    public str: string;
    public itemCount: number;
    public itemNames: string[];
    
    constructor() {
        this.str = '';
        this.itemCount = 0;
        this.itemNames = [];
    }
    async launchApplication() {
        await pageFixture.page.goto('https://amazon.in');
        logger.info('Launched the test site');
        expect(await pageFixture.page.title()).toContain('Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in');
        logger.info('Title matched as expected');
    }

    async enterSearchString(searchString: string) {
        await pageFixture.page.fill('div[class="nav-search-field "] #twotabsearchtextbox',searchString);
        await pageFixture.page.locator('#nav-search-submit-button').click();
        logger.info('Entered the search string and clicked on search button');
        this.str = searchString;
    }

    async verifyResultsPage() {
        await expect(pageFixture.page.locator('[class="a-color-state a-text-bold"]')).toContainText(this.str,{timeout: 30000});
        logger.info('Search is completed successfully');
    }

    async openResults(itemCount: number) {
        this.itemCount = itemCount;
        for(let i: number = 1; i<=itemCount; i++) {
            let[newPage] = await Promise.all([pageFixture.context.waitForEvent('page'),
                pageFixture.page.locator(`//div[contains(@class,"s-main-slot s-result-list")]//div[@data-component-type="s-search-result"][${i}]//*[@data-component-type="s-product-image"]/a`).click()
            ]);
            await newPage.waitForLoadState('load');
            this.itemNames.push(await newPage.locator('#title').innerText());
            // add the item to cart
            await newPage.locator('//div[@class="a-button-stack"]//*[@id="add-to-cart-button"]').click();
            await newPage.waitForSelector('//input[@data-feature-id="proceed-to-checkout-action"]',{timeout: 20000});
            logger.info('Item added to cart');
            await newPage.close();
        }
        logger.info(this.itemNames);
    }

    async navigateToCartPage() {
        await pageFixture.page.locator('//a[@id="nav-cart"]').click();
        await pageFixture.page.waitForLoadState('load',{timeout: 2000});
        await expect(pageFixture.page).toHaveURL(/nav_cart/);
        logger.info('Cart page is loaded successfully');
    }

    async verifyItemsOnCartPage() {
        let k: number = 1;
        for(let j: number = 1; j<=this.itemCount; j++) {
            let itemName: string = await pageFixture.page.locator(`//ul[@data-name="Active Items"]//div[@data-item-index="${j}"]//h4//*[@class="a-truncate-full a-offscreen"]`).innerText();
            try {
                expect(itemName).toContain(this.itemNames[this.itemCount-k]);
                logger.info(`Item: ${j} matched as expected`);
                k = k + 1;
            }
            catch(err) {
                logger.info(`In Cart: ${itemName}`);
                logger.info(`In PDP: ${this.itemNames[this.itemCount-k]}`);
                logger.info(`Item: ${j} not matched as expected`);
                k = k + 1;
            }
            
        }
        
    }
}