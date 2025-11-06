import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class LogoutPage {
    readonly page: Page;
    readonly url: string = 'https://www.automationexercise.com/login';
    readonly loginEmail_Input: Locator;
    readonly loginPassword_Input: Locator;
    readonly login_Button: Locator;
    readonly logout_Button: Locator;
    readonly login_text: Locator;

    constructor(page: Page) {
        this.page = page;
        //  Locators
        this.loginEmail_Input = page.locator('[data-qa="login-email"]');
        this.loginPassword_Input = page.locator('[data-qa="login-password"]');
        this.login_Button = page.locator('[data-qa="login-button"]');
        this.logout_Button = page.locator("//a[normalize-space()='Logout']");
        this.login_text = page.locator("//h2[normalize-space()='Login to your account']");
    }
    async navigate() {
        await step(`Navigate to Login Page`, async () => {
            await this.page.goto(this.url);
        });
    }
    // async login(username: string, password: string) {
    //     await step(`User Login with: Username: ${username} and Password: ${password}`, async () => {
    //         await this.loginEmail_Input.fill(username);
    //         await this.loginPassword_Input.fill(password);
    //         await this.login_Button.click();
    //     });
    // }
    async logout() {
        await step(`User Logout`, async () => {
            await this.logout_Button.click();
        });
    }
    async VerifyThatUserIsNavigatedToLoginPage() {
        await step(`Assert User Logged Out Successfully`, async () => {
            //  await expect(this.page).toHaveURL('https://www.automationexercise.com/login');
            // await expect(this.login_Button).toBeVisible();
            await expect(this.login_text).toBeVisible();
        });
    }
}