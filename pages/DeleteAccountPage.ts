import {type Page, type Locator, expect} from '@playwright/test';
import { step } from 'allure-js-commons';

export class DeleteAccountPage {
    readonly page: Page;

    readonly accountDeletedMessage: Locator;
    readonly continue_Button: Locator;

    constructor(page: Page) {
        this.page = page;

        this.accountDeletedMessage = page.locator('//b[.="Account Deleted!"]')
        this.continue_Button = page.locator('[data-qa="continue-button"]');
    }

    async clickOnContinue() {
        await step('Click on Continue', async () => {
            await this.continue_Button.click();
        })
    }

    async assertSuccessDeleteMessage(message: string) {
        await step('Assert on Success Delete Account Message', async () => {
            await expect(this.accountDeletedMessage).toHaveText(message);
        })
    }
}