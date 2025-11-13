import { type Page, type Locator } from '@playwright/test';
export class CreatedAccountPage {
    readonly page: Page;
    readonly continue_Button: Locator;
    readonly createdtAccountPage_url: string = '/account_created';
    constructor(page: Page) {
    this.page = page;
    //  Locators
    this.continue_Button =  page.locator('[data-qa="continue-button"]');    
  }

  //Actions
  async clickOnContinueButton(){
    await this.continue_Button.click();
  }
}