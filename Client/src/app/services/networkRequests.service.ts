import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NetRequest } from '../gotobed.models';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NetworkRequestsService {
  constructor(private readonly _httpClient: HTTP, public toastController: ToastController) { }

  public sendCommand(command: string, address: string, port: number, connectionProtocol?: string,) {
    const request: NetRequest = {
      command: command,
    }

    this._httpClient.setDataSerializer('json');
    this._httpClient.setServerTrustMode('nocheck');

    this._httpClient.post(encodeURI(`${connectionProtocol ?? 'http'}://${address + ":" + port}/commandbridge`), request, {
      ContentType: 'text/html;'
    }).catch(response => {
      this.showErrorMessage(response);
    });
  }

  async showErrorMessage(errorMessage: HttpErrorResponse ) {
    const toast = await this.toastController.create({
      message: errorMessage.name + ': ' + errorMessage.message,
      duration: 4000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }
}