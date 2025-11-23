import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { HomePage } from '../pages/HomePage';
import categoryData from '../resources/test-data/categoryNavigation.json';
let context: BrowserContext;
let page: Page;
let homePage: HomePage;

test.describe('Automation Exercise Category Navigation', () => {
  test('Test Case 18: View Category Products', async () => {
    allure.feature('Automation Exercise Category Navigation');
    await homePage.navigate();
    await homePage.assertCategoriesVisible();
    for (const { mainCategory, subCategory, expectedText } of categoryData) {
      await homePage.expandCategory(mainCategory);
      await homePage.clickSubCategory(mainCategory, subCategory);
      await homePage.assertCategoryPageText(expectedText);
    }
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
