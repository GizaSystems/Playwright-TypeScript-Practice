import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { FooterPage } from '../pages/FooterPage'
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import * as fs from 'fs';

let context: BrowserContext;
let page: Page;

let homePage: HomePage;
let footerPage: FooterPage;
let cartPage: CartPage;

let testData: any;

test.describe('Automation Exercise Add Recommended Item Testcases', () => {

  test('Test Case 22: Verify User Can Add Recommended Item Successfully', async () => {
    allure.feature('Automation Exercise Add Recommended Item Testcases');
    allure.tms('137183432');
    await homePage.navigate();
    await footerPage.scrollToFooter();
    await footerPage.verifySubscriptionText();
    await homePage.verifyRecommendedItemTextVisible();
    await homePage.addRecommendItemToCart();
    await homePage.clickViewCart();
    await cartPage.assertRecommendedItemAdded(testData.recommendedProductName);

  });

  test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/AddRecommendedItemJasonFile.json', 'utf8'));
  });

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    homePage = new HomePage(page);
    footerPage = new FooterPage(page);
    cartPage = new CartPage(page);
  });

  test.afterEach(async () => {
    await context.close();
  });
});