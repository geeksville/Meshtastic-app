import { Component, NgZone, OnInit } from "@angular/core";
import {
  ToastController,
  ModalController,
  LoadingController,
  Platform,
} from "@ionic/angular";
import { BLE } from "@ionic-native/ble/ngx";
import { BluetoothLE } from "@ionic-native/bluetooth-le/ngx";

@Component({
  selector: "app-pairing",
  templateUrl: "./pairing.page.html",
  styleUrls: ["./pairing.page.scss"],
})
export class PairingPage implements OnInit {
  devices: any[] = [];
  deviceId: any;
  statusMessage: string;
  peripheral: any = {};
  service_uuid: string = "6BA1B218-15A8-461F-9FA8-5DCAE273EAFD";
  TORADIO_UUID: string = "f75c76d2-129e-4dad-a1dd-7866124401e7";
  FROMRADIO_UUID: string = "8ba2bcc2-ee02-4a55-a531-c525c5e454d5";
  FROMNUM_UUID: string = "ed9da18c-a800-4f66-a670-aa7547e34453";

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private bluetoothLE: BluetoothLE,
    private ngZone: NgZone,
    private modalCtrl: ModalController,
    private platform: Platform
  ) {
    this.platform.ready().then(async () => {
      const { status } = await this.bluetoothLE.initialize();
      if (status !== "enabled") {
        alert("Bluetooth in not enabled. Please enable it");
      }
      const { hasPermission } = await this.bluetoothLE.hasPermission();
      if (!hasPermission) {
        await this.bluetoothLE.requestPermission();
      }
      const { isLocationEnabled } = await this.bluetoothLE.isLocationEnabled();
      if (!isLocationEnabled) {
        await this.bluetoothLE.requestLocation();
      }
    });
  }

  dismissModal() {
    this.bluetoothLE.disconnect(this.conenctedDeviceId);
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    /* this.ble.startStateNotifications().subscribe((state) => {
      this.showMessage("Bluetooth state is " + state);
    }); */
    this.scan();
  }

  async presentLoading() {
    let loading = await this.loadingCtrl.create({
      message: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 4500);
  }

  scan() {
    this.setStatus("Scanning for BLE devices...");
    this.devices = []; // clear list

    this.presentLoading();

    var params = {
      services: [],
      allowDuplicates: false,
      scanTimeout: 15000,
      /* scanMode: bluetoothLE.SCAN_MODE_LOW_POWER,
      matchMode: bluetoothLE.MATCH_MODE_STICKY,
      matchNum: bluetoothLE.MATCH_NUM_ONE_ADVERTISEMENT, */
    };

    this.bluetoothLE.startScan(params).subscribe(
      (device) => this.onDeviceDiscovered(device),
      (error) => this.onError(error)
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
    this.setStatus("Error " + error);

    const toast = await this.toastCtrl.create({
      message: "Error scanning for Bluetooth low energy devices",
      duration: 2000,
    });
    toast.present();
  }

  async showMessage(msg) {
    const toast = await this.toastCtrl.create({
      message: "msg",
      duration: 2000,
    });
    toast.present();
  }

  setStatus(message) {
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  connect(device) {
    this.setStatus("Connecting to " + device.name || device.id);
    this.deviceId = device.id;

    var params = {
      address: device.id,
      timeout: 10000,
    };

    this.bluetoothLE.connect(params).subscribe(
      (peripheral) => this.onConnected(peripheral),
      (peripheral) => this.onDeviceDisconnected(peripheral)
    );
  }

  async onConnected(peripheral) {
    this.ngZone.run(() => {
      this.setStatus("Connected to " + peripheral.name || peripheral.id);
      this.devices = [];
    });

    console.log(peripheral);

    let notifyParams = {
      address: this.deviceId,
      service: this.service_uuid,
      characteristic: this.FROMNUM_UUID,
      timeout: 5000,
    };

    this.bluetoothLE.subscribe(notifyParams).subscribe((operationResult) => {
      // Decode the ArrayBuffer into a typed Array based on the data you expect
      //var data = new Uint8Array(buffer);
      //var string = new TextDecoder("utf-8").decode(data);
      alert("Data changed to " + operationResult.value);
    });

    this.bluetoothLE
      .read(peripheral.id, "180A", "2A27")
      .then((operationResult) => {
        //let data = new Uint8Array(buffer);
        //var string = new TextDecoder("utf-8").decode(data);
        console.log("switch characteristic " + operationResult.value);
      });

    this.bluetoothLE
      .read(peripheral.id, "180A", "2A28")
      .then((operationResult) => {
        //let data = new Uint8Array(buffer);
        //var string = new TextDecoder("utf-8").decode(data);
        console.log("switch characteristic " + operationResult.value);
      });

    let writeParams = {
      address: this.deviceId,
      service: this.service_uuid,
      characteristic: this.TORADIO_UUID,
      value: btoa("x"), // FIXME, use base64 encoding of a toRadio protobuf instead
    };
    this.bluetoothLE
      .write(writeParams)
      .then((operationResult) => console.log(operationResult));
  }

  async onDeviceDisconnected(peripheral) {
    this.ngZone.run(() => {
      this.setStatus("Disconnected");
    });

    let toast = await this.toastCtrl.create({
      message: "The peripheral unexpectedly disconnected",
      duration: 3000,
      position: "middle",
    });
    toast.present();
  }
}
