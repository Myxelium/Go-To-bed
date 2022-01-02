import { EGotobedActions, GotobedActions } from './gotobed.actions';
import { GotobedState, initialGotoBedState } from './gotobed.state';

export function gotobedReducer(state = initialGotoBedState, action: GotobedActions): GotobedState {
    switch (action.type) {
        case EGotobedActions.SendCommandChanged:
            return {
                ...state,
                command: action.payload,
            };
        case EGotobedActions.ProtocolSettingsChanged:
            return {
                ...state,
                protocol: action.payload,
            };
        case EGotobedActions.AddressSettingsChanged:
            return {
                ...state,
                address: action.payload,
            };
        case EGotobedActions.PortSettingsChanged:
            return {
                ...state,
                port: action.payload,
            };
        default:
            return state;
    }
}
