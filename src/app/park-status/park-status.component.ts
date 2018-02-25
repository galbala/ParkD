import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ParkingLot } from '../model/parking-lot';

@Component({
  selector: 'app-park-status',
  templateUrl: './park-status.component.html',
  styleUrls: ['./park-status.component.css']
})
export class ParkStatusComponent implements OnInit {
  @Input() parkingLot: ParkingLot;
  @Output() reserveParking: EventEmitter<ParkingLot> = new EventEmitter<ParkingLot>();
  constructor() { }

  ngOnInit() {
    console.log(JSON.stringify(this.parkingLot)) ; }

  reserve() {
    this.reserveParking.emit(this.parkingLot);
  }

}
