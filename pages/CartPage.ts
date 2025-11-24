import {type Page, type Locator, expect} from '@playwright/test';
import { step } from 'allure-js-commons';

export class CartPage {
    readonly page: Page;

    readonly proceedToCheckout_Button: Locator;
    readonly shoppingCart_Text: Locator;
    readonly productItem: Locator;

    constructor(page: Page) {
        this.page = page;

        this.proceedToCheckout_Button = page.locator('//a[@class="btn btn-default check_out"]');
        this.shoppingCart_Text = page.locator('.breadcrumb li.active');
        this.productItem = page.locator("//table[@id='cart_info_table']//h4/a[text()='Winter Top']");
    }

    ///// Actions

    async clickOnProceedToCheckout() {
        await step('Click on Proceed To Chechout', async () => {
            await this.proceedToCheckout_Button.click();
        })
    }
    ///// Validations

    async assertCartPageLoaded(message: string) {
        await step('Assert Cart Page is Loaded Successfully', async () => {
            await expect(this.shoppingCart_Text).toContainText(message);
        })
    }
    async assertRecommendedItemAdded(selectedProduct: string){
        await step('Assert Recommended Item is added to cart Successfully', async () => {
            await expect(this.productItem).toContainText(selectedProduct);
        })
    }
}