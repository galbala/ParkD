
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ParkingLot } from '../model/parking-lot';


@Component({
  selector: 'app-exit-request',
  templateUrl: './exit-request.component.html',
  styleUrls: ['./exit-request.component.css']
})
export class ExitRequestComponent implements OnInit {


  @Input() parkingLotToExit: ParkingLot;
  @Output() exitFromParking: EventEmitter<ParkingLot> = new EventEmitter<ParkingLot>();
  
  constructor() { }

  ngOnInit() {
    console.log(this.parkingLotToExit);
  }

  exitFromParkingClicked() {
    this.exitFromParking.emit(this.parkingLotToExit);
  }

}
