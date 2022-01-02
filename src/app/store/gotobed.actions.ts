import { Action } from '@ngrx/store';
import { LoadSettingsState } from './gotobed.state';

export enum EGotobedActions {
    SendCommandChanged = '[GOTOBED] Command changed',
    AddressSettingsChanged = '[GOTOBED] Address settings changed',
    ProtocolSettingsChanged = '[GOTOBED] Protocol settings changed',
    PortSettingsChanged = '[GOTOBED] Port settings changed',
    AppInitialized = '[GOTOBED] App initialized',
}

export class SendCommandChanged implements Action {
    public readonly type = EGotobedActions.SendCommandChanged;
    constructor(public payload: string) { }
}

export class SaveAddressSettings implements Action {
    public readonly type = EGotobedActions.AddressSettingsChanged;
    constructor(public payload: string) { }
}

export class ProtocolSettingsChanged implements Action {
    public readonly type = EGotobedActions.ProtocolSettingsChanged;
    constructor(public payload: string) { }
}

export class PortSettingsChanged implements Action {
    public readonly type = EGotobedActions.PortSettingsChanged;
    constructor(public payload: string) { }
}

export class AppInitialized implements Action {
    public readonly type = EGotobedActions.AppInitialized;
    constructor(public payload: LoadSettingsState) { }
}

export type GotobedActions = 
SendCommandChanged |
ProtocolSettingsChanged | 
PortSettingsChanged |
SaveAddressSettings | 
AppInitialized;
