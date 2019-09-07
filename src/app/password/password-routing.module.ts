import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordPageComponent } from './pages/password-page/password-page.component';
import { AuthGuardService } from 'app/core/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: PasswordPageComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordRoutingModule { }
