import { EGotobedActions, GotobedActions } from "./gotobed.actions";
import { GotobedState, initialGotoBedState } from "./gotobed.state";

export function gotobedReducer(state = initialGotoBedState, action: GotobedActions): GotobedState {
    switch (action.type) {
        case EGotobedActions.SendCommandChanged:
            return {
                ...state,
                command: action.payload,
            };
        default:
            return state;
    }
}