import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatRippleModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import { GridModule } from '@progress/kendo-angular-grid';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';

@NgModule({
  declarations: [
    ProductPageComponent,
    ProductViewComponent,
    ProductCreateComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    GridModule,
  ]
})
export class ProductModule { }
