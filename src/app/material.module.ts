import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatInputModule, BrowserAnimationsModule],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule, BrowserAnimationsModule],
})
export class MaterialModule { }