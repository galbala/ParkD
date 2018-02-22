import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './/app-routing.module';
import { ParkSimulationPageComponent } from './park-simulation-page/park-simulation-page.component';
import { ParkDPageComponent } from './park-d-page/park-d-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ParkSimulationPageComponent,
    ParkDPageComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
