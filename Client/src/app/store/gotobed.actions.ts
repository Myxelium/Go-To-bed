import { Action } from '@ngrx/store';
import { LoadSettingsState } from './gotobed.state';

export enum EGotobedActions {
    sendCommandChanged = '[GOTOBED] Command changed',
    addressSettingsChanged = '[GOTOBED] Address settings changed',
    protocolSettingsChanged = '[GOTOBED] Protocol settings changed',
    portSettingsChanged = '[GOTOBED] Port settings changed',
    appInitialized = '[GOTOBED] App initialized',
    macSettingsChanged = '[GOTOBED] Mac settings changed',
    WolAddressChanged = '[GOTOBED] Wake On Lan address changed',
}

export class SendCommandChanged implements Action {
    public readonly type = EGotobedActions.sendCommandChanged;
    constructor(public payload: string) { }
}

export class SaveAddressSettings implements Action {
    public readonly type = EGotobedActions.addressSettingsChanged;
    constructor(public payload: string) { }
}

export class ProtocolSettingsChanged implements Action {
    public readonly type = EGotobedActions.protocolSettingsChanged;
    constructor(public payload: string) { }
}

export class MacSettingsChanged implements Action {
    public readonly type = EGotobedActions.macSettingsChanged;
    constructor(public payload: string) { }
}

export class PortSettingsChanged implements Action {
    public readonly type = EGotobedActions.portSettingsChanged;
    constructor(public payload: string) { }
}

export class AppInitialized implements Action {
    public readonly type = EGotobedActions.appInitialized;
    constructor(public payload: LoadSettingsState) { }
}

export class WolAddressChanged implements Action {
    public readonly type = EGotobedActions.WolAddressChanged;
    constructor(public payload: string) { }
}

export type GotobedActions =
SendCommandChanged |
ProtocolSettingsChanged |
PortSettingsChanged |
SaveAddressSettings |
AppInitialized |
MacSettingsChanged |
WolAddressChanged;
