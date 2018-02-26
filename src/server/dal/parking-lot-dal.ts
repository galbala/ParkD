import { ParkingUser } from "../../app/model/parking-user";
import { UserAction, ActionType, ExitReqResultType, EnterReqResultType } from "../../app/model/user-action";
import { promisify } from '../helpers/helpers';
import * as mongodb from "mongodb";

import { ParkingLot  } from "../../app/model/parking-lot";

mongodb.Cursor.prototype.toArrayAsync = promisify(mongodb.Cursor.prototype.toArray);
mongodb.Collection.prototype.findAsync = promisify(mongodb.Collection.prototype.find);
mongodb.Collection.prototype.updateAsync = promisify(mongodb.Collection.prototype.update);
mongodb.Collection.prototype.insertOneAsync = promisify(mongodb.Collection.prototype.insertOne);
mongodb.Collection.prototype.removeAsync = promisify(mongodb.Collection.prototype.remove);

let client;
let db;
const connect: (url: string)=>Promise<any> = promisify(mongodb.MongoClient.connect);


// this.parkingUserList = [
//     {parkId:1, userId: 1000},
//     {parkId:2, userId: 2000},
//   ];

// this.parkingLotList = [
//     {id:1, name: 'חניון עובדים', totalPlaces:300, freePlaces: 10, reservedPlaces:0, aboutToBeFreePlaces:0, waitingToEnter: 0  },
//     {id:2, name: 'חניון דרום', totalPlaces:100, freePlaces: 0, reservedPlaces:2, aboutToBeFreePlaces:1, waitingToEnter: 0},
//     {id:3, name: 'חניון עבודה סוציאלית', totalPlaces:200, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1, waitingToEnter: 0},
//     {id:4, name: 'חניון שקר כלשהו', totalPlaces:500, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1, waitingToEnter: 0},
// ];

// this.userActionList = [
//   {id: 1, userId: 1000, parkId: 1, actionType: ActionType.enter, actionTime: new Date() },
//   {id: 1, userId: 2000, parkId: 1, actionType: ActionType.exit, actionTime: new Date() },
//   {id: 1, userId: 3000, parkId: 2, actionType: ActionType.exit, actionTime: new Date() },
//   {id: 1, userId: 4000, parkId: 2, actionType: ActionType.exit, actionTime: new Date() },
//   {id: 1, userId: 5000, parkId: 3, actionType: ActionType.exit, actionTime: new Date() },
// ];

// this.userList = [
//   {userId: 1000, userName: "אודליה"},
//   {userId: 2000, userName: "נועה"},
//   {userId: 3000, userName: "אורלי"},
//   {userId: 4000, userName: "גל"},
//   {userId: 5000, userName: "דורון"}
// ];

export async function getParkingLots() {
  client = await connect("mongodb://localhost:27017");
  db = client.db("parkD");
  const parkingLotList = db.collection("parkingLotList");
  const parkingLots = await parkingLotList.find({}).toArrayAsync();
  client.close();
  return parkingLots;
}

export async function getUserList() {
  client = await connect("mongodb://localhost:27017");
  db = client.db("parkD");
  const usersList = db.collection("userList");
  const users = await usersList.find({}).toArrayAsync();
  client.close();
  return users;

}

export async function getParkingLotById(parkId) {
  client = await connect("mongodb://localhost:27017");
  db = client.db("parkD");
  const parkingLotList = db.collection("parkingLotList");
  const parkingLot = await parkingLotList.find({ id: parkId }).toArrayAsync();
  client.close();
  if (parkingLot != null && parkingLot.length > 0)
    return parkingLot[0];
  else
    return null;

  
}

export async function getParkingLotToExitFrom(currentUserId: number) {
  client = await connect("mongodb://localhost:27017");
  db = client.db("parkD");
  const parkingUserList = db.collection("parkingUserList");
  const parkingUser = await parkingUserList.find({ userId: Number(currentUserId) }).toArrayAsync();
  client.close();
  
  
  console.log(parkingUser[0]);
  if (parkingUser != null && parkingUser.length > 0)
    return await getParkingLotById(parkingUser[0].parkId);
  else
    return null;
}

export async function addUserAction(userAction: UserAction) {
  client = await connect("mongodb://localhost:27017");
  db = client.db("parkD");
  const userActionList = db.collection("userActionList");
  await userActionList.insertOneAsync( {userId: userAction.userId, parkId: userAction.parkId, actionType: userAction.actionType, actionTime: userAction.actionTime});
  
  client.close();


  let parkingLot = await getParkingLotById(userAction.parkId);
  if (userAction.actionType == ActionType.enter) {
    parkingLot.waitingToEnter++;
  }
  else {
    parkingLot.aboutToBeFreePlaces++;
  }
  setParkingLot(parkingLot);
}

async function getUserAction(userId: number, actionType: ActionType)
{
console.log(userId);
console.log(actionType);

  client = await connect("mongodb://localhost:27017");
  db = client.db("parkD");
  const userActionList = db.collection("userActionList");
  const userActions = await userActionList.find({ userId: userId, actionType: actionType }).toArrayAsync();
  client.close();
  if (userActions != null && userActions.length > 0)
    return userActions[0];
  else
    return null;
  


  
}

export async function setParkingLot(parkingLot: ParkingLot)
{
  client = await connect("mongodb://localhost:27017");
  db = client.db("parkD");
  const parkingLotList = db.collection("parkingLotList");
  console.log(parkingLotList.find({ id: parkingLot.id }));

  await parkingLotList.updateAsync({id:parkingLot.id}, {id: parkingLot.id, name:parkingLot.name, totalPlaces:parkingLot.totalPlaces,
    freePlaces:parkingLot.freePlaces,reservedPlaces:parkingLot.reservedPlaces,aboutToBeFreePlaces:parkingLot.aboutToBeFreePlaces,waitingToEnter:parkingLot.waitingToEnter});
  client.close();

  return parkingLot;

}

async function removeUserAction(userAction: UserAction, parkingLot: ParkingLot)
{
  client = await connect("mongodb://localhost:27017");
  db = client.db("parkD");
  const userActionList = db.collection("userActionList");
  await userActionList.removeAsync( {userId: userAction.userId, parkId: userAction.parkId, actionType: userAction.actionType, actionTime: userAction.actionTime});

  client.close();

  if (userAction.actionType == ActionType.enter) {
    parkingLot.waitingToEnter--;
  }
  else {
    parkingLot.aboutToBeFreePlaces--;
  }
  return parkingLot;
}

async function addParkingUser(userId: number, parkId: number)
{
  client = await connect("mongodb://localhost:27017");
  db = client.db("parkD");
  const parkingUserList = db.collection("parkingUserList");
  await parkingUserList.insertOneAsync( {userId: userId, parkId: parkId});

  client.close();
}

async function getParkingUser(userId: number, parkId: number)
{
  client = await connect("mongodb://localhost:27017");
  db = client.db("parkD");
  const parkingUserList = db.collection("parkingUserList");
  const parkingUser = await parkingUserList.find({ userId: userId, parkId: parkId }).toArrayAsync();
  client.close();
  if (parkingUser != null && parkingUser.length > 0)
    return parkingUser[0];
  else
    return null;
  
}

async function removeParkingUser(userId: number, parkId: number)
{
  client = await connect("mongodb://localhost:27017");
  db = client.db("parkD");
  const parkingUserList = db.collection("parkingUserList");
  await parkingUserList.removeAsync( {userId: userId, parkId: parkId});

  client.close();

}

export async function gateEnter(userId: number, parkId: number) 
{
  var enterResult: EnterReqResultType = EnterReqResultType.NoFreePlaces;

  // // get parking lot to enter
  let parkingLot = await getParkingLotById(parkId);

    // check if user already served parking
  var userEnterAction = await getUserAction(userId, ActionType.enter);

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
      parkingLot = await removeUserAction(userEnterAction, parkingLot); 
    }

    await setParkingLot(parkingLot); // in db
    await addParkingUser(userId, parkId); // in db

    enterResult = EnterReqResultType.enterAllowed;
  }
  else {
    if (userEnterAction == null) {// user was not registered to reserve parking
      enterResult = EnterReqResultType.NoFreePlaces;
    }
    else {
      enterResult = EnterReqResultType.shouldWait;
    }
  }
  return enterResult;
}

export async function gateExit(userId: number, parkId: number) 
{
  var exitResult: ExitReqResultType = ExitReqResultType.NotInThisParkingLot;

  // get parking lot to exit
  let parkingLot = await getParkingLotById(parkId);
  var userIsInParkingLot = getParkingUser(userId, parkId);
  // check if user reported as one that about to exit
  var userAboutToExitAction = await getUserAction(userId, ActionType.exit);

  if (userIsInParkingLot != null)
  {
    if(userAboutToExitAction != null)
    {
      parkingLot = await removeUserAction(userAboutToExitAction, parkingLot);

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

    await setParkingLot(parkingLot); // in db
    await removeParkingUser(userId, parkId); // in db
    exitResult = ExitReqResultType.exitAllowed;
  }  

  return exitResult;
}