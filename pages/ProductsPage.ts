//Locators
import { type Page, type Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class ProductsPage {
    readonly page: Page;

    readonly addToCart_Button: Locator;
    readonly continueShopping_Button: Locator;
    readonly productsPage_title: Locator;
    readonly searchBar_field: Locator;
    readonly searchBar_button: Locator;
    readonly searchResultsPage_title: Locator;
    readonly firstSearchResult_name: Locator;

    constructor(page: Page){
        this.page = page;

        this.addToCart_Button = page.locator('.btn.btn-default.cart');
        this.continueShopping_Button = page.locator('[data-dismiss="modal"]');
        this.productsPage_title = page.locator('.title.text-center');
        this.searchBar_field = page.locator('input[id="search_product"]');
        this.searchBar_button = page.locator('button[id="submit_search"]');
        this.searchResultsPage_title = page.locator('.title.text-center');
        this.firstSearchResult_name = page.locator('div[class="productinfo text-center"] p');
    }

    //Actions
    async clickOnAddToCartButton() {
        await step('Add Product to Cart', async () => {
            await this.addToCart_Button.click();
            await this.continueShopping_Button.click();
        })
    }

    async enterProductName(productName: string) {
        await step('Enter Product Name in The Search Bar', async () => {
            await this.searchBar_field.fill(productName);
        })
    }

    async clickSearchButton() {
        await step('Click on Search Button', async () => {
            await this.searchBar_button.click();
        })
    }

    //Assertions
    async assertOnProductsPageTitle(pageTitle: string) {
        await step('Assert on Products Page Title', async () => {
            await expect(this.productsPage_title).toContainText(pageTitle);
        })
    }

    async assertOnSearchedProductsTitle(searchResultTitle: string) {
        await step('Assert on Search Results Title', async () => {
            await expect(this.searchResultsPage_title).toHaveText(searchResultTitle);
        })
    }

    async assertOnFirstSearchResult(firstSearchResultName: string) {
        await step('Assert on Search Results Title', async () => {
            await expect(this.firstSearchResult_name).toHaveText(firstSearchResultName);
        })
    }

}