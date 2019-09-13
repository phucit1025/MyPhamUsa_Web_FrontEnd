import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { KudoImageUploadComponent } from './components/kudo-image-upload/kudo-image-upload.component';
import { KudoJsonArrayPipe } from './pipes/kudo-json-array.pipe';

@NgModule({
  declarations: [
    KudoImageUploadComponent,
    KudoJsonArrayPipe,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
  ],
  exports: [
    KudoImageUploadComponent,
    KudoJsonArrayPipe,
  ],
})
export class CoreModule { }
