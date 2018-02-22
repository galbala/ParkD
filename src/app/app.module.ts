import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { MaterialModule } from './material.module';
import { ParkdService } from './parkd.service';
import { FormsModule } from '@angular/forms';
import { ParkStatusComponent } from './park-status/park-status.component';


@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent,
    ParkStatusComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule
  ],
  providers: [ParkdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
