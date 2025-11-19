import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { HomePage } from '../pages/HomePage';
import { FooterPage } from '../pages/FooterPage';
import * as fs from 'fs';
import { HeaderPage } from '../pages/HeaderPage';
import { CartPage } from '../pages/CartPage';

let context: BrowserContext;
let page: Page;
let homePage: HomePage;
let headerPage: HeaderPage;
let cartPage: CartPage;
let footerPage: FooterPage;
let testData: any;
const timestamp = new Date().toISOString().replace(/[-T:.]/g, "").slice(0, 17);

test.describe('Verify Email Subscription Functionality', () => {
  test('User can subscribe to the newsletter from the home page', async () => {
    allure.feature('Automation Exercise Home Page Subscription');
    allure.tms('137183189');
    const uniqueEmailHomePage = testData.emailAddress + timestamp + '@test.com';

    await homePage.navigate();
    await homePage.verifyHomePageVisible(testData.pagesTitle.homePageTitle);
    await footerPage.scrollToFooter();
    await footerPage.verifySubscriptionText();
    await footerPage.subscribeWithEmail(uniqueEmailHomePage);
    await footerPage.verifySuccessMessage(testData.successMessage);
  });


  test('User can subscribe from the cart page', async () => {
    allure.feature('Email Subscription - Cart Page');
    allure.tms('137183231');

    const uniqueEmailCartPage = testData.emailAddress + timestamp + '@test2.com';

    await homePage.navigate();
    await headerPage.clickOnCartLink(); 
    await cartPage.assertCartPageLoaded(testData.pagesTitle.shoppingCart);
    await footerPage.scrollToFooter();
    await footerPage.verifySubscriptionText();
    await footerPage.subscribeWithEmail(uniqueEmailCartPage);
    await footerPage.verifySuccessMessage(testData.successMessage);
  });

   test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/SubscriptionTestData.json', 'utf8'));
   });

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    homePage = new HomePage(page);
    headerPage = new HeaderPage(page);
    cartPage = new CartPage(page);
    footerPage = new FooterPage(page);
  });

  test.afterEach(async () => {
    await context.close();
  });
});
