import { Component, OnInit } from '@angular/core';
import { ParkingLot } from '../model/parking-lot';
import { ParkdService } from '../parkd.service';

@Component({
  selector: 'app-park-simulation-page',
  templateUrl: './park-simulation-page.component.html',
  styleUrls: ['./park-simulation-page.component.css']
})
export class ParkSimulationPageComponent implements OnInit {

  parkingLotStatusList: ParkingLot[];

  get parkingLotToExitFrom(): ParkingLot {
    return this.parkingLotStatusList[0];
  }

  constructor(private parkdService: ParkdService) { 
    //this.parkingLotStatusList = parkdService.getParkingList();
  }

  async ngOnInit() {
    this.parkingLotStatusList = await this.parkdService.getParkingList();
  }

  //ngOnInit() {
  //}

  onGetIn(parkId: number){
    this.parkdService.getIn(parkId);
  }

  onGetOut(parkId: number){
    this.parkdService.getOut(parkId);
  }


}
