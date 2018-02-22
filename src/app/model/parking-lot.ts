export class ParkingLot {

    id: number;
    name: string;
    totalPlaces: number;
    freePlaces: number;
    reservedPlaces: number; // חנייה שהתפנתה אך שוריינה ע"י ממישהו אחר
    aboutToBeFreePlaces: number; // צפוי להתפנות ללא אלו שכבר שוריינו כלומר כמות החניות שאפשר לשריין

}
