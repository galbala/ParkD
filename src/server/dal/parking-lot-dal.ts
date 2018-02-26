import { ParkingUser } from "../../app/model/parking-user";
import { UserAction, ActionType } from "../../app/model/user-action";
import { promisify } from '../helpers/helpers';
// import * as mongodb from "mongodb";

import { ParkingLot  } from "../../app/model/parking-lot";

this.parkingUserList = [
    {parkId:1, userId: 1000},
    {parkId:2, userId: 2000},
  ];

this.parkingLotList = [
    {id:1, name: 'חניון עובדים', totalPlaces:300, freePlaces: 10, reservedPlaces:0, aboutToBeFreePlaces:0, waitingToEnter: 0  },
    {id:2, name: 'חניון דרום', totalPlaces:100, freePlaces: 0, reservedPlaces:2, aboutToBeFreePlaces:1, waitingToEnter: 0},
    {id:3, name: 'חניון עבודה סוציאלית', totalPlaces:200, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1, waitingToEnter: 0},
    {id:4, name: 'חניון שקר כלשהו', totalPlaces:500, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1, waitingToEnter: 0},
];

this.userActionList = [
  {id: 1, userId: 1000, parkId: 1, actionType: ActionType.enter, actionTime: new Date() },
  {id: 1, userId: 2000, parkId: 1, actionType: ActionType.exit, actionTime: new Date() },
  {id: 1, userId: 3000, parkId: 2, actionType: ActionType.exit, actionTime: new Date() },
  {id: 1, userId: 4000, parkId: 2, actionType: ActionType.exit, actionTime: new Date() },
  {id: 1, userId: 5000, parkId: 3, actionType: ActionType.exit, actionTime: new Date() },
];

this.userList = [
  {userId: 1000, userName: "אודליה"},
  {userId: 2000, userName: "נועה"},
  {userId: 3000, userName: "אורלי"},
  {userId: 4000, userName: "גל"},
  {userId: 5000, userName: "דורון"}
];


export async function getParkingLots() {
  
  return this.parkingLotList;
}

export async function getUserList() {
  return this.userList;
}




export async function getParkingLotToExitFrom(userId: number) {
    var parkingUser: ParkingUser;
    parkingUser = this.parkingUserList.find(x => x.userId == userId);
    if (parkingUser != null)
      return this.getParkingLotById(parkingUser.parkId);
    else
      return null;
}

export function getParkingLotById(parkId: number) {
  return this.parkingLotList.find(x => x.id == parkId);
}


export function addUserAction(userAction: UserAction) {
  this.userActionList.push(userAction);//todo DB

  let parkingLot = this.getParkingLotById(userAction.parkId);
  if (userAction.actionType == ActionType.enter) {
    parkingLot.waitingToEnter++;
  }
  else {
    parkingLot.aboutToBeFreePlaces++;
  }
  setParkingLot(parkingLot);
}

function getUserAction(userId: number, actionType: ActionType): UserAction
{
  var foundAction = this.userActionList.find(x => x.userId == userId && x.actionType == actionType);
  return foundAction;
}


function setParkingLot(parkingLot: ParkingLot)
{
// todo: save in DB
}

function removeUserAction(userAction: UserAction, parkingLot: ParkingLot)
{
// todo: add save in DB to existing methid
  
  if (userAction.actionType == ActionType.enter) {
    parkingLot.waitingToEnter--;
  }
  else {
    parkingLot.aboutToBeFreePlaces--;
  }
  return parkingLot;
}

function addParkingUser(userId: number, parkId: number)
{
// todo: add to DB
}

function removeParkingUser(userId: number, parkId: number)
{
// todo: add to DB
}

export function gateEnter(userId: number, parkId: number): boolean 
{
  var enterResult: boolean = false;

  // // get parking lot to enter
  let parkingLot = this.getParkingLotById(parkId);

    // check if user already served parking
  var userEnterAction = getUserAction(userId, ActionType.enter);

  // check if there is free parking place
  if(parkingLot.freePlaces > 0 || (userEnterAction != null && parkingLot.reservedPlaces > 0))
  {
    if(userEnterAction == null) 
    {
      parkingLot.freePlaces--;
    }
    else 
    {
      parkingLot.reservedPlaces--;
      parkingLot = this.removeUserAction(userEnterAction, parkingLot); 
    }

    this.setParkingLot(parkingLot); // in db
    this.addParkingUser(userId, parkId); // in db

    enterResult = true;
  }
  
  return enterResult;
}

export function gateExit(userId: number, parkId: number): boolean 
{
  var exitResult: boolean = true;

  // get parking lot to exit
  let parkingLot = this.getParkingLotById(parkId);

  // check if user reported as one that about to exit
  var userAboutToExitAction = getUserAction(userId, ActionType.exit);

  parkingLot.freePlaces++;

  if(userAboutToExitAction != null)
  {
    parkingLot = this.removeUserAction(userAboutToExitAction, parkingLot);

    if (parkingLot.waitingToEnter > 0) {
      parkingLot.reservedPlaces++;
    }
    else {
      parkingLot.freePlaces++;
    }
  }
  else {
    parkingLot.freePlaces++;
  }

  this.setParkingLot(parkingLot); // in db
  this.removeParkingUser(userId, parkId); // in db

  return exitResult;
}