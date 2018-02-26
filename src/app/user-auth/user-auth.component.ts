import { Component, OnInit } from '@angular/core';
import { ParkdService } from '../parkd.service';
import {FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  userId: string = "";
  
  constructor(private parkdService: ParkdService) { }

  ngOnInit() {
  }

  get userName(){
    if(this.parkdService.userName == null){
      return "מס' עובד לא נמצא";
    }
    else{
      return this.parkdService.userName;
    }
  }

  confirmUser() {
    this.parkdService.setUserAuth(Number(this.userId));
  }


}
