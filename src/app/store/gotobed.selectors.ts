import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GotobedState, storeName } from "./gotobed.state";

export const gotobedState = createFeatureSelector<GotobedState>(
    storeName
)

export const getCommandType = createSelector(
    gotobedState,
    (state: GotobedState) => state.command
)