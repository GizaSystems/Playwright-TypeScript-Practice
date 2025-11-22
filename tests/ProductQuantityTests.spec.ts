import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { HomePage } from '../pages/HomePage';
import { ProductQuantityPage } from '../pages/ProductQuantityPage';
import * as fs from 'fs';

let context: BrowserContext;
let page: Page;
let homePage: HomePage;
let productQuantityPage: ProductQuantityPage;
let testData: any;
const timestamp = new Date().toISOString().replace(/[-T:.]/g, "").slice(0, 17);

test.describe('Verify Product Quantity in Cart Page', () => {
    test('Verify That User Can Add Product Quantity', async () => {
        allure.feature('Automation Exercise Product Quantity Tests');
        allure.tms('137183022');
        const randomEmail = testData.emailAddress + timestamp + '@test.com';
        await homePage.navigate();
        await homePage.clickViewProduct(testData.productName);
        await productQuantityPage.verifyProductDetailsIsOpened(testData.productName);
        await productQuantityPage.increaseProductQuantity(parseInt(testData.displayedQuantity));
        await productQuantityPage.clickOnAddToCartButton();
        await productQuantityPage.clickOnViewCartButton();
       await productQuantityPage.verifyProductAddedWithSelectedQuantity(testData.displayedQuantity);
    });
});

test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/ProductQuantityTestJsonFile.json', 'utf8'));
});

test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    homePage = new HomePage(page);
    productQuantityPage = new ProductQuantityPage(page);
});