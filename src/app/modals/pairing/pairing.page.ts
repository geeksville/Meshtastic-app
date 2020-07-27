import { Component, NgZone, OnInit } from '@angular/core';
import { ToastController, ModalController, LoadingController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-pairing',
  templateUrl: './pairing.page.html',
  styleUrls: ['./pairing.page.scss'],
})
export class PairingPage implements OnInit {
  devices: any[] = [];
  conenctedDeviceId: any;
  statusMessage: string;
  peripheral: any = {};
  service_uuid: string = '6BA1B218-15A8-461F-9FA8-5DCAE273EAFD';
  TORADIO_UUID: string = "f75c76d2-129e-4dad-a1dd-7866124401e7"
  FROMRADIO_UUID: string = "8ba2bcc2-ee02-4a55-a531-c525c5e454d5"
  FROMNUM_UUID: string = "ed9da18c-a800-4f66-a670-aa7547e34453"

  constructor(
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private ble: BLE,
              private ngZone: NgZone,
              private modalCtrl: ModalController) 
  {}

  dismissModal() {
    this.ble.disconnect(this.conenctedDeviceId);
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.ble.startStateNotifications().subscribe(
      (state) => {
        this.showMessage("Bluetooth state is " + state)
      }
    );
    this.scan();
  }

  async presentLoading() {
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 4500);
  }

  scan() {
    this.setStatus('Scanning for BLE devices...');
    this.devices = [];  // clear list

    this.presentLoading();
    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');

    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device), 
      error => this.onError(error)
    );
  }

  async onDeviceDiscovered(newDevice) {
    console.log(newDevice);
    if (!this.devices.some((device) => device.id == newDevice.id)) {
      this.ngZone.run(() => {
        this.devices.push(newDevice);
      });
    }
  }

  // If location permission is denied, you'll end up here
  async onError(error) {
    this.setStatus('Error ' + error);

    const toast = await this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      duration: 2000
    });
    toast.present();
  }

  async showMessage(msg) {
    const toast = await this.toastCtrl.create({
      message: 'msg',
      duration: 2000
    });
    toast.present();
  }

  setStatus(message) {
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  connect(device) {
    this.setStatus('Connecting to ' + device.name || device.id);
    this.conenctedDeviceId = device.id;

    this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => this.onDeviceDisconnected(peripheral)
    );
  }

  async onConnected(peripheral) {
    this.ngZone.run(() => {
      this.setStatus('Connected to ' + peripheral.name || peripheral.id);
      this.devices = [];
    });

    console.log(peripheral);
    
    this.ble.startNotification(peripheral.id, this.service_uuid, this.FROMNUM_UUID).subscribe((buffer) => {
      // Decode the ArrayBuffer into a typed Array based on the data you expect
      var data = new Uint8Array(buffer);
      var string = new TextDecoder("utf-8").decode(data);
      alert("Data changed to " + string);
    });

    this.ble.read(peripheral.id, '180A', '2A27').then(
      buffer => {
        let data = new Uint8Array(buffer);
        var string = new TextDecoder("utf-8").decode(data);
        console.log('switch characteristic ' + string);
      });

    this.ble.read(peripheral.id, '180A', '2A28').then(
      buffer => {
        let data = new Uint8Array(buffer);
        var string = new TextDecoder("utf-8").decode(data);
        console.log('switch characteristic ' + string);
      });

    var data = new Uint8Array(1);
    data[0] = 0x55;
    this.ble.write(peripheral.id, this.service_uuid, this.TORADIO_UUID, data.buffer).then((res) => console.log(res));
    
  }

  async onDeviceDisconnected(peripheral) {
    this.ngZone.run(() => {
      this.setStatus('Disconnected');
    });

    let toast = await this.toastCtrl.create({
      message: 'The peripheral unexpectedly disconnected',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

}
