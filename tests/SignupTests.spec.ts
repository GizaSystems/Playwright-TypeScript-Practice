import { test, expect, Page, BrowserContext, request } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/LoginPage'
import { HeaderPage } from '../pages/HeaderPage';
import { HomePage } from '../pages/HomePage';
import * as fs from 'fs';
import { SignupPage } from '../pages/SignupPage';
import { CreatedAccountPage } from '../pages/CreatedAccountPage';
import { ApisUserManagement } from '../apis/ApisUserManagement';

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

  test('Test Case 1:UI Create New Account', async () => {
    allure.feature('Automation Exercise signup Test Cases');
    allure.tms('137182787');
    // allure.issue('#link');
    const email = signupTestData.emailAddress + timestamp + '@test.com';
    await homePage.navigate();
    await headerPage.clickOnSignupLoginLink();
    await loginPage.openSignupPage(signupTestData.name,email);
    await signupPage.assertTextEnterAccountInfoIsVisiable(signupTestData.enterAccountInformationLabelText);
    await signupPage.createNewAccount(signupTestData.password,signupTestData.day,signupTestData.month,signupTestData.year,signupTestData.firstName,signupTestData.lastName,signupTestData.companyName,signupTestData.addressDetails,signupTestData.countryName,signupTestData.state,signupTestData.city,signupTestData.zipCode,signupTestData.mobileNumber)
    await signupPage.assertTextAccountCreatedIsVisiable(signupTestData.accountCreatedLabelText);
    await createdAccountPage.clickOnContinueButton();
    await signupPage.assertLoggedInUserName(signupTestData.name);
    await headerPage.clickOnDeleteAccountLink();
    await signupPage.assertTextAccountDeletedIsVisiable(signupTestData.accountDeletedLabelText);
  });

test('Test Case 2:API Create user account', async ({ request }) => {
  allure.tms('137182787');  
  const apiUserManagement = new ApisUserManagement(request);
  const email = signupTestData.emailAddressAPI + timestamp + '@test.com';
  const { response, body } = await apiUserManagement.createUser(signupTestData.name, email, signupTestData.password);
  apiUserManagement.assertCreateUserSuccess(response, body);
});
test('Test Case 3: Login by created new account', async ({ request }) => {
    allure.feature('Automation Exercise signup Test Cases');
    allure.tms('137182787');

    const timestamp = Date.now();
    const email = signupTestData.emailAddressForLogin + timestamp + '@test.com';

    // Step 1: Create a new account via UI
    await homePage.navigate();
    await headerPage.clickOnSignupLoginLink();
    await loginPage.openSignupPage(signupTestData.name, email);
    signupPage.createNewAccount(signupTestData.password,signupTestData.day,signupTestData.month,signupTestData.year,signupTestData.firstName,signupTestData.lastName,signupTestData.companyName,signupTestData.addressDetails,signupTestData.countryName,signupTestData.state,signupTestData.city,signupTestData.zipCode,signupTestData.mobileNumber)
    await createdAccountPage.clickOnContinueButton();
    await signupPage.assertLoggedInUserName(signupTestData.name);
    // Step 2: Verify API login via The created account
    const apiUserManagement = new ApisUserManagement(request);
    const { response, body } = await apiUserManagement.login(email, signupTestData.password);
   await apiUserManagement.assertLoginUserSuccess(response, body);
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