export class UserAction {
    id: number;
    userId: number;
    parkId: number;
    actionType: ActionType;
    actionTime: Date;
}

export enum ActionType {
    enter = 1,
    exit  = 2,
}


export enum AboutToExitResultType {
    Done = 1,
    AlreadyAboutToExit = 2,
    Failed = 3
}

export enum ReserveResultType {
    Reserved = 1,
    AlreadyReservedOther = 2,
    FailedToReserve = 3
}

export enum EnterReqResultType {
    enterAllowed = 1,
    shouldWait = 2,       // not allowed, המשתמש שריין מקום אך עדיין לא התפנה
    NoFreePlaces  = 3,
    AlreadyParkedHere = 4,
    AlreadyParkedInOther = 5,
    ReservedPlaceInOther = 6
}


export enum ExitReqResultType {
    exitAllowed = 1,
    NotInAnyParkingLot  = 2,
    InAnotherParkingLot = 3
    
}

