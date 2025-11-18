import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HeaderPage {
  readonly page: Page;

  // Locators
  readonly signupLogin_link: Locator;
  readonly userProfile_link: Locator;
  readonly products_link: Locator; // Products navigation link in header
  readonly viewCart_link: Locator; // View Cart navigation link in header
  readonly deleteAccount_link: Locator;

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.signupLogin_link = page.locator('//i[@class="fa fa-lock"]//parent::a');
    this.userProfile_link = page.locator('//i[contains(@class,"fa-user")]//parent::a');
    this.products_link = page.locator('//a[@href="/products"]'); // Products page link
    this.viewCart_link = page.locator('//a[@href="/view_cart"]'); // Cart page link
    this.deleteAccount_link = page.locator('//i[contains(@class,"fa fa-trash-o")]//parent::a');
  }

  ///// Actions

  async clickOnSignupLoginLink() {
    await step("Click on Signup/Login Link", async () => {
      await this.signupLogin_link.click();
    });
  }

  async clickOnDeleteAccountLink() {
    await step("Click on Delete Account Link", async () => {
      await this.deleteAccount_link.click();
    });
  }

  async clickOnProductsLink() {
    // Navigates to the products page from header
    await step("Click on Products Link", async () => {
      await this.products_link.click();
    });
  }

  async clickOnViewCartLink() {
    // Navigates to the cart page from header
    await step("Click on View Cart Link", async () => {
      await this.viewCart_link.click();
    });
  }

  ///// Validations

  async assertUserLoggedinSuccessfully(username: string) {
    await step("Assert User is Loggedin Successfully", async () => {
      await expect(this.userProfile_link).toContainText(username);
    });
  }

}
