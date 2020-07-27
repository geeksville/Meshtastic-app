import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-join-channel',
  templateUrl: './join-channel.page.html',
  styleUrls: ['./join-channel.page.scss'],
})
export class JoinChannelPage implements OnInit {

  encodedData = '';
  QRSCANNED_DATA: string;
  isOn = false;
  scannedData: {};

  constructor(
              private qrScanCtrl: QRScanner,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController) { }


  ngOnInit() {
    this.qrScanCtrl.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          this.isOn = true;

          // start scanning
          const scanSub = this.qrScanCtrl.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.isOn = false;

            this.QRSCANNED_DATA = text;
            if (this.QRSCANNED_DATA !== '') {
              this.closeScanner();
              scanSub.unsubscribe();
            }

          });
          this.qrScanCtrl.show();

        } else if (status.denied) {
          console.log('camera permission denied');
          this.qrScanCtrl.openSettings();
        } else {
        }
      })
      .catch((e: any) => this.showError(e));
  }

  closeScanner() {
    this.isOn = false;
    this.qrScanCtrl.hide();
    this.qrScanCtrl.destroy();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  async showError(err: string) {
    const toast = await this.toastCtrl.create({
      message: err,
      duration: 2000
    });
    toast.present();
  }

}
