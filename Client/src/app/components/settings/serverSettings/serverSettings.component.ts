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
  port = null;
  address = '';
  protocol = '';

  constructor(private store: Store<GotobedState>) { }

  ngOnInit() {
    console.log('#Render server settings');
    this.store
      .select(getPort)
      .subscribe(port => (this.port = port));

    this.store
      .select(getAddress)
      .subscribe(address => (this.address = address));

    this.store
      .select(getProtocol)
      .subscribe(protocol => (this.protocol = protocol));
  }

  onProtocolChange(protocol: InputCustomEvent){
    console.log(protocol.detail.value);
    this.store.dispatch(new ProtocolSettingsChanged(protocol.detail.value));
  }
  onAddressChange(address: InputCustomEvent){
    console.log(address.detail.value);
    this.store.dispatch(new SaveAddressSettings(address.detail.value));
  }
  onPortChange(port: InputCustomEvent){
    console.log(port.detail.value);
    this.store.dispatch(new PortSettingsChanged(port.detail.value));
  }
}
