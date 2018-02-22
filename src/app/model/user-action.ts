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


