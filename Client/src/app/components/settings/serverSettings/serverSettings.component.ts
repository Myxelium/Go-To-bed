import { getAddress, getPort, getProtocol } from './../../../store/gotobed.selectors';
import { Store } from '@ngrx/store';

import { Component, OnInit } from '@angular/core';
import { PortSettingsChanged, ProtocolSettingsChanged, SaveAddressSettings } from 'src/app/store/gotobed.actions';
import { GotobedState } from 'src/app/store/gotobed.state';
import { InputCustomEvent } from 'src/app/gotobed.models';

@Component({
  selector: 'app-serversettings',
  templateUrl: './serverSettings.component.html',
  styleUrls: ['./serverSettings.component.scss']
})
export class ServerSettingsComponent implements OnInit{

  constructor(private _store: Store<GotobedState>) { }

  port = null;
  address = "";
  protocol = "";

  ngOnInit() {
    console.log("#Render server settings");
    this._store
      .select(getPort)
      .subscribe(port => (this.port = port));

    this._store
      .select(getAddress)
      .subscribe(address => (this.address = address));

    this._store
      .select(getProtocol)
      .subscribe(protocol => (this.protocol = protocol));
  }

  onProtocolChange(protocol: InputCustomEvent){
    console.log(protocol.detail.value) 
    this._store.dispatch(new ProtocolSettingsChanged(protocol.detail.value));
  }
  onAddressChange(address: InputCustomEvent){
    console.log(address.detail.value)
    this._store.dispatch(new SaveAddressSettings(address.detail.value));
  }
  onPortChange(port: InputCustomEvent){
    console.log(port.detail.value) 
    this._store.dispatch(new PortSettingsChanged(port.detail.value));
  }
}
