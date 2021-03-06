import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AuthGuardService } from './auth-guard.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptorService implements HttpInterceptor {

  constructor(
    private globalService: GlobalService,
    private authGuardService: AuthGuardService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.globalService.requestEvent.emit(0);
    const token = this.authGuardService.getToken();
    request = token ? request.clone(
      {
        reportProgress: true,
        setHeaders: {
          Authorization: `Bearer ${token.token}`,
        },
      }
    ) : request.clone({reportProgress: true});
    return next.handle(request)
      .do(
        (event: HttpEvent<any>) => {},
        (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.status === 403) {
            this.authGuardService.clearToken();
            this.globalService.isLogin = false;
            this.router.navigate(['login']);
          }
        }
      })
      .pipe(
        map((event: HttpEvent<any>) => {
          this.globalService.requestEvent.emit(event.type < 5 ? event.type * 25 : 100);
          return event;
        }),
        finalize(() => {
          this.globalService.requestEvent.emit(100);
        })
      );
  }
}
