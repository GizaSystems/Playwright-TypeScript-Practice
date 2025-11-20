import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HeaderPage {
  readonly page: Page;

  // Locators
  readonly signupLoginLogout_link: Locator;
  readonly userProfile_link: Locator;
  readonly deleteAccount_link: Locator;
  readonly cart_link: Locator;
  readonly testCases_link: Locator;

  constructor(page: Page) {
    //  Locators
    this.page = page;
    this.signupLoginLogout_link = page.locator('//i[@class="fa fa-lock"]//parent::a');
    this.userProfile_link = page.locator('//i[contains(@class,"fa-user")]//parent::a');
    this.deleteAccount_link = page.locator('//i[contains(@class,"fa fa-trash-o")]//parent::a');
    this.testCases_link = page.locator("ul.nav.navbar-nav a[href='/test_cases']");
    this.cart_link = page.locator('//i[@class="fa fa-shopping-cart"]//parent::a');
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

  async clickOnLogoutButton() {
    await step("Click on logout button", async () => {
      await this.signupLoginLogout_link.click();
    })
  }
  async clickOnTestCasesLink() {
    await step("Click on Test Cases link", async () => {
      await this.testCases_link.click();
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
