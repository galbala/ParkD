import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { MaterialModule } from './material.module';
import { ParkdService } from './parkd.service';
import { FormsModule } from '@angular/forms';
import { ParkStatusComponent } from './park-status/park-status.component';
import { AppRoutingModule } from './/app-routing.module';
import { ParkSimulationPageComponent } from './park-simulation-page/park-simulation-page.component';
import { ParkDPageComponent } from './park-d-page/park-d-page.component';
import { ExitRequestComponent } from './exit-request/exit-request.component';
import { ParkSimulateComponent } from './park-simulate/park-simulate.component';
import { HttpClientModule } from '@angular/common/http';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent,
    ParkStatusComponent,
    ParkSimulationPageComponent,
    ParkDPageComponent,
    ExitRequestComponent,
    ParkSimulateComponent,
    InfoDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  entryComponents: [InfoDialogComponent],
  providers: [ParkdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
