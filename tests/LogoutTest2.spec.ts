import { test, Page, BrowserContext, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/LoginPage';
import { HeaderPage } from '../pages/HeaderPage';
import { HomePage } from '../pages/HomePage';
import { ApisUserManagement } from '../apis/ApisUserManagement';
import { SignupPage } from '../pages/SignupPage';
import * as fs from 'fs';

let context: BrowserContext;
let page: Page;
let loginPage: LoginPage;
let homePage: HomePage;
let headerPage: HeaderPage;
let signupPage: SignupPage;
let testData: any;

test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/LoginTestJsonFile.json', 'utf8'));
});
// ------------------------------------------------------
// UI&API Test case
// ------------------------------------------------------
test.describe('Automation Exercise Logout UI&API Tests', () => {
    test.beforeEach(async ({ browser, request }) => {
        // open browser
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        headerPage = new HeaderPage(page);
    });
    test.afterEach(async () => {
        await context.close();
    });
    test('Test Case 4: Logout User UI&API', async ({ request }) => {
        allure.feature('Automation Exercise Login Test Cases');
        allure.tms('137183070');
        const email = `${testData.emailAddress}${Date.now()}@test.com`;
        const apisUserManagement = new ApisUserManagement(request);
        const createResponse = await apisUserManagement.createUser(testData.username,email,testData.password);
        // test steps :
        await homePage.navigate();
        await homePage.verifyHomePageLoaded();
        await headerPage.clickOnSignupLoginLink();
        await loginPage.verifyLoginPageLoaded();
        await loginPage.login(email, testData.password);
        await headerPage.assertUserLoggedinSuccessfully(testData.username);
        await headerPage.clickOnLogoutButton();
        await loginPage.VerifyThatUserIsNavigatedToLoginPage();
    });
});
// ------------------------------------------------------
// PURE API Test case
// ------------------------------------------------------
// test.describe('Automation Exercise Logout API Tests', () => {
//     test('Test Case 4: Logout User via API', async ({ request }) => {
//         allure.feature('Automation Exercise Login Test Cases');
//         allure.tms('137183071');
//         const apisUserManagement = new ApisUserManagement(request);
//         const email = `${testData.emailAddress}${Date.now()}@test.com`;
//         // CREATE
//         const createResponse = await apisUserManagement.createUser(testData.username, email, testData.password);
//         await apisUserManagement.verifyUserCreatedSuccessfully(createResponse);
//         // LOGIN
//         const loginResponse = await apisUserManagement.loginUser(email, testData.password);
//         const loginJson = await loginResponse.json();
//         await apisUserManagement.verifyUserLogedinSuccessfully(loginResponse, loginJson);
//         //LOGOUT
//         const logoutResponse = await apisUserManagement.logoutUser();
//         await apisUserManagement.verifyLogoutRequestNotHandledThroughTheApi(logoutResponse);
//     });
// });
test.describe('Automation Exercise Logout UI Tests', () => {
    allure.feature('Automation Exercise Login Test Cases');
    allure.tms('137183071');
    test.beforeEach(async ({ browser, request }) => {
        // open browser
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        headerPage = new HeaderPage(page);
        signupPage = new SignupPage(page);
        const email = `${testData.emailAddress}${Date.now()}@test.com`;
    });
    test.afterEach(async () => {
        await context.close();
    });
    test('Test Case 4: Logout User UI', async ({ request }) => {
        allure.feature('Automation Exercise Login Test Cases');
        allure.tms('137183070');
        const email = `${testData.emailAddress}${Date.now()}@test.com`;
        // test steps :
        await homePage.navigate();
        await homePage.verifyHomePageLoaded();
        await headerPage.clickOnSignupLoginLink();
        await loginPage.enterNameAndEmailToCreateUser(testData.username, email);
        await signupPage.userRegister(
            testData.password,
            testData.firstName,
            testData.lastName,
            testData.address,
            testData.state,
            testData.city,
            testData.zipcode,
            testData.mobileNumber);
        await headerPage.clickOnSignupLoginLink();
        await headerPage.clickOnLogoutButton();
        await loginPage.VerifyThatUserIsNavigatedToLoginPage();
    });
});