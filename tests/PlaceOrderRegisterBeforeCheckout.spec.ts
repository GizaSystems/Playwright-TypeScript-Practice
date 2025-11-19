import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/LoginPage'
import { HeaderPage } from '../pages/HeaderPage';
import { HomePage } from '../pages/HomePage';
import { SignupPage } from '../pages/SignupPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { CreatedAccountPage } from '../pages/CreatedAccountPage'
import { DeleteAccountPage } from '../pages/DeleteAccountPage';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';
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
let deleteAccountPage: DeleteAccountPage;
let productsPage: ProductsPage;

let testData: any;

const timestamp = new Date().toISOString().replace(/[-T:.]/g, "").slice(0, 17);

test.describe('Automation Exercise Place Order Test Cases', () => {

  test('Test Case 15: Place Order: Register before Checkout', async () => {
    allure.feature('Automation Exercise Place Order Test Cases');
    allure.tms('137183294');

    const email = testData.user.emailAddress + timestamp + '@test.com';
    await headerPage.clickOnSignupLoginLink();
    await loginPage.openSignupPage(testData.user.username, email);
    await signupPage.createNewAccount(testData.user.password, testData.user.days, testData.user.months, testData.user.years,testData.user.firstName, testData.user.lastName, testData.user.company, testData.user.address1, testData.user.country, testData.user.state, testData.user.city, testData.user.zipCode, testData.user.mobileNumber);
    await signupPage.assertTextAccountCreatedIsVisiable(testData.messages.accountCreated);
    await createdAccountPage.clickOnContinueButton();
    await headerPage.assertUserLoggedinSuccessfully(testData.user.username);
    await homePage.clickViewProduct(testData.productName);
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

  test.beforeEach(async ({ browser }) => {
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
    deleteAccountPage = new DeleteAccountPage(page);
    productsPage = new ProductsPage(page);

    await homePage.navigate();
    await homePage.verifyHomePageVisible(testData.pagesTitle.homePageTitle);
  });

  test.afterEach(async () => {
    await headerPage.clickOnDeleteAccountLink();
    await deleteAccountPage.assertSuccessDeleteMessage(testData.messages.deleteAccount);
    await deleteAccountPage.clickOnContinue();
    await context.close();
  });
});