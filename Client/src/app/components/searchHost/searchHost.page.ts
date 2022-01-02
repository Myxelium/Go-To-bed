import { Component } from '@angular/core';

@Component({
  selector: 'app-searchHost',
  templateUrl: 'searchHost.page.html',
  styleUrls: ['searchHost.page.scss']
})
export class SearchHostPage {

  constructor() {}
  testText = '';

  test() {
    // console.log("!test")
    // // Zeroconf.watchAddressFamily = 'ipv4';
    // // Zeroconf.watch('_http._tcp.', 'local.').subscribe(result => {
    // //   this.testText = JSON.stringify(result.service.ipv4Addresses);
    // //   console.log(JSON.stringify(result.service.ipv4Addresses))
    // // });

    // ServiceDiscovery.getNetworkServices('ssdp:all')
    // .then(devices => {
    //   console.log(JSON.stringify(devices))
    //   this.testText = JSON.stringify(devices)
    // })
    // .catch(error => console.error(error));

  }
}
