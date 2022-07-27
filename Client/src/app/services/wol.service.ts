import { getWolAddress, getMacAddress } from './../store/gotobed.selectors';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

declare var WakeOnLan: any;

@Injectable({
  providedIn: 'root'
})
export class WOLService {
  ipAddress = this.store.select(getWolAddress);
  macAddress = this.store.select(getMacAddress);

  constructor(private store: Store) {}

  public wakeUp() {
    WakeOnLan.wake(this.macAddress, this.ipAddress, function(response){
      console.log(response)
    }, function(response){
        console.error(response)
    });
  }

//   public start() {
//     return new Promise((resolve, reject) => {
//       WakeOnLan.wake(this.ipAddress, this.macAddress, function(response){
//         console.log(response)
//       },
//       function(response){
//           console.error(response)
//       });
//     });
// }
}
