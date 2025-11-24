import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { FooterPage } from '../pages/FooterPage'
import { HomePage } from '../pages/HomePage';
import * as fs from 'fs';

let context: BrowserContext;
let page: Page;

let homePage: HomePage;
let footerPage: FooterPage;

let testData: any;

test.describe('Automation Exercise Scroll Up Test Cases', () => {

  test('Test Case 25: Verify Scroll Up with "Arrow" button and Scroll Down functionality', async () => {
    allure.feature('Automation Exercise Scroll Up Test Cases');
    allure.tms('137183479');

    await homePage.navigate();
    await footerPage.scrollToFooter();
    await footerPage.verifySubscriptionText();
    await footerPage.clickArrowScrollToHeader();
    await homePage.verifyFullFledgedTextVisible(testData.homePage_Text);
  });

  test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/ScrollUpWithArrowJsonFile.json', 'utf8'));
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