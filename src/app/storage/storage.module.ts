import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageRoutingModule } from './storage-routing.module';
import { StoragePageComponent } from './pages/storage-page/storage-page.component';
import { StorageViewComponent } from './components/storage-view/storage-view.component';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [StoragePageComponent, StorageViewComponent],
  imports: [
    CommonModule,
    StorageRoutingModule,
    GridModule,
  ]
})
export class StorageModule { }
