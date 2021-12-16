import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { NetworkRequestsService } from '../network/networkRequests.service';
import { SendCommandChanged } from '../store/gotobed.actions';
import { getCommandType } from '../store/gotobed.selectors';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {

  constructor(
    public alertController: AlertController,
    private httpCommand: NetworkRequestsService,
    private store: Store) {}
  
  commandtype$ = this.store.select(getCommandType);

  async presentAlert(commandType) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure?',
      message: `You are about to send a ${commandType} command to the device.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.commandtype$.subscribe(commandType => {
              console.log(commandType);
            });
          }
        }, {
          text: 'Send',
          handler: () => {
            this.store.dispatch(new SendCommandChanged(commandType));
            this.httpCommand.sendCommand(commandType, "192.168.1.255:3000");
          }
        }
      ]
    });

    await alert.present();
  }
}
