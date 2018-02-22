import { Injectable } from '@angular/core';
import { ParkingLot } from './model/parking-lot';

@Injectable()
export class ParkdService {


  private userId: number;
  private parkingLotList: ParkingLot[];

  constructor() { }

  ///
  getParkingList(): ParkingLot[] {
  }

  setUserAuth(id: number) {
    this.userId = id;
    console.log(this.userId);
  }


}
