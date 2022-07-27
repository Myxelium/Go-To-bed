import { WolAddressChanged } from './../../store/gotobed.actions';
import { Component, OnInit } from '@angular/core';
import { Zeroconf, ZeroconfResult, ZeroconfService } from "@ionic-native/zeroconf";
import { Store } from '@ngrx/store';
import { ServiceOptions } from 'src/app/gotobed.models';
import { MacSettingsChanged } from 'src/app/store/gotobed.actions';
import { GotobedState } from 'src/app/store/gotobed.state';
@Component({
  selector: 'app-searchhost',
  templateUrl: 'searchHost.page.html',
  styleUrls: ['searchHost.page.scss']
})
export class SearchHostPage implements OnInit {
  netWorkDevices: ZeroconfService[] = [];

  constructor(private store: Store<GotobedState>) {}

  ngOnInit(): void {
    this.scanDevices();
  }

  scanDevices() {
    Zeroconf.watchAddressFamily = 'ipv4';
    Zeroconf.watch("_http._tcp.", "local.").subscribe(result => {
      console.log("Zeroconf Service Changed:");
      console.log(result.service);
      if(result.service.ipv4Addresses.length > 0 && JSON.stringify(this.netWorkDevices).includes(result.service.ipv4Addresses[0]) == false) {
        this.netWorkDevices.push(result.service);
      }
    });
  }

  saveWolDevice(device: ZeroconfService) {
    this.store.dispatch(new MacSettingsChanged(device.txtRecord.mac));
    this.store.dispatch(new WolAddressChanged(this.convertToBroadcast(device.ipv4Addresses[0])));
  }
  
  refresh(event) {
    console.log('Begin async operation');
    this.scanDevices();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  private convertToBroadcast(ip: string) {
    let subnetArray = ip.split('.');
    subnetArray[3] = '255';
    return subnetArray.join('.');
  }
}
