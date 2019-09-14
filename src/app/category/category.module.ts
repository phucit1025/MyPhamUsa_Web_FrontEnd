import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { CategoryViewComponent } from './components/category-view/category-view.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [
    CategoryPageComponent,
    CategoryViewComponent,
    CategoryCreateComponent,
    CategoryEditComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    CommonModule,
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
    CategoryCreateComponent,
    CategoryEditComponent,
  ],
})
export class CategoryModule { }
