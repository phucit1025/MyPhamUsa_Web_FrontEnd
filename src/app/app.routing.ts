import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuardService } from './core/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
      canActivate: [AuthGuardService],
    }],
  },
  {
    path: 'password',
    loadChildren: './password/password.module#PasswordModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'product',
    loadChildren: './product/product.module#ProductModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'account',
    loadChildren: './user/user.module#UserModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'category',
    loadChildren: './category/category.module#CategoryModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'storage',
    loadChildren: './storage/storage.module#StorageModule',
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
