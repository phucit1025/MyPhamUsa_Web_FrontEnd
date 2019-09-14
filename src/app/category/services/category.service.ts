import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Promise<any> {
    return this.httpClient.get<any>(
      `${environment.endPoint}${environment.apiPaths.category.getCategories}`
    ).toPromise();
  }

  createCategory(categoryCM: any): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint}${environment.apiPaths.category.createCategory}`,
      categoryCM
    ).toPromise();
  }

  updateCategory(categoryUM: any): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint}${environment.apiPaths.category.updateCategory}`,
      categoryUM
    ).toPromise();
  }

  deleteCategory(categoryId: number): Promise<any> {
    return this.httpClient.delete<any>(
      `${environment.endPoint}${environment.apiPaths.category.deleteCategory}?categoryId=${categoryId}`
    ).toPromise();
  }
}
