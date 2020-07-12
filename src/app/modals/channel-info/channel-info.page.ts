import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { Channel } from '../../models/channel';

@Component({
  selector: 'app-channel-info',
  templateUrl: './channel-info.page.html',
  styleUrls: ['./channel-info.page.scss'],
})
export class ChannelInfoPage implements OnInit {
  channel: Channel;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
