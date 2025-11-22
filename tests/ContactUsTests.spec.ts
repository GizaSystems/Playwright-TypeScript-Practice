import { test, Page, BrowserContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { HeaderPage } from '../pages/HeaderPage';
import { HomePage } from '../pages/HomePage';
import { ContactUsFormPage }from '../pages/ContactUsFormPage'
import * as fs from 'fs';

let context: BrowserContext;
let page: Page;

let homePage: HomePage;
let headerPage: HeaderPage;
let contactUsFormPage: ContactUsFormPage;

let testData: any;


test.describe('Contact us form test case', () => {

  test('Test Case 6: Submit contact us form', async () => {
    allure.feature('Automation Exercise contact us form test cases');
    allure.tms('137183101');
    //allure.issue('#link');

    await homePage.navigate();
    await homePage.verifyHomePageVisible(testData.homePageTitle);
    await headerPage.clickOnContactUsFormLink();
    await contactUsFormPage.assertOnConatctUsPageIsVisible(testData.subTitle);
    await contactUsFormPage.fillInContactUsForm(testData.username ,testData.useremail,testData.subject,testData.message);
    await contactUsFormPage.uploadFile(testData.filePath)
    await contactUsFormPage.submitContactUsForm();
    await contactUsFormPage.assertOnSuccessMessage(testData.successMsg);
    await contactUsFormPage.navigateBackToHomePage();
    await homePage.verifyHomePageVisible(testData.homePageTitle);
  });

  test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/ContactUsFormTestData/ContactUsFormTestData.json', 'utf8'));
    testData.filePath = './resources/test-data/ContactUsFormTestData/file.pdf';
  });

  test.beforeEach(async ({ request, browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    homePage = new HomePage(page);
    headerPage = new HeaderPage(page);
    contactUsFormPage=new ContactUsFormPage(page);
  });

  test.afterEach(async () => {
    await context.close();
  });

});