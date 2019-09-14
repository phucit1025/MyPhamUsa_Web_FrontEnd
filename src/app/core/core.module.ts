import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { KudoImageUploadComponent } from './components/kudo-image-upload/kudo-image-upload.component';
import { KudoJsonArrayPipe } from './pipes/kudo-json-array.pipe';
import { MatDialogModule } from '@angular/material';
import { KudoCurrencyFormatPipe } from './pipes/kudo-currency-format.pipe';

@NgModule({
  declarations: [
    KudoImageUploadComponent,
    KudoJsonArrayPipe,
    KudoCurrencyFormatPipe,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatDialogModule,
  ],
  exports: [
    KudoImageUploadComponent,
    KudoJsonArrayPipe,
    KudoCurrencyFormatPipe,
  ],
})
export class CoreModule { }
