import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HeaderPage {
  readonly page: Page;

  // Locators
  readonly signupLogin_link: Locator;
  readonly userProfile_link: Locator;
  readonly logout_Button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLogin_link = page.locator('//i[@class="fa fa-lock"]//parent::a');
    this.userProfile_link = page.locator('//i[contains(@class,"fa-user")]//parent::a');
    this.logout_Button = page.locator('a[href="/logout"]');

  }

  ///// Actions
  
  async clickOnSignupLoginLink() {
    await step("Click on Signup/Login Link", async () => {
      await this.signupLogin_link.click();
    });
  }

  async clickOnLogoutButton() {
    await step("Click on logout button", async () => {
      await this.logout_Button.click();
    })
  }

  ///// Validations

  async assertUserLoggedinSuccessfully(username: string) {
    await step("Assert User is Loggedin Successfully", async () => {
      await expect(this.userProfile_link).toContainText(username);
    });
  }
}