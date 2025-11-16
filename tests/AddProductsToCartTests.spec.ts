import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { HeaderPage } from '../pages/HeaderPage';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import * as fs from 'fs';

// Test context and page instances
let context: BrowserContext;
let page: Page;

// Page object instances
let homePage: HomePage;
let headerPage: HeaderPage;
let productsPage: ProductsPage;
let cartPage: CartPage;

let testData: any;

test.describe('Automation Exercise Add Products to Cart Test Cases', () => {

  test('Test Case 12: Add Products in Cart', async () => {
    allure.feature('Automation Exercise Add Products to Cart Test Cases');
    allure.tms('137183247');
    // allure.issue('#link');

    // Step 1-3: Navigate to home page and verify it's visible
    await homePage.navigate();
    await homePage.verifyHomePageVisible(testData.urls.homePage, testData.pageTitles.homePage);
    
    // Step 4: Navigate to products page
    await headerPage.clickOnProductsLink();
    
    // Step 5: Add first product to cart
    await productsPage.hoverOverFirstProduct();
    await productsPage.clickAddToCartForFirstProduct();
    
    // Step 6: Continue shopping to add more products
    await productsPage.clickContinueShoppingButton();
    
    // Step 7: Add second product to cart
    await productsPage.hoverOverSecondProduct();
    await productsPage.clickAddToCartForSecondProduct();
    
    // Step 8: Navigate to cart page
    await productsPage.clickViewCartButton();
    
    // Step 9-10: Verify products are added and cart details are correct
    await cartPage.assertProductsAddedToCart(testData.expectedProductCount);
    await cartPage.assertCartDetailsAreCorrect();
  });

  test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/AddProductsToCartTestJsonFile.json', 'utf8'));
  });

  test.beforeEach(async ({ browser }) => {
    // Initialize browser context and page for each test
    context = await browser.newContext();
    page = await context.newPage();
    
    // Initialize all page object instances
    homePage = new HomePage(page);
    headerPage = new HeaderPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
  });

  test.afterEach(async () => {
    // Clean up browser context after each test
    await context.close();
  });

});
