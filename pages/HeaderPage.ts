import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HeaderPage {
  readonly page: Page;

  // Locators
  readonly signupLogin_link: Locator;
  readonly userProfile_link: Locator;

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.signupLogin_link = page.locator('//i[@class="fa fa-lock"]//parent::a');
    this.userProfile_link = page.locator('//i[contains(@class,"fa-user")]//parent::a');
  }

  ///// Actions

  async clickOnSignupLoginLink() {
    await step("Click on Signup/Login Link", async () => {
      await this.signupLogin_link.click();
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
}