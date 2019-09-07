import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token } from 'app/core/models/token';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(credential: any): Promise<Token> {
    return this.httpClient.post<Token>(
      `${environment.endPoint}${environment.apiPaths.account.login}`,
      credential
    ).toPromise();
  }

  getAdminInfo(): Promise<any> {
    return this.httpClient.get(
      `${environment.endPoint}${environment.apiPaths.account.getAdminInfo}`,
      {
        responseType: 'text',
      }
    ).toPromise();
  }
}
