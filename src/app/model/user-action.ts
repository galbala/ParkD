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


export enum EnterReqResultType {
    enterAllowed = 1,
    shouldWait = 2,       // not allowed, המשתמש שריין מקום אך עדיין לא התפנה
    NoFreePlaces  = 3
}


export enum ExitReqResultType {
    exitAllowed = 1,
    NotInThisParkingLot  = 2
}

