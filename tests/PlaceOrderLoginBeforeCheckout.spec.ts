import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/LoginPage'
import { HeaderPage } from '../pages/HeaderPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { DeleteAccountPage } from '../pages/DeleteAccountPage';
import { PaymentPage } from '../pages/PaymentPage';
import { ApisUserManagement } from '../apis/ApisUserManagement';
import * as fs from 'fs';

let context: BrowserContext;
let page: Page;

let loginPage: LoginPage;
let homePage: HomePage;
let headerPage: HeaderPage;
let productsPage: ProductsPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;
let deleteAccountPage: DeleteAccountPage;
let paymentPage: PaymentPage;
let apisUserManagement: ApisUserManagement;

let testData: any;
let timestamp: string;
let testEmail: string;

test.describe('Automation Exercise Place Order Test Cases', () => {

  test('Test Case 16: Place Order: Login before Checkout', async () => {
    allure.feature('Automation Exercise Place Order: Login before Checkout');
    allure.tms('137183304');

    await homePage.navigate();
    await homePage.verifyHomePageVisible(testData.pagesTitle.homePageTitle);
    await headerPage.clickOnSignupLoginLink();
    await loginPage.login(testEmail, testData.user.password);
    await headerPage.assertUserLoggedinSuccessfully(testData.user.name);
    await homePage.clickViewProduct(); 
    await productsPage.clickOnAddToCartButton();
    await headerPage.clickOnCartLink();
    await cartPage.assertCartPageLoaded(testData.pagesTitle.shoppingCart);
    await cartPage.clickOnProceedToCheckout();
    await checkoutPage.assertOnAddressDetails(testData.checkout.addressDetails);
    await checkoutPage.writeComment(testData.checkout.comment);
    await checkoutPage.clickOnPlaceOrderAndConfirm();
    await paymentPage.pay(testData.payment.name, testData.payment.cardNumber, testData.payment.cvc, testData.payment.expiaryMonth, testData.payment.expiaryYear);
    await paymentPage.assertSuccessPaymentMessage(testData.messages.payment);
    await headerPage.clickOnDeleteAccountLink();
    await deleteAccountPage.assertSuccessDeleteMessage(testData.messages.deleteAccount);
    await deleteAccountPage.clickOnContinue();
  });

  test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/PlaceOrderLoginBeforeCheckoutJsonFile.json', 'utf8'));
  });

  test.beforeEach(async ({ request, browser }) => {
    apisUserManagement = new ApisUserManagement(request);
    timestamp = new Date().toISOString().replace(/[-T:.]/g, "").slice(0, 17);
    testEmail = testData.user.email + timestamp + "@test.com";
    await apisUserManagement.createUser(testData.user.name, testEmail, testData.user.password)

    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    headerPage = new HeaderPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage= new CheckoutPage(page);
    deleteAccountPage= new DeleteAccountPage(page);
    paymentPage= new PaymentPage(page);
  });

  test.afterEach(async () => {
    await context.close();
  });
});