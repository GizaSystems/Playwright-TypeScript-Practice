import { type Page, type Locator, expect } from '@playwright/test';
export class TestCasePage {
    readonly page: Page;
    readonly testCasesPageTitle: Locator;
    readonly testCasesPage_url: string = '/test_cases';
    constructor(page: Page) {
        this.page = page;
    //Locators
        this.testCasesPageTitle = page.locator('h2.title.text-center');
    }

    //Assertions
    async assertTextTestCasesIsVisiable(expectedText: string) {
        await expect(this.testCasesPageTitle).toHaveText(expectedText);
    }
    async assertTestCasesPageIsOpen() {
        await expect(this.page).toHaveURL(this.testCasesPage_url);
    }
}