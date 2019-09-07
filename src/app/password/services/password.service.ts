import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {

  constructor(private httpClient: HttpClient) { }

  changePassword(changePasswordModel: any): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint}${environment.apiPaths.account.changePassword}`,
      changePasswordModel
    ).toPromise();
  }
}
