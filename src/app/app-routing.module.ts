import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkSimulationPageComponent } from './park-simulation-page/park-simulation-page.component';
import { ParkDPageComponent } from './park-d-page/park-d-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/parkd', pathMatch: 'full' },
  { path: 'simulation', component: ParkSimulationPageComponent },
  { path: 'parkd', component: ParkDPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }


