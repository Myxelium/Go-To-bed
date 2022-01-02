import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GotobedState, storeName } from './gotobed.state';

export const gotobedState = createFeatureSelector<GotobedState>(
    storeName
);

export const getCommandType = createSelector(
    gotobedState,
    (state: GotobedState) => state.command
);

export const getAddress = createSelector(
    gotobedState,
    (state: GotobedState) => state.address
);

export const getProtocol = createSelector(
    gotobedState,
    (state: GotobedState) => state.protocol
);

export const getPort = createSelector(
    gotobedState,
    (state: GotobedState) => state.port
);

