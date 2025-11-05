import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { HomePage } from '../pages/HomePage';
import * as fs from 'fs';
import * as path from 'path';

let context: BrowserContext;
let page: Page;
let homePage: HomePage;
let testData: any;
const timestamp = new Date().toISOString().replace(/[-T:.]/g, "").slice(0, 17);


test.describe('Automation Exercise Home Page Subscription Test Cases', () => {

  test('Test Case 10: Verify Subscription in home page', async () => {
    allure.feature('Automation Exercise Home Page Subscription');
    allure.tms('137183030');
    // allure.issue('#link');

    
    // Step 1: Navigate to home
    await homePage.navigate();

    // Step 2: Verify home page is visible
    await homePage.verifyHomePageVisible();

    // Step 3: Scroll down to footer
    await homePage.scrollToFooter();

    // Step 4: Verify "SUBSCRIPTION" text is visible
    await homePage.verifySubscriptionText();

    // Step 5: Enter email & click button
    const randomEmail = testData.emailAddress + timestamp + '@test.com';
    await homePage.subscribeWithEmail(randomEmail);

    // Step 6: Verify success message
    await homePage.verifySuccessMessage();
  });

   test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync(path.join(__dirname, '../resources/test-data/LoginTestJsonFile.json'), 'utf8'));
   });

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    homePage = new HomePage(page);
  });

  test.afterEach(async () => {
    await context.close();
  });
});
