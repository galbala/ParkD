import { Component, OnInit, Input } from '@angular/core';
import { ParkingLot } from '../model/parking-lot';

@Component({
  selector: 'app-park-status',
  templateUrl: './park-status.component.html',
  styleUrls: ['./park-status.component.css']
})
export class ParkStatusComponent implements OnInit {
  @Input() parkingLot: ParkingLot;
  constructor() { }

  ngOnInit() {
  }

  reserve() {
    alert('reserve');
  }

}
