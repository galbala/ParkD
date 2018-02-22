import { Component, OnInit } from '@angular/core';
import { ParkdService } from '../parkd.service';
import {FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {


  userId: number;

  constructor(private parkdService: ParkdService) { }

  ngOnInit() {
  }


  confirmUser() {
    this.parkdService.setUserAuth(this.userId);
  }


}
