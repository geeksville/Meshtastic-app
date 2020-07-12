import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';

@Injectable({
  providedIn: 'root'
})
export class BleDataService {

  constructor(private ble: BLE) { }

  getData() {
    // this.ble.read();
  }
}
