import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { AuthGuardService } from 'app/core/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: ProductPageComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
