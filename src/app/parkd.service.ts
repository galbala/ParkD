import { Injectable } from '@angular/core';
import { ParkingLot } from './model/parking-lot';

@Injectable()
export class ParkdService {


  private userId: number;
  private parkingLotList: ParkingLot[];

  constructor() { 
    this.parkingLotList = [
      {id:1, name: 'חניון עובדים', totalPlaces:300, freePlaces: 10, reservedPlaces:0, aboutToBeFreePlaces:0  },
      {id:2, name: 'חניון דרום', totalPlaces:100, freePlaces: 0, reservedPlaces:2, aboutToBeFreePlaces:1},
      {id:3, name: 'חניון עבודה סוציאלית', totalPlaces:200, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1},
    ];

  }
 

  getParkingList(): ParkingLot [] {
    return this.parkingLotList;
  }

  setUserAuth(id: number) {
    this.userId = id;
    console.log(this.userId);
  }


}
