import { PortStorageKey } from './../gotobed.models';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { AddressStorageKey, ProtocolStorageKey } from '../gotobed.models';
import { StorageService } from '../services/storage.service';
import { AppInitialized, EGotobedActions, ProtocolSettingsChanged, SaveAddressSettings, SendCommandChanged } from './gotobed.actions';

@Injectable()
export class GotobedEffects {

    init$ = createEffect(() => 
    this._actions$.pipe(
        ofType<AppInitialized>(ROOT_EFFECTS_INIT),
        concatLatestFrom(() => this._store),
        map(async ([action]) => {
            this.storage.initializeStorage();
            console.log("Loading# Srorage")
            return action.payload = {
                address: localStorage.getItem(AddressStorageKey),
                port: localStorage.getItem(PortStorageKey),
                protocol: localStorage.getItem(ProtocolStorageKey),
            }
        })
    ), { dispatch: false }
    );

    saveAddressSettings$ = createEffect(() => this._actions$.pipe(
        ofType<SaveAddressSettings>(EGotobedActions.AddressSettingsChanged),
        withLatestFrom(this._store),
        tap(([action, state]) => {
            //this.storage.addToStorage(ProtocolStorageKey, action.payload);
            localStorage.setItem(AddressStorageKey, action.payload);
        })
    ), { dispatch: false });

    logCommand$ = createEffect(() => this._actions$.pipe(
        ofType<SendCommandChanged>(EGotobedActions.SendCommandChanged),
        withLatestFrom(this._store),
        tap(([action, state]) => {
            //this.storage.addToStorage(AddressStorageKey, action.payload);
        })
    ), { dispatch: false });

    saveProtocolSettings$ = createEffect(() => this._actions$.pipe(
        ofType<ProtocolSettingsChanged>(EGotobedActions.ProtocolSettingsChanged),
        withLatestFrom(this._store),
        tap(([action, state]) => {
            //this.storage.addToStorage(ProtocolStorageKey, action.payload);
            localStorage.setItem(ProtocolStorageKey, action.payload);
        })
    ), { dispatch: false });

    savePortSettings$ = createEffect(() => this._actions$.pipe(
        ofType<ProtocolSettingsChanged>(EGotobedActions.PortSettingsChanged),
        withLatestFrom(this._store),
        tap(([action, state]) => {
            //this.storage.addToStorage(PortStorageKey, action.payload);
            localStorage.setItem(PortStorageKey, action.payload);
        })
    ), { dispatch: false });

    constructor(
        private readonly _actions$: Actions, 
        private readonly _store: Store,
        private storage: StorageService 
    ) { }
}
