import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HeaderPage {
  readonly page: Page;

  // Locators
  readonly signupLogin_link: Locator;
  readonly userProfile_link: Locator;
  readonly deleteUserSuccess_link: Locator;
  readonly continue_Button: Locator;
  readonly deleteAccount_link: Locator;
  readonly cart_link: Locator;

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.signupLogin_link = page.locator('//i[@class="fa fa-lock"]//parent::a');
    this.userProfile_link = page.locator('//i[contains(@class,"fa-user")]//parent::a');
    this.deleteUserSuccess_link = page.locator('//h2[@data-qa="account-deleted"]/b');
    this.continue_Button = page.locator('[data-qa="continue-button"]');
    this.deleteAccount_link = page.locator('//i[contains(@class,"fa fa-trash-o")]//parent::a');
    this.cart_link = page.locator('//i[@class="fa fa-shopping-cart"]//parent::a');
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

  async clickOnCartLink() {
    await step("Click on Cart Link", async () => {
      await this.cart_link.click();
    });
  }

  async scrollToHeader() {
    await step('Scroll to Header', async () => {
      await this.page.evaluate(() => window.scrollTo(0, 0));
    });
  }

  ///// Validations
  async assertUserLoggedinSuccessfully(username: string) {
    await step("Assert User is Loggedin Successfully", async () => {
      await expect(this.userProfile_link).toContainText(username);
    });
  }

  async assertUserDeletedSuccessfully(massage: string) {
    await step("Assert User is Deleted Successfully", async () => {
      await expect(this.deleteUserSuccess_link).toHaveText(massage);
    });
  }

}