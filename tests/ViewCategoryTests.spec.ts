import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { HomePage } from '../pages/HomePage';

let context: BrowserContext;
let page: Page;
let homePage: HomePage;

test.describe('Automation Exercise Category Navigation', () => {
  test('Test Case 18: View Category Products', async () => {
    allure.feature('Automation Exercise Category Navigation');
    allure.tms('137183018');

    await homePage.navigate();
    await homePage.assertCategoriesVisible();

    // Expand and click Women > Dress
    await homePage.expandCategory('Women');
    await homePage.clickSubCategory('Women', 'Dress');
    await homePage.assertCategoryPageText('Women - Dress Products');

    // Expand and click Men > Tshirts
    await homePage.expandCategory('Men');
    await homePage.clickSubCategory('Men', 'Tshirts');
    await homePage.assertCategoryPageText('Men - Tshirts Products');
  });

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    homePage = new HomePage(page);
  });

  test.afterEach(async () => {
    await context.close();
  });
});