import { WOLService } from './../../services/WOL.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { NetworkRequestsService } from '../../services/networkRequests.service';
import { SendCommandChanged } from '../../store/gotobed.actions';
import { getAddress, getCommandType, getPort, getProtocol } from '../../store/gotobed.selectors';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage implements OnInit{
  commandtype$ = this.store.select(getCommandType);
  port = null;
  address = '';
  protocol = '';

  constructor(
    public alertController: AlertController,
    private httpCommand: NetworkRequestsService,
    private store: Store,
    private WOLService: WOLService
  ) {}

  ngOnInit() {
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

  async commandAlert(commandValue) {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Are you sure?',
      message: `You are about to send a ${commandValue} command to the device.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Send',
          handler: () => {
            this.store.dispatch(new SendCommandChanged(commandValue));
            this.httpCommand.sendCommand(commandValue, this.address, this.port, this.protocol);
          }
        }
      ]
    });

    await alert.present();
  }

  wakeUp(){
    this.WOLService.wakeUp();
  }
}
