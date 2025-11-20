import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/LoginPage'
import { HeaderPage } from '../pages/HeaderPage';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { BrandPage } from '../pages/BrandPage';
import * as fs from 'fs';

let context: BrowserContext;
let page: Page;

let loginPage: LoginPage;
let homePage: HomePage;
let headerPage: HeaderPage;
let productsPage: ProductsPage;
let brandPage: BrandPage;

let testData: any;

test.describe('Automation Exercise Brand Products Test Cases', () => {

  test('Test Case 19: View & Cart Brand Products', async () => {
    allure.feature('Automation Exercise View & Cart Brand Products');
    allure.tms('137183376');

    await productsPage.assertOnBrandsAreVisible();
    await productsPage.clickOnBrand(testData.firstBrand);
    await brandPage.assertOnNavigationToBrandPage(testData.brandUrl+testData.firstBrand);
    await brandPage.assertOnBrandProductsDisplayed();

    await productsPage.clickOnBrand(testData.secondBrand);
    await brandPage.assertOnNavigationToBrandPage(testData.brandUrl+testData.secondBrand);
    await brandPage.assertOnBrandProductsDisplayed();
  });

  test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/ViewAndCartBrandProductsJsonFile.json', 'utf8'));
  });

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    headerPage = new HeaderPage(page);
    productsPage = new ProductsPage(page);
    brandPage = new BrandPage(page);

    await homePage.navigate();
    await headerPage.clickOnProductsLink();
  });

  test.afterEach(async () => {
    await context.close();
  });
});