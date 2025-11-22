import { APIResponse, expect, type APIRequestContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { ApiActions } from '../utils/ApiActions';

export class ApisProductManagement {
  readonly request: APIRequestContext;
  readonly apiActions: ApiActions;
  readonly getProductsList_serviceName = 'api/productsList';

   constructor(request: APIRequestContext) {
    this.request = request;
    this.apiActions = new ApiActions(request);
  }

    ///// Actions
    async getProductsList(): Promise<APIResponse> {
    return await allure.step('Get Products List',
      async () => {
        const response = await this.apiActions.get(this.getProductsList_serviceName);
        return response;
      }); 
    }

    /////////Assertions
  async assertGetProductsListSuccess(response: APIResponse, productName: string, productPrice: string, productBrand: string, productCategory: string, productUserType: string) {
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.products[0].name).toBe(productName);
    expect(body.products[0].price).toBe(productPrice);
    expect(body.products[0].brand).toBe(productBrand);
    expect(body.products[0].category.category).toBe(productCategory);
    expect(body.products[0].category.usertype.usertype).toBe(productUserType);
  }

}
