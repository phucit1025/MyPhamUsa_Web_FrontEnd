import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token: Token = this.getToken();
    if (!token) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  setToken(token: Token, username: string): void {
    localStorage.setItem(environment.token, JSON.stringify(token));
    localStorage.setItem(`${environment.token}_username`, username);
  }

  getToken(): Token {
    let token: Token;
    try {
      token = JSON.parse(localStorage.getItem(environment.token));
    } catch (e) {
    }
    return token;
  }

  clearToken(): void {
    localStorage.clear();
  }

  getUsername(): string {
    return localStorage.getItem(`${environment.token}_username`);
  }
}
