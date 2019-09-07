import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizeRoutingModule } from './authorize-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatRippleModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    AuthorizeRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class AuthorizeModule { }
