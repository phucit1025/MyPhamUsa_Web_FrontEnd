import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRoutingModule } from './password-routing.module';
import { PasswordPageComponent } from './pages/password-page/password-page.component';
import {
  MatButtonModule,
  MatRippleModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PasswordPageComponent],
  imports: [
    CommonModule,
    PasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class PasswordModule { }
