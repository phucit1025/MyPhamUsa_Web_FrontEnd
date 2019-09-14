import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'app/core/services/auth-guard.service';
import { UserPageComponent } from './pages/user-page/user-page.component';

const routes: Routes = [
  { path: '', component: UserPageComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
