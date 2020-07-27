import { Injectable } from '@angular/core';
import { BleCharacteristics } from '../models/ble_characteristics';
import { BLE } from '@ionic-native/ble/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class BleDataService {
  characteristics: BleCharacteristics;

  constructor(
              private ble: BLE,
              private storage: Storage
              ) { }

  init(id) {
    this.ble.read(id, '180A', this.characteristics.frequency).then(
      buffer => {
        let data = new Uint8Array(buffer);
        var string = new TextDecoder("utf-8").decode(data);
        this.storage.set('frequency', string).then((res) => { 
          return res;
        });
      });

    this.ble.read(id, '180A', this.characteristics.app_version).then(
      buffer => {
        let data = new Uint8Array(buffer);
        var string = new TextDecoder("utf-8").decode(data);
        this.storage.set('app_version', string).then((res) => { 
          return res;
        });
      });
  }
}
