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
let signupTestData: any;

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

    test('Test Case 4: Logout User via UI', async ({ request }) => {
        allure.feature('Automation Exercise Login Test Cases');
        allure.tms('137183070');
        // allure.issue('#link');
        const email = logoutTestData.emailAddress + Date.now() + "@test.com";
        await homePage.navigate();
        await homePage.verifyHomePageVisible(logoutTestData.homePageTitle);
        await headerPage.clickOnSignupLoginLink();
        await loginPage.registerNewUser(logoutTestData.username, email);
        await signupPage.createNewAccount(signupTestData.password, signupTestData.day, signupTestData.month, signupTestData.year, signupTestData.firstName, signupTestData.lastName, signupTestData.companyName, signupTestData.addressDetails, signupTestData.countryName, signupTestData.state, signupTestData.city, signupTestData.zipCode, signupTestData.mobileNumber)
        await signupPage.verifyAccountCreatedSuccessfully(logoutTestData.creationSuccessfulText, logoutTestData.creationPageTitle);
        await headerPage.clickOnSignupLoginLink();
        await headerPage.clickOnLogoutButton();
        await loginPage.verifyThatUserIsNavigatedToLoginPage(logoutTestData.loginPageTitle);
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
        signupTestData = JSON.parse(fs.readFileSync('./resources/test-data/SignupTestJsonFile.json', 'utf8'));
    });
});
