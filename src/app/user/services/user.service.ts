import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Promise<any> {
    return this.httpClient.get<any>(
      `${environment.endPoint}${environment.apiPaths.account.getUsers}`
    ).toPromise();
  }

  createUser(userCM: any): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint}${environment.apiPaths.account.createUser}`,
      userCM,
      {
        responseType: 'text',
      }
    ).toPromise();
  }

  deleteUser(userId: string): Promise<any> {
    return this.httpClient.delete<any>(
      `${environment.endPoint}${environment.apiPaths.account.deleteUser}?id=${userId}`
    ).toPromise();
  }
}
