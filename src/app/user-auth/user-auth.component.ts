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
  userName: string;

  constructor(private parkdService: ParkdService) { }

  ngOnInit() {
  }

  confirmUser() {
    this.parkdService.setUserAuth(this.userId);

    var nameResult = this.parkdService.getUserNameById(this.userId); 
    if(nameResult != null) {
      this.userName = nameResult;
    }
    else{
      this.userName = "מס' עובד לא נמצא";
      this.parkdService.resetUser();
    }
    
  }


}
