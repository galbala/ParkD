export class ParkingLot {

    id: number;
    name: string;
    totalPlaces: number;
    freePlaces: number;
    reservedPlaces: number; // חנייה שהתפנתה אך שוריינה ע"י ממישהו אחר
    aboutToBeFreePlaces: number; // צפוי להתפנות 
    waitingToEnter: number; // סהכ משתמשים שנרשמו להיכנס לחניון (שריינו) 
}
