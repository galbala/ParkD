import { Component } from '@angular/core';
import { ParkingLot } from './model/parking-lot';
import { ParkdService } from './parkd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  parkingLotStatusList: ParkingLot[];

  constructor(private parkdService: ParkdService, private router: Router) {

  }

  navigate(path: string) {
    this.router.navigateByUrl(path);
  }

}
