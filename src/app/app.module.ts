import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
