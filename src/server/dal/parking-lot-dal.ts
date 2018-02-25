import { ParkingUser } from "../../app/model/parking-user";

this.parkingUserList = [
    {parkId:1, userId: 1003},
    {parkId:1, userId: 1004},
    {parkId:1, userId: 1005},
    {parkId:2, userId: 2001},
    {parkId:2, userId: 2002},
    {parkId:3, userId: 3001},
    {parkId:3, userId: 3003},
  ];

  this.parkingLotList = [
    {id:1, name: 'חניון עובדים', totalPlaces:300, freePlaces: 10, reservedPlaces:0, aboutToBeFreePlaces:0  },
    {id:2, name: 'חניון דרום', totalPlaces:100, freePlaces: 0, reservedPlaces:2, aboutToBeFreePlaces:1},
    {id:3, name: 'חניון עבודה סוציאלית', totalPlaces:200, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1},
    {id:4, name: 'חניון שקר כלשהו', totalPlaces:500, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1},
];

export async function getParkingLots() {
<<<<<<< HEAD
    return [
        {id:1, name: 'חניון עובדים', totalPlaces:300, freePlaces: 10, reservedPlaces:0, aboutToBeFreePlaces:0  },
        {id:2, name: 'חניון דרום', totalPlaces:100, freePlaces: 0, reservedPlaces:2, aboutToBeFreePlaces:1},
        {id:3, name: 'חניון עבודה סוציאלית', totalPlaces:200, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1},
        {id:4, name: 'חניון שקר כלשהו', totalPlaces:500, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1},
    ];
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
    return [
         {id:1, name: 'חניון עובדים', totalPlaces:300, freePlaces: 12, reservedPlaces:0, aboutToBeFreePlaces:0  },
         {id:2, name: 'חניון דרום', totalPlaces:100, freePlaces: 0, reservedPlaces:2, aboutToBeFreePlaces:1},
         {id:3, name: 'חניון עבודה סוציאלית', totalPlaces:200, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1},
         {id:4, name: 'חניון שקר כלשהו', totalPlaces:500, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1},
     ];

=======
    return this.parkingLotList;
}

export async function getParkingLotToExitFrom(userId: number) {
    var parkingUser: ParkingUser;
    parkingUser = this.parkingUserList.find(x => x.userId == userId);
    if (parkingUser != null)
      return this.getParkingLotById(parkingUser.parkId);
    else
      return null;
}

export async function getParkingLotById(userId: number) {
>>>>>>> 8c1d032fd28024d375c44500c7a75894eece5415
}