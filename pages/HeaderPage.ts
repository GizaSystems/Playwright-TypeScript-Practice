import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class HeaderPage {
  readonly page: Page;

  // Locators
  readonly signupLogin_link: Locator;
  readonly userProfile_link: Locator;
  readonly cart_Link: Locator;
  readonly deleteAccount_Link: Locator;
  readonly accountDeleted_message: Locator;
  readonly continue_Button: Locator;

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.signupLogin_link = page.locator('//i[@class="fa fa-lock"]//parent::a');
    this.userProfile_link = page.locator('//i[contains(@class,"fa-user")]//parent::a');
    this.cart_Link = page.locator('(//a[@href="/view_cart"])[1]');
    this.deleteAccount_Link = page.locator('//a[@href="/delete_account"]');
    this.accountDeleted_message = page.locator('//h2[@data-qa="account-deleted"]');
    this.continue_Button = page.locator('//a[@data-qa="continue-button"]');
  }

  ///// Actions

  async clickOnSignupLoginLink() {
    await step("Click on Signup/Login Link", async () => {
      await this.signupLogin_link.click();
    });
  }

  async clickOnCartLink() {
    await step('Click on Cart Link', async () => {
      await this.cart_Link.click();
    });
  }

  async deleteAccount(){
    await step('Delete Account', async () => {
      await this.deleteAccount_Link.click();
    });
  }

  async clickContinue() {
    await step('Click Continue', async () => {
      await this.continue_Button.click();
    });
  }

  ///// Validations

  async assertUserLoggedinSuccessfully(username: string) {
    await step("Assert User is Loggedin Successfully", async () => {
      await expect(this.userProfile_link).toContainText(username);
    });
  }

  async assertOnAccountDeletedMessage(expectedMessage: string){
    await step('Assert on Account Deleted Message', async () => {
      await expect(this.accountDeleted_message).toHaveText(expectedMessage);
    });
  }



}