import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/LoginPage'
import { HeaderPage } from '../pages/HeaderPage';
import { HomePage } from '../pages/HomePage';
import { ApisUserManagement } from '../apis/ApisUserManagement';
import * as fs from 'fs';

let context: BrowserContext;
let page: Page;

let loginPage: LoginPage;
let homePage: HomePage;
let headerPage: HeaderPage;
let apisUserManagement: ApisUserManagement;

let testData: any;

const timestamp = new Date().toISOString().replace(/[-T:.]/g, "").slice(0, 17);

test.describe('Automation Exercise Login Test Cases', () => {

  test('Test Case 2: Login User with correct email and password', async () => {
    allure.feature('Automation Exercise Login Test Cases');
    allure.tms('137183022');
    // allure.issue('#link');
    
    const email = testData.emailAddress + timestamp + '@test.com';
    await homePage.navigate();
    await headerPage.clickOnSignupLoginLink();
    await loginPage.login(email, testData.password);
    await headerPage.assertUserLoggedinSuccessfully(testData.username);
  });

   test('Test Case 3: Login User with incorrect email and password', async () => {
    allure.feature('Automation Exercise Login Test Cases');
    allure.tms('TC03','https://www.automationexercise.com/test_cases');
    // allure.issue('#link');
    
    await homePage.navigate();
    await headerPage.clickOnSignupLoginLink();
    await loginPage.login(testData.invalidEmail, testData.invalidPassword);
    await loginPage.verifyLoginUserWithIncorrectEmailAndPassword(testData.errorMessage);
  });

  test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/LoginTestJsonFile.json', 'utf8'));
  });

  test.beforeEach(async ({ request, browser }) => {
    apisUserManagement = new ApisUserManagement(request);
    await apisUserManagement.createUser(testData.username, testData.emailAddress + timestamp + '@test.com', testData.password)

    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    headerPage = new HeaderPage(page);
  });

  test.afterEach(async () => {
    await context.close();
  });

});