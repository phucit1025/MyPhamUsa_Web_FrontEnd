import { Component, OnInit} from '@angular/core';
import { GlobalService } from './core/services/global.service';
import { LoginService } from './authorize/services/login.service';
import { AuthGuardService } from './core/services/auth-guard.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    public authGuardService: AuthGuardService,
    public globalService: GlobalService
  ) {}

  ngOnInit() {
    this.loginService.getAdminInfo()
      .then(
        (response) => {
          console.log(response);
          if (this.authGuardService.getToken()) {
            this.globalService.isLogin = true;
          }
        },
        error => console.error(error)
      );
  }
}
