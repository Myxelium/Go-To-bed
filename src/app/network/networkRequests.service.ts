import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NetworkRequestsService {

  constructor(private readonly _httpClient: HttpClient, public toastController: ToastController) { }

  public sendCommand(command: string, address: string, connectionType?: string){
    console.log("Sending command: " + command + " to address: " + address);
    this._httpClient.post<string>(`${connectionType ?? "http"}://${address}/commandbridge`, command)
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
      this.showErrorMessage(error);
    });
  }

  async showErrorMessage(errorMessage: HttpErrorResponse ) {
    const toast = await this.toastController.create({
      message: errorMessage.name + ": " + errorMessage.message,
      duration: 40000,
      color: "danger",
      position: "top"
    });
    toast.present();
  }
} 
