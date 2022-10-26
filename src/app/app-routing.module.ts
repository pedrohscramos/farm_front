import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component'
import { FarmComponent } from './farm/farm.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { FarmDetailsComponent } from './farm-details/farm-details.component';
import { FarmCreateComponent } from './farm-create/farm-create.component';
import { FarmEditComponent } from './farm-edit/farm-edit.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'farm', component: FarmComponent },
  { path: 'details/:id', component: FarmDetailsComponent },
  { path: 'edit/:id', component: FarmEditComponent },
  { path: 'create', component: FarmCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
