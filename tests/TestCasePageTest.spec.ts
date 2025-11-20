import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { HeaderPage } from '../pages/HeaderPage';
import { HomePage } from '../pages/HomePage';
import * as fs from 'fs';
import { TestCasePage } from '../pages/TestCasesPage';

let context: BrowserContext;
let page: Page;
let homePage: HomePage;
let headerPage: HeaderPage;
let testcasesPage: TestCasePage;
let testData: any;

const timestamp = new Date().toISOString().replace(/[-T:.]/g, "").slice(0, 17);

test.describe('Automation Exercise Login Test Cases', () => {

    test('Test Case 1: Verify Test Cases Page', async () => {
        allure.feature('Automation Exercise Test Case Page');
        allure.tms('137183129');
        // allure.issue('#link');
        await homePage.navigate();
        await homePage.verifyHomePageVisible(testData.homePageTitle);
        await headerPage.clickOnTestCasesLink();
        await testcasesPage.assertTextTestCasesIsVisiable(testData.testCasesPageTitle);
        await testcasesPage.assertTestCasesPageIsOpen();
    });

    test.beforeAll(async () => {
        testData = JSON.parse(fs.readFileSync('./resources/test-data/TestCasePageTestJsonFile.json', 'utf8'));
    });

    test.beforeEach(async ({ request, browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        homePage = new HomePage(page);
        headerPage = new HeaderPage(page);
        testcasesPage = new TestCasePage(page);
    });

    test.afterEach(async () => {
        await context.close();
    });

});