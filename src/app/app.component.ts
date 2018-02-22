import { Component } from '@angular/core';
import { ParkingLot } from './model/parking-lot';
import { ParkdService } from './parkd.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ParKD1';


  parkingLotStatusList: ParkingLot[];

  constructor(private parkdService: ParkdService) {
    this.parkingLotStatusList = parkdService.getParkingList();
  }

}
