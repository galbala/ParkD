import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatInputModule, BrowserAnimationsModule, MatCardModule, MatIconModule, MatDialogModule],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule, BrowserAnimationsModule, MatCardModule, MatIconModule, MatDialogModule],
})
export class MaterialModule { }