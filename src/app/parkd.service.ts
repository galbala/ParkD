import { Injectable } from '@angular/core';
import { ParkingLot } from './model/parking-lot';
import { ParkingUser } from './model/parking-user';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ParkdService {

   userState: UserStateType;
  private userId: number = null;
  private parkingLotList: ParkingLot[] = [];
  private parkingUserList: ParkingUser[];
   parkingLotToExitFrom: ParkingLot;

  constructor(private http: HttpClient) { 

    this.parkingUserList = [
      {parkId:1, userId: 1003},
      {parkId:1, userId: 1004},
      {parkId:1, userId: 1005},
      {parkId:2, userId: 2001},
      {parkId:2, userId: 2002},
      {parkId:3, userId: 3001},
      {parkId:3, userId: 3003},
    ];

    this.parkingLotToExitFrom = null;
    this.setUserState();
  }
 
  

  private setUserState() {
    var parkingUser: ParkingUser;
    if (this.userId == null)
      this.userState = UserStateType.notExist;
    else{
      parkingUser = this.parkingUserList.find(x => x.userId == this.userId);
      if (parkingUser != null){
        this.userState = UserStateType.exit;
        this.parkingLotToExitFrom = this.getParkingLotById(parkingUser.parkId);
      }
      else
      this.userState = UserStateType.enter;
    }
  }

  private getParkingLotById(parkId: number): ParkingLot {
    return this.parkingLotList.find(x => x.id == parkId);
  }
  
  async getParkingList(): Promise<ParkingLot[]> {
    var response = await this.http.get("/api/getParkingLots").toPromise(); 
    this.parkingLotList = response as ParkingLot[];
    return this.parkingLotList;
  }

  setUserAuth(id: number) {
    this.userId = id;
    this.setUserState();
    console.log(this.userId);
  }

  reserveParking(parkingLot: ParkingLot){
    alert ("משריין לך את חניון " + parkingLot.name);

  }

  exitFromParking(parkingLot: ParkingLot){
    alert ("יוצא מחניון " + parkingLot.name);

  }
}

export enum UserStateType {
  notExist = 0,
  enter = 1,
  exit  = 2,
}
