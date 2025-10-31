import {BeforeAll, AfterAll, AfterStep, After, Before, BeforeStep, Status} from "@cucumber/cucumber";
import { chromium, type Browser, type Page, type BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture.ts";
import logger from '../logger.ts';

let browser: Browser;
let page: Page;
let context: BrowserContext;

BeforeAll(async function(){
    browser = await chromium.launch({headless: false});
    context = await browser.newContext();
    page = await context.newPage();
    pageFixture.context = context;
    pageFixture.page = page;
    pageFixture.report = '';
});


Before(async function (scenario) {
  logger.info(`<strong> <p style="color:green;">Starting scenario: ${scenario.pickle.name}</strong></p>`);
});


BeforeStep(async function (stepResult) {
  const stepText = stepResult.pickleStep.text;
    logger.info(`<p style="color:green;">Starting Step: ${stepText}</p>`);
})

AfterStep(async function ({ result }) {

    if (result.status === Status.FAILED) {
        await pageFixture.page.screenshot({ path: 'screenshots/screenshot1.png' });
    }
});

After(async function (scenario) {
    
    if (scenario.result?.status === 'FAILED') {
        logger.error(`Scenario failed: ${scenario.pickle.name}`);
    } else {
        logger.info(`Scenario passed: ${scenario.pickle.name}`);
    }

    const screenshot = await pageFixture.page.screenshot({ path: `screenshots/${scenario.pickle.name}.png`, fullPage: true });
    await pageFixture.page.close();
    this.attach(screenshot, 'image/png');
    this.attach(pageFixture.report);
    await pageFixture.context?.close();
});

AfterAll(async function() {
    await browser.close();
});