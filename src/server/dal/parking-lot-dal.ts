import { ParkingUser } from "../../app/model/parking-user";
import { UserAction, ActionType } from "../../app/model/user-action";

this.parkingUserList = [
    {parkId:1, userId: 1000},
    {parkId:2, userId: 2000},
  ];

  this.parkingLotList = [
    {id:1, name: 'חניון עובדים', totalPlaces:300, freePlaces: 10, reservedPlaces:0, aboutToBeFreePlaces:0  },
    {id:2, name: 'חניון דרום', totalPlaces:100, freePlaces: 0, reservedPlaces:2, aboutToBeFreePlaces:1},
    {id:3, name: 'חניון עבודה סוציאלית', totalPlaces:200, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1},
    {id:4, name: 'חניון שקר כלשהו', totalPlaces:500, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1},
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


export async function leaveParkingLot(userId : number, parkId : number ) {
    console.log("userId: " + userId + " , parkId: "+ parkId);
    return  [
        {id:1, name: 'חניון עובדים', totalPlaces:300, freePlaces: 11, reservedPlaces:0, aboutToBeFreePlaces:0  },
        {id:2, name: 'חניון דרום', totalPlaces:100, freePlaces: 0, reservedPlaces:2, aboutToBeFreePlaces:1},
        {id:3, name: 'חניון עבודה סוציאלית', totalPlaces:200, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1},
        {id:4, name: 'חניון שקר כלשהו', totalPlaces:500, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1},
    ];

}

export async function enterParkingLot(userId : number, parkId : number ) {
    console.log("userId: " + userId + " , parkId: "+ parkId);

    return this.parkingLotList;
}

export async function getParkingLotToExitFrom(userId: number) {
    var parkingUser: ParkingUser;
    parkingUser = this.parkingUserList.find(x => x.userId == userId);
    //console.log("*****************",parkingUser);
    if (parkingUser != null)
      return this.getParkingLotById(parkingUser.parkId);
    else
      return null;
}

export function getParkingLotById(parkId: number) {
  return this.parkingLotList.find(x => x.id == parkId);
}


export function addUserAction(userAction: UserAction) {
  this.userActionList.push(userAction);
  let parkingLot = this.getParkingLotById(userAction.parkId);
  return "שוריין עבורך " + parkingLot.name;
}
