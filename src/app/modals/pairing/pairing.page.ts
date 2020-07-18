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
  statusMessage: string;
  peripheral: any = {};

  constructor(
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private ble: BLE,
              private ngZone: NgZone,
              private modalCtrl: ModalController) 
  {}

  dismissModal() {
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
      error => this.scanError(error)
    );
  }

  onDeviceDiscovered(newDevice) {
    console.log(newDevice);
    if (!this.devices.some((device) => device.id == newDevice.id)) {
      this.ngZone.run(() => {
        this.devices.push(newDevice);
      });
    }
  }

  // If location permission is denied, you'll end up here
  async scanError(error) {
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
