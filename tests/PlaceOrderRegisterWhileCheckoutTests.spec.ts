import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import * as fs from 'fs';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { HeaderPage } from '../pages/HeaderPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { CreatedAccountPage } from '../pages/CreatedAccountPage';
import { ProductsPage } from '../pages/ProductsPage';
import { DeleteAccountPage } from '../pages/DeleteAccountPage';

let context: BrowserContext;
let page: Page;

let homePage: HomePage;
let cartPage: CartPage;
let loginPage: LoginPage;
let signupPage: SignupPage;
let headerPage: HeaderPage;
let checkoutPage: CheckoutPage;
let paymentPage: PaymentPage;
let createdAccountPage: CreatedAccountPage;
let productsPage: ProductsPage;
let deleteAccountPage: DeleteAccountPage;

let testData: any;
let timestamp: string;
let email: string;

test.describe('Automation Exercise Place Order Test Cases', () => {
  test('Test Case 14: Place Order: Register while Checkout', async () => {
    allure.feature('Automation Exercise Place Order Test Cases');
    allure.tms('137183275');

    await cartPage.clickCheckoutRegisterLoginLink();
    await loginPage.openSignupPage(testData.username, email);
    await signupPage.createNewAccount(testData.password, testData.day, testData.month, testData.year, testData.firstName, testData.lastName,
      testData.company, testData.address, testData.country, testData.state, testData.city, testData.zipcode, testData.mobileNumber);
    await signupPage.assertTextAccountCreatedIsVisiable(testData.accountCreatedMessage);
    await createdAccountPage.clickOnContinueButton();
    await headerPage.assertUserLoggedinSuccessfully(testData.username);
    await headerPage.clickOnCartLink();
    await cartPage.clickOnProceedToCheckout();
    await checkoutPage.assertOnAddressDetails(testData.address);
    await checkoutPage.writeComment(testData.comment);
    await checkoutPage.clickOnPlaceOrderAndConfirm();
    await paymentPage.pay(testData.nameOnCard, testData.cardNumber, testData.cvc, testData.expirationMonth, testData.expirationYear);
    await paymentPage.assertSuccessPaymentMessage(testData.orderPlacedMessage);
  });

  test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/PlaceOrderRegisterWhileCheckoutTestJsonFile.json', 'utf8'));
  });

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    loginPage = new LoginPage(page);
    signupPage = new SignupPage(page);
    headerPage = new HeaderPage(page);
    checkoutPage = new CheckoutPage(page);
    paymentPage = new PaymentPage(page);
    createdAccountPage = new CreatedAccountPage(page);
    productsPage = new ProductsPage(page);
    deleteAccountPage = new DeleteAccountPage(page);

    timestamp = new Date().toISOString().replace(/[-T:.]/g, "").slice(0, 17);
    email = testData.emailAddress + timestamp + '@test.com';

    await homePage.navigate();
    await homePage.verifyHomePageVisible(testData.homePageTitle);
    await homePage.clickViewProduct(testData.productName);
    await productsPage.clickOnAddToCartButton();
    await headerPage.clickOnCartLink()
    await cartPage.assertCartPageLoaded(testData.cartLoadedMessage);
    await cartPage.clickOnProceedToCheckout();
  });

  test.afterEach(async () => {
    await headerPage.clickOnDeleteAccountLink();
    await deleteAccountPage.assertSuccessDeleteMessage(testData.accountDeletedMessage);
    await deleteAccountPage.clickOnContinue();
    await context.close();
  });
});