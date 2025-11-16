import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/LoginPage'
import { HeaderPage } from '../pages/HeaderPage';
import { HomePage } from '../pages/HomePage';
import { SignupPage } from '../pages/SignupPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import * as fs from 'fs';

let context: BrowserContext;
let page: Page;

let loginPage: LoginPage;
let homePage: HomePage;
let headerPage: HeaderPage;
let signupPage: SignupPage;
let shoppingCartPage: ShoppingCartPage;
let checkoutPage: CheckoutPage;
let paymentPage: PaymentPage;

let testData: any;

const timestamp = new Date().toISOString().replace(/[-T:.]/g, "").slice(0, 17);

test.describe('Automation Exercise Place Order Test Cases', () => {

  test('Test Case 15: Place Order: Register before Checkout', async () => {
    allure.feature('Automation Exercise Place Order Test Cases');
    allure.tms('137183022');
    // allure.issue('#link');

    const email = testData.registerbeforeCheckout.emailAddress + timestamp + '@test.com';
    await homePage.navigate();
    await headerPage.clickOnSignupLoginLink();
    await loginPage.signup(email, testData.registerbeforeCheckout.username);
    await signupPage.fillSignupInfo(testData.registerbeforeCheckout.password, testData.registerbeforeCheckout.days, 
      testData.registerbeforeCheckout.months, testData.registerbeforeCheckout.years,testData.registerbeforeCheckout.firstName, 
      testData.registerbeforeCheckout.lastName, testData.registerbeforeCheckout.company, testData.registerbeforeCheckout.address1, 
      testData.registerbeforeCheckout.state, testData.registerbeforeCheckout.city, testData.registerbeforeCheckout.zipCode, testData.registerbeforeCheckout.mobileNumber);
    await signupPage.assertUserCreatedSuccessfully(testData.registerbeforeCheckout.accountCreatedSuccessfullyMessage);
    await headerPage.assertUserLoggedinSuccessfully(testData.registerbeforeCheckout.username);
    await homePage.addItemToCart();
    await headerPage.clickOnCartLink();
    await shoppingCartPage.assertShoppingCartReachedSuccessfully();
    await shoppingCartPage.proceedToCheckout();
    await checkoutPage.assertCheckoutAddress(testData.registerbeforeCheckout.address1);
    await checkoutPage.addCommentAboutOrder(testData.registerbeforeCheckout.commentAboutOrder);
    await checkoutPage.placeOrder();
    await paymentPage.addPaymentDetails(testData.registerbeforeCheckout.nameonCard, testData.registerbeforeCheckout.cardNumber, testData.registerbeforeCheckout.CVCNumber, testData.registerbeforeCheckout.expirationMonth, testData.registerbeforeCheckout.expirationYear);
    await paymentPage.clickPayandConfirmOrder();
    await paymentPage.assertOrderPlacedSuccessfully(testData.registerbeforeCheckout.orderplacedsuccessfullyMessage);
    await headerPage.clickOnDeleteUserLink();
    await headerPage.assertUserDeletedSuccessfully(testData.registerbeforeCheckout.accountDeletedSuccessfullyMessage);
  });

  test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/PlaceOrderTestsJsonFile.json', 'utf8'));
  });

  test.beforeEach(async ({ request, browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    headerPage = new HeaderPage(page);
    signupPage = new SignupPage(page);
    shoppingCartPage = new ShoppingCartPage(page);
    checkoutPage = new CheckoutPage(page);
    paymentPage = new PaymentPage(page);
  });

  test.afterEach(async () => {
    await context.close();
  });

});