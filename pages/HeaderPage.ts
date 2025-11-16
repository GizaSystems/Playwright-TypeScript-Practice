import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HeaderPage {
  readonly page: Page;

  // Locators
  readonly signupLogin_link: Locator;
  readonly userProfile_link: Locator;
  readonly deleteUser_link: Locator;
  readonly deleteUserSuccess_link: Locator;
  readonly continue_Button: Locator;
  readonly cart_link: Locator;

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.signupLogin_link = page.locator('//i[@class="fa fa-lock"]//parent::a');
    this.userProfile_link = page.locator('//i[contains(@class,"fa-user")]//parent::a');
    this.deleteUser_link = page.locator('[href="/delete_account"]');
    this.deleteUserSuccess_link = page.locator('//*[@data-qa="account-deleted"]/b');
    this.continue_Button = page.locator('[data-qa="continue-button"]');
    this.cart_link = page.locator('(//*[@href="/view_cart"])[1]');
  }

  ///// Actions

  async clickOnSignupLoginLink() {
    await step("Click on Signup/Login Link", async () => {
      await this.signupLogin_link.click();
    });
  }

  async clickOnDeleteUserLink() {
    await step("Click on Delete User Link", async () => {
      await this.deleteUser_link.click();
    });
  }

  async clickOnCartLink() {
    await step("Click on Shopping Cart Link", async () => {
      await this.cart_link.click();
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
      await expect(this.deleteUserSuccess_link).toContainText(massage);
      await this.continue_Button.click();
    });
  }

}