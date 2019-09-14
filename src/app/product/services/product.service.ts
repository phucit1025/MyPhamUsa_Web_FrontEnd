import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ProductPagingList } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProducts(pageIndex: number = 0, pageSize: number = 20): Promise<ProductPagingList> {
    return this.httpClient.get<ProductPagingList>(
      `${environment.endPoint}${environment.apiPaths.product.getProducts}`,
      {
        params: {
          pageIndex: `${pageIndex}`,
          pageSize: `${pageSize}`,
        },
      }
    ).toPromise();
  }

  getProduct(id: number): Promise<any> {
    return this.httpClient.get<any>(
      `${environment.endPoint}${environment.apiPaths.product.getProduct}`,
      {
        params: {
          id: `${id}`,
        },
      }
    ).toPromise();
  }

  createProduct(productCM: any): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint}${environment.apiPaths.product.createProduct}`,
      productCM
    ).toPromise();
  }

  updateProduct(productUM: any): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint}${environment.apiPaths.product.updateProduct}`,
      productUM
    ).toPromise();
  }

  deleteProduct(productId: number): Promise<any> {
    return this.httpClient.delete<any>(
      `${environment.endPoint}${environment.apiPaths.product.deleteProduct}?productId=${productId}`
    ).toPromise();
  }

  isAvailableCode(productCode: string, productId: number = 0): Promise<any> {
    const model = {
      productId: productId,
      code: productCode,
    };
    return this.httpClient.post(
      `${environment.endPoint}${environment.apiPaths.product.isAvailableCode}`,
      model
    ).toPromise();
  }
}
