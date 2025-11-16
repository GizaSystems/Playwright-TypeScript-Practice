import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { HomePage } from '../pages/HomePage';
import { FooterPage } from '../pages/FooterPage';
import * as fs from 'fs';

let context: BrowserContext;
let page: Page;
let homePage: HomePage;
let footerPage: FooterPage;
let testData: any;
const timestamp = new Date().toISOString().replace(/[-T:.]/g, "").slice(0, 17);

test.describe('Verify Email Subscription Functionality From Home Page', () => {
  test('User can subscribe to the newsletter from the home page', async () => {
    allure.feature('Automation Exercise Home Page Subscription');
    allure.tms('137183189');
    const randomEmail = testData.emailAddress + timestamp + '@test.com';

    await homePage.navigate();
    await homePage.verifyHomePageVisible(testData.urls.homePage, testData.pageTitles.homePage);
    await footerPage.scrollToFooter();
    await footerPage.verifySubscriptionText();
    await footerPage.subscribeWithEmail(randomEmail);
    await footerPage.verifySuccessMessage(testData.successMessage);
  });

   test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/SubscriptionTestData.json', 'utf8'));
   });

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    homePage = new HomePage(page);
    footerPage = new FooterPage(page);
  });

  test.afterEach(async () => {
    await context.close();
  });
});
