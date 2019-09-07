import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/authorize/services/login.service';
import { AuthGuardService } from 'app/core/services/auth-guard.service';
import { GlobalService } from 'app/core/services/global.service';
import { Router } from '@angular/router';
import { Token } from 'app/core/models/token';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  loginFailed: string;

  constructor(
    private loginService: LoginService,
    private authGuardService: AuthGuardService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    const token: Token = this.authGuardService.getToken();
    if (token) {
      this.router.navigate(['/']);
    }
    this.form = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      const credential = this.form.value;
      this.loginService.login(credential)
        .then(
          (response: Token) => {
            if (response) {
              this.authGuardService.setToken(response, credential.username);
              this.router.navigate(['/']);
              this.globalService.isLogin = true;
              this.globalService.username = credential.username;
            }
          },
          error => {
            console.error(error);
            this.globalService.isLogin = false;
            this.loginFailed = 'Tên đăng nhập hoặc Mật khẩu không đúng.';
          }
        );
    }
  }

  resetLoginFailed() {
    this.loginFailed = null;
  }

}
