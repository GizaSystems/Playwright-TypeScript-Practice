import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class LoginPage {
  readonly page: Page;
  readonly url: string = 'https://www.automationexercise.com/login';

  readonly loginEmail_Input: Locator;
  readonly loginPassword_Input: Locator;
  readonly login_Button: Locator;

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.loginEmail_Input = page.locator('[data-qa="login-email"]');
    this.loginPassword_Input = page.locator('[data-qa="login-password"]');
    this.login_Button = page.locator('[data-qa="login-button"]');
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

}