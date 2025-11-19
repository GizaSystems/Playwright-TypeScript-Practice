import { test, Page, BrowserContext, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/LoginPage';
import { HeaderPage } from '../pages/HeaderPage';
import { HomePage } from '../pages/HomePage';
import { ApisUserManagement } from '../apis/ApisUserManagement';
import * as fs from 'fs';

let context: BrowserContext;
let page: Page;
let loginPage: LoginPage;
let homePage: HomePage;
let headerPage: HeaderPage;
let logoutTestData: any;

test.describe('Automation Exercise Logout User Tests', () => {
    test('Test Case 4: Logout User via UI&API', async ({ request }) => {
        allure.feature('Automation Exercise Login Test Cases');
        allure.tms('137183070');
        // allure.issue('#link'); 
        const email = logoutTestData.emailAddress + Date.now() + "@test.com";
        const apisUserManagement = new ApisUserManagement(request);
        const createResponse = await apisUserManagement.createUser(logoutTestData.username, email, logoutTestData.password);
        await apisUserManagement.verifyUserCreatedSuccessfully(createResponse, logoutTestData.createUserConfirmationMessage);
        await homePage.navigate();
        await homePage.verifyHomePageVisible(logoutTestData.homePageTitle);
        await headerPage.clickOnSignupLoginLink();
        await loginPage.verifyThatUserIsNavigatedToLoginPage(logoutTestData.loginPageTitle);
        await loginPage.login(email, logoutTestData.password);
        await headerPage.assertUserLoggedinSuccessfully(logoutTestData.username);
        await headerPage.clickOnLogoutButton();
        await loginPage.verifyThatUserIsNavigatedToLoginPage(logoutTestData.loginPageTitle);
    });

    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        headerPage = new HeaderPage(page);
    });

    test.afterEach(async () => {
        await context.close();
    });

    test.beforeAll(async () => {
        logoutTestData = JSON.parse(fs.readFileSync('./resources/test-data/LogoutTestJsonFile.json', 'utf8'));
    });
});
