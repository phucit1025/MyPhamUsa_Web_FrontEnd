import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoragePagingList } from '../models/storage';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private httpClient: HttpClient) { }

  getProducts(pageIndex: number = 0, pageSize: number = 20): Promise<StoragePagingList> {
    return this.httpClient.get<StoragePagingList>(
      `${environment.endPoint}${environment.apiPaths.storage.getStorages}`,
      {
        params: {
          pageIndex: `${pageIndex}`,
          pageSize: `${pageSize}`,
        },
      }
    ).toPromise();
  }

  issue(issueModel: any): Promise<any> {
    return this.httpClient.post<any>(
      `${environment.endPoint}${environment.apiPaths.storage.issue}`,
      issueModel
    ).toPromise();
  }

  receive(receiveModel: any): Promise<any> {
    return this.httpClient.post<any>(
      `${environment.endPoint}${environment.apiPaths.storage.receive}`,
      receiveModel
    ).toPromise();
  }
}
