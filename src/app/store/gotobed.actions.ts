import { Action } from "@ngrx/store";

export enum EGotobedActions {
    SendCommandChanged = '[GOTOBED] Command changed',
}

export class SendCommandChanged implements Action {
    public readonly type = EGotobedActions.SendCommandChanged;
    constructor(public payload: string) { }
}

export type GotobedActions = SendCommandChanged;