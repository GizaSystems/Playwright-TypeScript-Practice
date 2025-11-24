import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { CategoryPage } from '../pages/CategoryPage';
import { HomePage } from '../pages/HomePage';
let context: BrowserContext;
let page: Page;
let homePage: HomePage;
let categoryPage: CategoryPage;

test.describe('Automation Exercise Category Navigation', () => {
  test('Test Case 18: View Category Products', async () => {
    allure.feature('Automation Exercise Category Navigation');
    await homePage.navigate();
    await categoryPage.assertCategoriesVisible();
    await categoryPage.assertWomenCategory();
    await categoryPage.assertMenCategory();
  });

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    categoryPage = new CategoryPage(page);
    homePage = new HomePage(page);
  });

  test.afterEach(async () => {
    await context.close();
  });
});
