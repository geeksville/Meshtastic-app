import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, ToastController } from '@ionic/angular';
import { Message } from '../models/message';
import { Channel } from '../models/channel';
import { ChannelInfoPage } from '../modals/channel-info/channel-info.page';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss'],
})
export class ChatDetailPage {
  channel: Channel;
  lat: number;
  lng: number;

  constructor(private geolocation: Geolocation, 
              private modalCtrl: ModalController,
              private toastCtrl: ToastController) {

    this.geolocation.getCurrentPosition().then(
      (resp) => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
      },
      (err) => {
        this.showError(err);
      }
    );

   let watch = this.geolocation.watchPosition();
   watch.subscribe((data) => {
     this.lat = data.coords.latitude;
     this.lng = data.coords.longitude;
    });

  }

  async showChannelInfo() {
    var data = { channel : this.channel };
    const modal = await this.modalCtrl.create({
      component: ChannelInfoPage,
      componentProps: data
    });
    return await modal.present();
  }

  async showError(err: string) {
    const toast = await this.toastCtrl.create({
      message: err,
      duration: 2000
    });
    toast.present();
  }

}
