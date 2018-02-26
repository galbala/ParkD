import { Injectable } from '@angular/core';
import { ParkingLot } from './model/parking-lot';
import { ParkingUser } from './model/parking-user';
import { UserAction, ActionType } from './model/user-action';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { User } from './model/user';
import { MatDialog } from '@angular/material';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';


@Injectable()
export class ParkdService {

   userState: UserStateType;
  private userId: number = null;
  userName: string = null;
  private parkingLotList: ParkingLot[] = [];
  private userList: User[] = [];

  //private parkingUserList: ParkingUser[];
  private userActionList: UserAction[];
   parkingLotToExitFrom: ParkingLot;

  constructor(private http: HttpClient, public dialog: MatDialog) { 

    this.getUsersList();

    // this.parkingUserList = [
    //   {parkId:1, userId: 1003},
    //   {parkId:1, userId: 1004},
    //   {parkId:1, userId: 1005},
    //   {parkId:2, userId: 2001},
    //   {parkId:2, userId: 2002},
    //   {parkId:3, userId: 3001},
    //   {parkId:3, userId: 3003},
    // ];

    this.userActionList = [
      {id: 1, userId: 1000, parkId: 1, actionType: ActionType.enter, actionTime: new Date() },
      {id: 1, userId: 2000, parkId: 1, actionType: ActionType.exit, actionTime: new Date() },
      {id: 1, userId: 3000, parkId: 2, actionType: ActionType.exit, actionTime: new Date() },
      {id: 1, userId: 4000, parkId: 2, actionType: ActionType.exit, actionTime: new Date() },
      {id: 1, userId: 5000, parkId: 3, actionType: ActionType.exit, actionTime: new Date() },
    ];
    this.parkingLotToExitFrom = null;
    this.setUserState();
  }
 
  public resetUser(){
    this.userId = null;
    this.userName = null;
    this.setUserState();
  }

 
  private async setUserState() {
    var parkingUser: ParkingUser;

    if (this.userId == null){
      this.userState = UserStateType.notExist;
      this.userName = "";
    }
    else {
      this.userName = this.getUserNameById(this.userId); 
      if(this.userName == null){
        this.userState = UserStateType.notExist;
      }
      else{
        this.parkingLotToExitFrom = await this.getParkingLotToExitFrom(this.userId);
      
        if (this.parkingLotToExitFrom != null)
          this.userState = UserStateType.exit;
        else
          this.userState = UserStateType.enter;
        }
    }
  }

  private async getParkingLotToExitFrom(userId: number): Promise<ParkingLot> {
    var response = await this.http.get("/api/getParkingLotToExitFrom/"+userId).toPromise(); 
    return response as ParkingLot;    
  }

  private getParkingLotById(parkId: number): ParkingLot {
    return this.parkingLotList.find(x => x.id == parkId);
  }
  

  async getUsersList(): Promise<User[]> {
    var response = await this.http.get("/api/getUserList").toPromise(); 
    this.userList = response as User[];
    return this.userList;
  }

  async getParkingList(): Promise<ParkingLot[]> {
    var response = await this.http.get("/api/getParkingLots").toPromise(); 
    this.parkingLotList = response as ParkingLot[];
    return this.parkingLotList;
  }

  setUserAuth(id: number) {
    this.userId = id;
    this.setUserState();
    console.log(this.userId + " , " + this.userState);
  }

  reserveParking(parkingLot: ParkingLot){
    console.log(parkingLot);
    const userAction: UserAction = {
        id: 1,
        userId: this.userId,
        parkId: parkingLot.id,
        actionType: ActionType.enter,
        actionTime: new Date()
    };
    
    this.userActionList.push(userAction);

    let dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '420px',
      height: "170px",
      disableClose: true,
      data: { actionType: ActionType.enter, parkingLotName: parkingLot.name, userName: this.getUserNameById(this.userId) }
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload();
    });
  }

  exitFromParking(parkingLot: ParkingLot){
    let dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '430px',
      height: "190px",
      disableClose: true,
      data: { actionType: ActionType.exit, parkingLotName: parkingLot.name, userName: this.getUserNameById(this.userId) }
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload();
    });

  }

  async getOut(parkId: number){
    let dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '430px',
      height: "190px",
      disableClose: true,
      data: { isSimulator: true, actionType: ActionType.exit, userName: this.getUserNameById(this.userId) }
    });

    dialogRef.afterClosed().subscribe(result => {});

    // try{
    //     await this.http.post("/api/getOut", 
    //                           {userId: this.userId, 
    //                             parkId: parkId}
    //     ).toPromise();
        
    // }
    // catch (err){
    //   console.log(err);
    // }

  }


  async getIn(parkId: number){
    let dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '430px',
      height: "190px",
      disableClose: true,
      data: { isSimulator: true, actionType: ActionType.enter, userName: this.getUserNameById(this.userId) }
    });

    dialogRef.afterClosed().subscribe(result => {});
    // try{
    //   await this.http.post("/api/getIn", 
    //                         {userId: this.userId, 
    //                          parkId: parkId}
    //   ).toPromise();
      
    // }
    // catch (err){
    //   console.log(err);
    // }
    
  }

  getUserNameById(userId: number): string {
    var foundUser = this.userList.find(x => x.userId == userId);
    if(foundUser != null) {
      return foundUser.userName;
    }

    return null;
  }

}

export enum UserStateType {
  notExist = 0,
  enter = 1,
  exit  = 2,
}
