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
let logoutTestData: any;

test.describe('Automation Exercise Logout User Tests', () => {
    // ------------------------------------------------------
    // UI&API Test case
    // ------------------------------------------------------
    test('Test Case 4: Logout User via UI&API', async ({ request }) => {
        allure.feature('Automation Exercise Login Test Cases');
        allure.tms('137183070');
        // allure.issue('#link');
        const email = `${logoutTestData.emailAddress}${Date.now()}@test.com`;
        const apisUserManagement = new ApisUserManagement(request);
        // test steps :
        const createResponse = await apisUserManagement.createUser(logoutTestData.username, email, logoutTestData.password);
        await apisUserManagement.verifyUserCreatedSuccessfully(createResponse, logoutTestData.createUserConfirmationMessage);
        await homePage.navigate();
        await homePage.verifyHomePageLoaded(logoutTestData.homePageTitle, logoutTestData.highlightedColorAttribute, logoutTestData.highlightedColorValue);
        await headerPage.clickOnSignupLoginLink();
        await loginPage.verifyThatUserIsNavigatedToLoginPage(logoutTestData.loginUrl, logoutTestData.loginText);
        await loginPage.login(email, logoutTestData.password);
        await headerPage.assertUserLoggedinSuccessfully(logoutTestData.username);
        await headerPage.clickOnLogoutButton();
        await loginPage.verifyThatUserIsNavigatedToLoginPage(logoutTestData.loginUrl, logoutTestData.loginText);
    });
    // ------------------------------------------------------
    // PURE UI Test case
    // ------------------------------------------------------
    test('Test Case 4: Logout User via UI', async ({ request }) => {
        allure.feature('Automation Exercise Login Test Cases');
        allure.tms('137183070');
        const email = `${logoutTestData.emailAddress}${Date.now()}@test.com`;
        // test steps :
        await homePage.navigate();
        await homePage.verifyHomePageLoaded(logoutTestData.homePageTitle, logoutTestData.highlightedColorAttribute, logoutTestData.highlightedColorValue);
        await headerPage.clickOnSignupLoginLink();
        await loginPage.enterNameAndEmailToCreateUser(logoutTestData.username, email);
        await signupPage.userRegister(logoutTestData.password, logoutTestData.firstName, logoutTestData.lastName, logoutTestData.address, logoutTestData.state, logoutTestData.city, logoutTestData.zipcode, logoutTestData.mobileNumber);
        await signupPage.verifyAccountCreatedSuccessfully(logoutTestData.creationText);
        await headerPage.clickOnSignupLoginLink();
        await headerPage.clickOnLogoutButton();
        await loginPage.verifyThatUserIsNavigatedToLoginPage(logoutTestData.loginUrl, logoutTestData.loginText);
    });

    test.beforeEach(async ({ browser, request }) => {
        // open browser
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        headerPage = new HeaderPage(page);
        signupPage = new SignupPage(page);
    });

    test.afterEach(async () => {
        await context.close();
    });

    test.beforeAll(async () => {
    logoutTestData = JSON.parse(fs.readFileSync('./resources/test-data/LogoutTestJsonFile.json', 'utf8'));
});
});
