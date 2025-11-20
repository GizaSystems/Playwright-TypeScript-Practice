import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { HeaderPage } from '../pages/HeaderPage';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import * as fs from 'fs';

let context: BrowserContext;
let page: Page;

let homePage: HomePage;
let headerPage: HeaderPage;
let productsPage: ProductsPage;

let testData: any;
let productName: string;
let productsPageTitle: string;
let searchResultsPageTitle: string;

test.describe('Automation Excercise Search Product Test Cases', () => {
  test('Test Case 9: Search Product', async () => {
    allure.feature('Automation Exercise Search Product Test Cases');
    allure.tms('137183174');
    // allure.issue('#link');

    await headerPage.clickOnProductsLink();
    await productsPage.assertOnProductsPageTitle(productsPageTitle);
    await productsPage.enterProductName(productName);
    await productsPage.clickSearchButton();
    await productsPage.assertOnSearchedProductsTitle(searchResultsPageTitle);
    await productsPage.assertOnFirstSearchResult(productName);

  });

  test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/SearchProductsTestData.json', 'utf8'));
  });

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    productName = testData.productName;
    productsPageTitle = testData.productsPageTitle;
    searchResultsPageTitle = testData.searchResultsPageTitle;

    homePage = new HomePage(page);
    headerPage = new HeaderPage(page);
    productsPage = new ProductsPage(page);

    await homePage.navigate();

  });

  test.afterEach(async () => {
    await context.close();
  });
})

