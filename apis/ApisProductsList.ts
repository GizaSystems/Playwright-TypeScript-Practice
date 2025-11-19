import { expect, type APIRequestContext } from '@playwright/test';
import { ApiActions } from '../utils/ApiActions';

export class ApisProductsList {
  readonly request: APIRequestContext;
  readonly apiActions: ApiActions;
  readonly productsList_serviceName = '/api/productsList';

  constructor(request: APIRequestContext) {
    this.request = request;
    this.apiActions = new ApiActions(request);
  }

  ///// Actions


  async productsList(): Promise<any> {
    const response = await this.request.get(this.productsList_serviceName, {});
    const data = await response.json(); 
    return data;
 }
  
  async findFirstProductNameByKeyword(response: any, keyword: string): Promise<string> {
    const product = response.products.find((p: any) => p.name.toLowerCase().includes(keyword.toLowerCase()));
    return product ? product.name : null;
  }
  

  /////////Assertions

  async assertproductsListSuccess(response: any) {
    expect(response.responseCode).toBe(200);
  }
}
