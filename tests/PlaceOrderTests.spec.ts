import {test, Page, BrowserContext  } from '@playwright/test';
import * as allure from 'allure-js-commons';
import * as fs from 'fs';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { HeaderPage } from '../pages/HeaderPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';


let context: BrowserContext;
let page: Page;

let homePage: HomePage;
let cartPage: CartPage;
let loginPage: LoginPage;
let signupPage: SignupPage;
let headerPage: HeaderPage;
let checkoutPage: CheckoutPage;
let paymentPage: PaymentPage;

let testData : any;

const timestamp = new Date().toISOString().replace(/[-T:.]/g, "").slice(0, 17);

test.describe('Automation Exercise Place Order Test Cases', () => {
    test('Test Case 14: Place Order: Register while Checkout', async () => {
        allure.feature('Automation Exercise Place Order Test Cases');
        allure.tms('137183275');

        const email = testData.emailAddress + timestamp + '@test.com';
        await homePage.navigate();
        await homePage.verifyHomePageVisible(testData.homePageTitle);
        await homePage.addProductToCart(testData.productName);
        await homePage.clickViewCart();
        await cartPage.verifyCartPageIsVisible();
        await cartPage.clickProceedToCheckout();
        await cartPage.clickRegisterLoginLink();
        await loginPage.signup(testData.username, email);
        await signupPage.fillAccountInfo(testData.title, testData.password, testData.day, testData.month, testData.year,
            testData.firstName, testData.lastName, testData.company, testData.address, testData.address2, testData.country,
            testData.state, testData.city, testData.zipcode, testData.mobileNumber
        );
        await signupPage.assertAccountCreated(testData.accountCreatedMessage);
        await headerPage.assertUserLoggedinSuccessfully(testData.username);
        await headerPage.clickOnCartLink();
        await cartPage.clickProceedToCheckout();
        await checkoutPage.assertOnDeliveryAddress(testData.address);
        await checkoutPage.assertOnReviewOrder(testData.productName);
        await checkoutPage.addComment(testData.comment);
        await checkoutPage.placeOrder();
        await paymentPage.enterPaymentDetails(testData.nameOnCard, testData.cvc, testData.expirationMonth, testData.expirationYear);
        await paymentPage.clickPayAndConfirm();
        await paymentPage.assertOnOrderPlacedSuccessMessage(testData.orderPlacedMessage);
        await headerPage.deleteAccount();
        await headerPage.assertOnAccountDeletedMessage(testData.accountDeletedMessage);
        await headerPage.clickContinue();
    });



    test.beforeAll(async () => {
      testData = JSON.parse(fs.readFileSync('./resources/test-data/PlaceOrderTestJsonFile.json', 'utf8'));
  });


    test.beforeEach(async ({browser} ) => {
      context = await browser.newContext();
      page = await context.newPage();
      homePage = new HomePage(page);
      cartPage = new CartPage(page);
      loginPage = new LoginPage(page);
      signupPage = new SignupPage(page);
      headerPage = new HeaderPage(page);
      checkoutPage = new CheckoutPage(page);
      paymentPage = new PaymentPage(page);

  });

    test.afterEach(async() => {
      await context.close();
  });

});


