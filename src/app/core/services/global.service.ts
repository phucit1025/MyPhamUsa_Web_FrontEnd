import { Injectable, EventEmitter } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  isLogin = false;
  username: string;
  requestEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private authGuardService: AuthGuardService
  ) {
    // const token: Token = this.authGuardService.getToken();
    // this.isLogin = token ? true : false;
    this.username = this.authGuardService.getUsername();
  }
}
