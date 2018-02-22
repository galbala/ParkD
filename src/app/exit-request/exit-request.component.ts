import { Component, OnInit, Input } from '@angular/core';
import { ParkingLot } from '../model/parking-lot';

@Component({
  selector: 'app-exit-request',
  templateUrl: './exit-request.component.html',
  styleUrls: ['./exit-request.component.css']
})
export class ExitRequestComponent implements OnInit {


  @Input() parkingLotToExit: ParkingLot;

  constructor() { }

  ngOnInit() {
  }

  exit() {
  }

}
