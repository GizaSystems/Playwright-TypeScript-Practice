import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { HeaderPage } from '../pages/HeaderPage';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { ApisProductsList } from '../apis/ApisProductsList';
import * as fs from 'fs';

let context: BrowserContext;
let page: Page;

let homePage: HomePage;
let headerPage: HeaderPage;
let productsPage: ProductsPage;
let productDetailsPage: ProductDetailsPage;
let apisProductsList: ApisProductsList;
let testData: any;

test.describe('Automation Exercise Place Order Test Cases', () => {

  test('Test Case 8: (Ui & Api) Verify All Products and Product detail page', async () => {
    allure.feature('Automation Exercise Products and product detail Test Case');
    allure.tms('137183156');
    await headerPage.clickOnProductsLink();
    await productsPage.verifyProductsPageVisible(testData.productsPageTitle);
    await productsPage.clickViewProduct(1);
    await productDetailsPage.verifyProductDetailsAreVisible(testData.productDetailsTitle);
    const response = await apisProductsList.getProductsListData();
    await apisProductsList.validateFirstProductDetails(response,testData.productName, testData.productPrice, testData.productBrand, testData.category, testData.userType);
  });

  test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/ProductsAndDetailsTestsFile.json', 'utf8'));
  });

  test.beforeEach(async ({ request,browser }) => {
    apisProductsList = new ApisProductsList(request);
    context = await browser.newContext();
    page = await context.newPage();
    homePage = new HomePage(page);
    headerPage = new HeaderPage(page);
    productsPage = new ProductsPage(page);
    productDetailsPage = new ProductDetailsPage(page);
    
    await homePage.navigate();
    await homePage.verifyHomePageVisible(testData.homePageTitle);   
  });

  test.afterEach(async () => {
    await context.close();
  });
});