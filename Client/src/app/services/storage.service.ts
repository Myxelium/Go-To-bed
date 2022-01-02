import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import * as cordovaSQLiteDriver from "localforage-cordovasqlitedriver";
import { BehaviorSubject, from, of } from "rxjs";
import { filter, switchMap, tap } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class StorageService {
    constructor(private storage: Storage) { 
        //this.initializeStorage();
    }

    private isStorageLoaded = new BehaviorSubject(false);

    async initializeStorage() {
        await this.storage.defineDriver(cordovaSQLiteDriver);
        await this.storage.create();
        this.isStorageLoaded.next(true);
    }

    public fetchFromStorage(key: string) {
        return this.isStorageLoaded.pipe(
            filter(loaded => loaded),
            switchMap(() => from(this.storage.get(key)) || of([]))
        );
    }

    public async addToStorage(key: string, data: string | number | string[]) {
        const currentData = await this.fetchFromStorage(key);
        currentData.pipe(tap(existingData => existingData.push(data)));
        console.log(currentData);
        this.storage.set(key, currentData);
    }

    public async removeFromStorage(key: string, data: string | number | string[]) {
        const currentData = await this.fetchFromStorage(key);
        const newData = currentData.pipe(tap(existingData => existingData.splice(data, 1)));
        this.storage.set(key, newData);
    }
}