import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/LoginPage'
import { HeaderPage } from '../pages/HeaderPage';
import { HomePage } from '../pages/HomePage';
import { SignupPage } from '../pages/SignupPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { CreatedAccountPage } from '../pages/CreatedAccountPage'
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ApisUserManagement } from '../apis/ApisUserManagement';
import { ApisProductsList } from '../apis/ApisProductsList';
import * as fs from 'fs';

let context: BrowserContext;
let page: Page;

let loginPage: LoginPage;
let homePage: HomePage;
let headerPage: HeaderPage;
let signupPage: SignupPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;
let paymentPage: PaymentPage;
let createdAccountPage: CreatedAccountPage;
let productsPage: ProductsPage;
let apisUserManagement: ApisUserManagement;
let apisProductsList: ApisProductsList;

let testData: any;
let email: string;

const timestamp = new Date().toISOString().replace(/[-T:.]/g, "").slice(0, 17);

test.describe('Automation Exercise Place Order Test Cases', () => {

  test('Test Case 15: Place Order: Register before Checkout', async () => {
    allure.feature('Automation Exercise Place Order Test Cases');
    allure.tms('137183294');
    
    email = testData.user.emailAddress + timestamp + '@test.com';
    await headerPage.clickOnSignupLoginLink();
    await loginPage.openSignupPage(testData.user.username, email);
    await signupPage.createNewAccount(testData.user.password, testData.user.days, testData.user.months, testData.user.years,testData.user.firstName, testData.user.lastName, testData.user.company, testData.user.address1, testData.user.country, testData.user.state, testData.user.city, testData.user.zipCode, testData.user.mobileNumber);
    await signupPage.assertTextAccountCreatedIsVisiable(testData.messages.accountCreated);
    await createdAccountPage.clickOnContinueButton();
    await headerPage.assertUserLoggedinSuccessfully(testData.user.username);
    await homePage.clickViewProduct(testData.productName1);
    await productsPage.clickOnAddToCartButton();
    await homePage.navigate();
    await homePage.clickViewProduct(testData.productName2);
    await productsPage.clickOnAddToCartButton();
    await headerPage.clickOnCartLink();
    await cartPage.assertCartPageLoaded(testData.pagesTitle.shoppingCart);
    await cartPage.clickOnProceedToCheckout();
    await checkoutPage.assertOnAddressDetails(testData.checkout.addressDetails);
    await checkoutPage.writeComment(testData.checkout.comment);
    await checkoutPage.clickOnPlaceOrderAndConfirm();
    await paymentPage.pay(testData.payment.name, testData.payment.cardNumber, testData.payment.cvc, testData.payment.expiaryMonth, testData.payment.expiaryYear);
    await paymentPage.assertSuccessPaymentMessage(testData.messages.payment);
  });

  test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/PlaceOrderRegisterBeforeCheckoutJsonFile.json', 'utf8'));
  });

  test.beforeEach(async ({request, browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    headerPage = new HeaderPage(page);
    signupPage = new SignupPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    paymentPage = new PaymentPage(page);
    createdAccountPage = new CreatedAccountPage(page);
    productsPage = new ProductsPage(page);
    apisProductsList = new ApisProductsList(request);

    await homePage.navigate();
    await homePage.verifyHomePageVisible(testData.pagesTitle.homePageTitle);
    const response = await apisProductsList.getProductsListData();
    await apisProductsList.assertProductsListReturnedSuccessfully(response);
    await apisProductsList.validateProductNameExistsInList(response, testData.productName1);
    await apisProductsList.validateProductNameExistsInList(response, testData.productName2);
  });

  test.afterEach(async ({request}) => {
    apisUserManagement = new ApisUserManagement(request);
    const response = await apisUserManagement.deleteUser(email, testData.user.password);
    await apisUserManagement.assertDeleteUserSuccess(response, testData.messages.deleteAccount);
    await context.close();
  });
});