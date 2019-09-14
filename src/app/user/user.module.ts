import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    UserPageComponent,
    UserViewComponent,
    UserCreateComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    GridModule,
  ],
  entryComponents: [
    UserCreateComponent,
  ],
})
export class UserModule { }
