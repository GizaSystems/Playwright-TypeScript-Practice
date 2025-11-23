import { APIResponse, expect, type APIRequestContext } from '@playwright/test';
import { ApiActions } from '../utils/ApiActions';
import * as allure from 'allure-js-commons';

export class ApisProductsList {
  readonly request: APIRequestContext;
  readonly apiActions: ApiActions;
  readonly productsList_serviceName = '/api/productsList';

  constructor(request: APIRequestContext) {
    this.request = request;
    this.apiActions = new ApiActions(request);
  }

  ///// Actions

  async getProductsListData(): Promise<APIResponse> {
    return await allure.step(`Get The Available Products List`, async () => {
      const response = await this.request.get(this.productsList_serviceName, {});
      return response;
    });
  }

  ///// Validations

  async assertProductsListReturnedSuccessfully(response: APIResponse){
   return await allure.step(`Validate Products List Returned Successfully And Not Empty`, async () => {
    const data = await response.json();
    expect(data.responseCode).toBe(200); 
    expect(data.products && data.products.length > 0).toBe(true);
   });
  }

 async validateProductNameExistsInList(response: APIResponse, expectedName: string){
  return await allure.step(`Verify Product Name Exists In The Available Products List`, async () => {
   const data = await response.json();
   const product = data.products.find((p: any) => p.name === expectedName);
   expect(product?.name).toEqual(expectedName);
  });
 }
 async validateFirstProductDetails(response: APIResponse, productName: string, productPrice: string, productBrand: string, productCategory: string, productUserType: string) {
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.products[0].name).toBe(productName);
  expect(body.products[0].price).toBe(productPrice);
  expect(body.products[0].brand).toBe(productBrand);
  expect(body.products[0].category.category).toBe(productCategory);
  expect(body.products[0].category.usertype.usertype).toBe(productUserType);
  }

}