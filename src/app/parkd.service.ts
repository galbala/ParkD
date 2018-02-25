import { Injectable } from '@angular/core';
import { ParkingLot } from './model/parking-lot';
import { ParkingUser } from './model/parking-user';
import { UserAction, ActionType } from './model/user-action';

@Injectable()
export class ParkdService {

   userState: UserStateType;
  private userId: number = null;
  private parkingLotList: ParkingLot[];
  private parkingUserList: ParkingUser[];
  private userActionList: UserAction[];
   parkingLotToExitFrom: ParkingLot;

   

  constructor() { 
    this.parkingLotList = [
      {id:1, name: 'חניון עובדים', totalPlaces:300, freePlaces: 10, reservedPlaces:0, aboutToBeFreePlaces:0  },
      {id:2, name: 'חניון דרום', totalPlaces:100, freePlaces: 0, reservedPlaces:2, aboutToBeFreePlaces:1},
      {id:3, name: 'חניון עבודה סוציאלית', totalPlaces:200, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1},
    ];

    this.parkingUserList = [
      {parkId:1, userId: 1003},
      {parkId:1, userId: 1004},
      {parkId:1, userId: 1005},
      {parkId:2, userId: 2001},
      {parkId:2, userId: 2002},
      {parkId:3, userId: 3001},
      {parkId:3, userId: 3003},
    ];

    this.userActionList = [
      {id: 1, userId: 4001, parkId: 1, actionType: ActionType.enter, actionTime: new Date() },
      {id: 1, userId: 4002, parkId: 1, actionType: ActionType.exit, actionTime: new Date() },
      {id: 1, userId: 4003, parkId: 2, actionType: ActionType.exit, actionTime: new Date() },
      {id: 1, userId: 4004, parkId: 2, actionType: ActionType.exit, actionTime: new Date() },
      {id: 1, userId: 4005, parkId: 3, actionType: ActionType.exit, actionTime: new Date() },
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
  
  getParkingList(): ParkingLot [] {
    return this.parkingLotList;
  }

  setUserAuth(id: number) {
    this.userId = id;
    this.setUserState();
    console.log(this.userId);
  }

  reserveParking(parkingLot: ParkingLot){
    const userAction: UserAction = {
        id: 1,
        userId: this.userId,
        parkId: parkingLot.id,
        actionType: ActionType.enter,
        actionTime: new Date()
    };
    
    this.userActionList.push(userAction);

    alert ("שוריין עבורך " + parkingLot.name);

  }
}

export enum UserStateType {
  notExist = 0,
  enter = 1,
  exit  = 2,
}
