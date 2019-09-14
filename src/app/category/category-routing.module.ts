import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'app/core/services/auth-guard.service';
import { CategoryPageComponent } from './pages/category-page/category-page.component';

const routes: Routes = [
  { path: '', component: CategoryPageComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
