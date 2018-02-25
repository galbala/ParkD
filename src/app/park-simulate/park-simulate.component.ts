import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ParkingLot } from '../model/parking-lot';

@Component({
  selector: 'app-park-simulate',
  templateUrl: './park-simulate.component.html',
  styleUrls: ['./park-simulate.component.css']
})
export class ParkSimulateComponent implements OnInit {

  @Input() parkingLot: ParkingLot;
  @Output() getIn: EventEmitter<number> = new EventEmitter<number>();
  @Output() getOut: EventEmitter<number> = new EventEmitter<number>();

  constructor()  {

   }

  ngOnInit() {
  console.log(JSON.stringify(this.parkingLot)) ; 
  }

  enter(){
    this.getIn.emit(this.parkingLot.id);
  }

  exit(){
    this.getOut.emit(this.parkingLot.id);
  }

}
