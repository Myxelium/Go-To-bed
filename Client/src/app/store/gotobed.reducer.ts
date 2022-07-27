import { EGotobedActions, GotobedActions } from './gotobed.actions';
import { GotobedState, initialGotoBedState } from './gotobed.state';

export function gotobedReducer(state = initialGotoBedState, action: GotobedActions): GotobedState {
    switch (action.type) {
        case EGotobedActions.sendCommandChanged:
            return {
                ...state,
                command: action.payload,
            };
        case EGotobedActions.protocolSettingsChanged:
            return {
                ...state,
                protocol: action.payload,
            };
        case EGotobedActions.addressSettingsChanged:
            return {
                ...state,
                address: action.payload,
            };
        case EGotobedActions.portSettingsChanged:
            return {
                ...state,
                port: action.payload,
            };
        case EGotobedActions.macSettingsChanged:
            return {
                ...state,
                macAddress: action.payload,
            };
        case EGotobedActions.WolAddressChanged:
            return {
                ...state,
                wolAddress: action.payload,
            };
        default:
            return state;
    }
};
