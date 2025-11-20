import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HeaderPage {
  readonly page: Page;

  // Locators
  readonly signupLoginLogout_link: Locator;
  readonly userProfile_link: Locator;
  readonly deleteAccount_link: Locator;
  readonly cart_link: Locator;
  readonly products_link: Locator;

  constructor(page: Page) {
    //  Locators
    this.page = page;
    this.signupLoginLogout_link = page.locator('//i[@class="fa fa-lock"]//parent::a');
    this.userProfile_link = page.locator('//i[contains(@class,"fa-user")]//parent::a');
    this.deleteAccount_link = page.locator('//i[contains(@class,"fa fa-trash-o")]//parent::a');
    this.cart_link = page.locator('//i[@class="fa fa-shopping-cart"]//parent::a');
    this.products_link = page.locator('//i[@class="material-icons card_travel"]//parent::a');
  }

  ///// Actions

  async clickOnSignupLoginLink() {
    await step("Click on Signup/Login Link", async () => {
      await this.signupLoginLogout_link.click();
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

  async clickOnProductsLink() {
    await step("Click on Products Link", async () => {
      await this.products_link.click();
    });
  }

  async clickOnLogoutButton() {
    await step("Click on logout button", async () => {
      await this.signupLoginLogout_link.click();
    })
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
}
