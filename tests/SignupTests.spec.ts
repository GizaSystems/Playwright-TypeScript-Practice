import { test, expect, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/LoginPage'
import { HeaderPage } from '../pages/HeaderPage';
import { HomePage } from '../pages/HomePage';
import * as fs from 'fs';
import { SignupPage } from '../pages/SignupPage';
import { CreatedAccountPage } from '../pages/CreatedAccountPage';

let context: BrowserContext;
let page: Page;
let loginPage: LoginPage;
let signupPage: SignupPage;
let createdAccountPage:CreatedAccountPage;
let homePage: HomePage;
let headerPage: HeaderPage;

let signupTestData: any;

const timestamp = new Date().toISOString().replace(/[-T:.]/g, "").slice(0, 17);

test.describe('Automation Exercise signup Test Cases', () => {

  test('Test Case 1: Create New Account', async () => {
    allure.feature('Automation Exercise signup Test Cases');
    allure.tms('137183022');
    // allure.issue('#link');

    const email = signupTestData.emailAddress + timestamp + '@test.com';
    await homePage.navigate();
    await expect(page).toHaveURL(homePage.homePage_url);
    await headerPage.clickOnSignupLoginLink();
    await loginPage.navigateToSignupPage(signupTestData.name,email);
    await signupPage.assertTextIsVisible(signupTestData.enterAccountInformationLabelText);
    await signupPage.createNewAccount(signupTestData.password,signupTestData.day,signupTestData.month,signupTestData.year,signupTestData.firstName,signupTestData.lastName,signupTestData.companyName,signupTestData.addressDetails,signupTestData.countryName,signupTestData.state,signupTestData.city,signupTestData.zipCode,signupTestData.mobileNumber)
    await signupPage.assertTextIsVisible(signupTestData.accountCreatedLabelText);
    await expect(page).toHaveURL(createdAccountPage.createdtAccountPage_url);
    await createdAccountPage.clickOnContinueButton();
    await signupPage.assertTextIsVisible(signupTestData.name);
    await headerPage.clickOnDeleteAccountLink();
    await signupPage.assertTextIsVisible(signupTestData.accountDeletedLabelText);
  });

  test.beforeAll(async () => {
    signupTestData = JSON.parse(fs.readFileSync('./resources/test-data/SignupTestJsonFile.json', 'utf8'));
  });

  test.beforeEach(async ({browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    signupPage=new SignupPage(page);
    createdAccountPage=new CreatedAccountPage(page);
    homePage = new HomePage(page);
    headerPage = new HeaderPage(page);
  });

  test.afterEach(async () => {
    await context.close();
  });

});