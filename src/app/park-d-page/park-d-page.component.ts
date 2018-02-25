import { Component, OnInit } from '@angular/core';
import { ParkingLot } from '../model/parking-lot';
import { ParkdService, UserStateType } from '../parkd.service';

@Component({
  selector: 'app-park-d-page',
  templateUrl: './park-d-page.component.html',
  styleUrls: ['./park-d-page.component.css']
})
export class ParkDPageComponent implements OnInit {

  parkingLotStatusList: ParkingLot[];

  get parkingLotToExitFrom(): ParkingLot {
    return this.parkdService.parkingLotToExitFrom;
  }


  constructor(private parkdService: ParkdService) {

  }


  async ngOnInit() {
    this.parkingLotStatusList = await this.parkdService.getParkingList();
  }

  get userState() {
    return this.parkdService.userState;
  }
  

  onReserveParking(parkingLot: ParkingLot){
    this.parkdService.reserveParking(parkingLot);
  }

  onExitFromParking(parkingLotToExit: ParkingLot){
    this.parkdService.exitFromParking(parkingLotToExit);
  }

}
