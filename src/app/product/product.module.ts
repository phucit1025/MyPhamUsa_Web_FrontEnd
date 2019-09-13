import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';

import { ProductRoutingModule } from './product-routing.module';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatRippleModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
} from '@angular/material';
import { GridModule } from '@progress/kendo-angular-grid';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { CoreModule } from 'app/core/core.module';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

@NgModule({
  declarations: [
    ProductPageComponent,
    ProductViewComponent,
    ProductCreateComponent,
    ProductEditComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    TextMaskModule,
    GridModule,
  ],
  entryComponents: [
    ProductEditComponent,
  ],
})
export class ProductModule { }
