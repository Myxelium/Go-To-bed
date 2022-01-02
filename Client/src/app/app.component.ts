import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { ProtocolStorageKey, PortStorageKey, AddressStorageKey } from './gotobed.models';
import { GotobedState, initialGotoBedState } from './store/gotobed.state';
import { Store } from '@ngrx/store';
import { ProtocolSettingsChanged } from './store/gotobed.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private storage: StorageService, private _store: Store<GotobedState>) { 
    //this.storage.initializeStorage();
    // this._store.dispatch(new ProtocolSettingsChanged(await this.storage.fetchFromStorage(ProtocolStorageKey).then(protocol =>  protocol)));
    // this.storage.fetchFromStorage(PortStorageKey).then(port => (initialGotoBedState.port = port));
    // this.storage.fetchFromStorage(AddressStorageKey).then(address => (initialGotoBedState.address = address));
  } 
}
