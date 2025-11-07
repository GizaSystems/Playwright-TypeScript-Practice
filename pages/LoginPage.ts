import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class LoginPage {
  readonly page: Page;
  readonly url: string = 'https://www.automationexercise.com/login';

  readonly loginEmail_Input: Locator;
  readonly loginPassword_Input: Locator;
  readonly login_Button: Locator;
  readonly login_Text: Locator;

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.loginEmail_Input = page.locator('[data-qa="login-email"]');
    this.loginPassword_Input = page.locator('[data-qa="login-password"]');
    this.login_Button = page.locator('[data-qa="login-button"]');
    this.login_Text = page.locator("//h2[normalize-space()='Login to your account']")
  }

  async navigate() {
    await step(`Navigate to Login Page`, async () => {
      await this.page.goto(this.url);
    });
  }

  async login(username: string, password: string) {
    await step(`User Login with: Username: ${username} and Password: ${password}`, async () => {
      await this.loginEmail_Input.fill(username);
      await this.loginPassword_Input.fill(password);
      await this.login_Button.click();
    });
  }

  async verifyLoginPageLoaded() {
    await step("Verify 'Login to your account' is visible", async () => {
     await expect(this.login_Text).toHaveText('Login to your account');
    });
  }

  async VerifyThatUserIsNavigatedToLoginPage() {
    await step(`Verify that user is navigated to login page`, async () => {
      await expect(this.page).toHaveURL(this.url);
      await expect(this.login_Text).toBeVisible();
    });
  }
}