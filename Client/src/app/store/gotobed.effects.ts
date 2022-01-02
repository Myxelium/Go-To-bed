import { portStorageKey } from '../gotobed.models';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { addressStorageKey, protocolStorageKey } from '../gotobed.models';
import { StorageService } from '../services/storage.service';
import { AppInitialized, EGotobedActions, ProtocolSettingsChanged, SaveAddressSettings } from './gotobed.actions';

@Injectable()
export class GotobedEffects {

    init$ = createEffect(() =>
    this.actions$.pipe(
        ofType<AppInitialized>(ROOT_EFFECTS_INIT),
        concatLatestFrom(() => this.store),
        map(async ([action]) => {
            this.storage.initializeStorage();
            return action.payload = {
                address: localStorage.getItem(addressStorageKey),
                port: localStorage.getItem(portStorageKey),
                protocol: localStorage.getItem(protocolStorageKey),
            };
        })
    ), { dispatch: false }
    );

    saveAddressSettings$ = createEffect(() => this.actions$.pipe(
        ofType<SaveAddressSettings>(EGotobedActions.addressSettingsChanged),
        withLatestFrom(this.store),
        tap(([action]) => {
            localStorage.setItem(addressStorageKey, action.payload);
        })
    ), { dispatch: false });

    saveProtocolSettings$ = createEffect(() => this.actions$.pipe(
        ofType<ProtocolSettingsChanged>(EGotobedActions.protocolSettingsChanged),
        withLatestFrom(this.store),
        tap(([action]) => {
            localStorage.setItem(protocolStorageKey, action.payload);
        })
    ), { dispatch: false });

    savePortSettings$ = createEffect(() => this.actions$.pipe(
        ofType<ProtocolSettingsChanged>(EGotobedActions.portSettingsChanged),
        withLatestFrom(this.store),
        tap(([action]) => {
            localStorage.setItem(portStorageKey, action.payload);
        })
    ), { dispatch: false });

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private storage: StorageService
    ) { }
}
