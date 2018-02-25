import { ParkingUser } from "../../app/model/parking-user";

export async function getParkingLots() {
    return [
        {id:1, name: 'חניון עובדים', totalPlaces:300, freePlaces: 10, reservedPlaces:0, aboutToBeFreePlaces:0  },
        {id:2, name: 'חניון דרום', totalPlaces:100, freePlaces: 0, reservedPlaces:2, aboutToBeFreePlaces:1},
        {id:3, name: 'חניון עבודה סוציאלית', totalPlaces:200, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1},
        {id:4, name: 'חניון שקר כלשהו', totalPlaces:500, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1},
    ];
}

export async function getParkingLotToExitFrom(userId: number) {
    var parkingUser: ParkingUser;
    parkingUser = this.parkingUserList.find(x => x.userId == userId);
    if (parkingUser != null)
      return this.getParkingLotById(parkingUser.parkId);
    else
      return null;
}