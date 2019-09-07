import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ProductPagingList } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProductsPaging(pageIndex: number = 0, pageSize: number = 20): Promise<ProductPagingList> {
    return this.httpClient.get<ProductPagingList>(
      `${environment.endPoint}${environment.apiPaths.product.getProductsPaging}`,
      {
        params: {
          pageIndex: `${pageIndex}`,
          pageSize: `${pageSize}`,
        },
      }
    ).toPromise();
  }

  deleteProduct(productId: number): Promise<ProductPagingList> {
    return this.httpClient.delete<ProductPagingList>(
      `${environment.endPoint}${environment.apiPaths.product.deleteProduct}?productId=${productId}`
    ).toPromise();
  }
}
