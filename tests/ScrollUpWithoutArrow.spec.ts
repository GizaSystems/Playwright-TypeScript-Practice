import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { FooterPage } from '../pages/FooterPage'
import { HeaderPage } from '../pages/HeaderPage';
import { HomePage } from '../pages/HomePage';
import * as fs from 'fs';

let context: BrowserContext;
let page: Page;

let headerPage: HeaderPage;
let homePage: HomePage;
let footerPage: FooterPage;

let testData: any;

test.describe('Automation Exercise Scroll Up Test Cases', () => {

  test('Test Case 26: Verify Scroll Up without "Arrow" button and Scroll Down functionality', async () => {
    allure.feature('Automation Exercise Scroll Up Test Cases');
    allure.tms('137183503');

    await homePage.navigate();
    await footerPage.scrollToFooter();
    await footerPage.verifySubscriptionText();
    await headerPage.scrollToHeader();
    await homePage.verifyFullFledgedTextVisible(testData.homePage_Text);
  });

  test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/ScrollUpWithoutArrowJsonFile.json', 'utf8'));
  });

  test.beforeEach(async ({ request, browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    homePage = new HomePage(page);
    headerPage = new HeaderPage(page);
    footerPage = new FooterPage(page);
  });

  test.afterEach(async () => {
    await context.close();
  });
});