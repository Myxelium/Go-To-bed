import { PortSettingsChanged, SaveAddressSettings, WolAddressChanged } from './../../store/gotobed.actions';
import { Component, OnInit } from '@angular/core';
import { Zeroconf, ZeroconfService } from "@ionic-native/zeroconf";
import { Store } from '@ngrx/store';
import { MacSettingsChanged } from 'src/app/store/gotobed.actions';
import { GotobedState } from 'src/app/store/gotobed.state';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-searchhost',
  templateUrl: 'search-host.page.html',
  styleUrls: ['search-host.page.scss']
})
export class SearchHostPage implements OnInit {
  netWorkDevices: ZeroconfService[] = [];

  constructor(
    private store: Store<GotobedState>,
    public toastController: ToastController
  ) {}

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
    this.presentToast();
    this.store.dispatch(new MacSettingsChanged(device.txtRecord.mac));
    this.store.dispatch(new WolAddressChanged(this.convertToBroadcast(device.ipv4Addresses[0])));
    this.store.dispatch(new SaveAddressSettings(device.ipv4Addresses[0]));
    this.store.dispatch(new PortSettingsChanged(device.port.toString()));
  }

  refresh(event) {
    console.log('Begin async operation');
    this.scanDevices();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000,
    });
    toast.present();
  }

  private convertToBroadcast(ip: string) {
    let subnetArray = ip.split('.');
    subnetArray[3] = '255';
    return subnetArray.join('.');
  }
}
