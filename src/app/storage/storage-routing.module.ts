import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'app/core/services/auth-guard.service';
import { StoragePageComponent } from './pages/storage-page/storage-page.component';

const routes: Routes = [
  { path: '', component: StoragePageComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorageRoutingModule { }
