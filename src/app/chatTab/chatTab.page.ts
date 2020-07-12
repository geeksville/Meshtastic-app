import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { SearchService } from '../services/search.service';
import { Message } from '../models/message';
import { Channel } from '../models/channel';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { JoinChannelPage } from '../modals/join-channel/join-channel.page';
import { NewChannelPage } from '../modals/new-channel/new-channel.page';
import { PairingPage } from '../modals/pairing/pairing.page';

@Component({
  selector: 'app-chatTab',
  templateUrl: 'chatTab.page.html',
  styleUrls: ['chatTab.page.scss']
})
export class ChatTabPage implements OnInit {
  channels: Channel[] = [];

  constructor(
    private api: ApiService,
    private search: SearchService,
    private loadingController: LoadingController,
    private storage: NativeStorage,
    private modalCtrl: ModalController) { }

    messages: Message[] = [];
    public searchTerm: string = "";

    async getStoredChats() {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();

      await this.storage.getItem('channels')
        .then(res => {
          this.channels = res;
          console.log(this.channels);
          loading.dismiss();
        }, err => {
          console.log(err);
          loading.dismiss();
        });
    }

    ngOnInit() {
      this.getStoredChats();
    }

    setFilteredItems() {
      this.messages = this.search.filterItems(this.searchTerm);
    }

    // navigation routes
    async pair() {
      const modal = await this.modalCtrl.create({
        component: PairingPage,
      });
      return await modal.present();
    }

    async joinChannel() {
      const modal = await this.modalCtrl.create({
        component: JoinChannelPage,
      });
      return await modal.present();
    }

    async newChannel() {
      const modal = await this.modalCtrl.create({
        component: NewChannelPage,
      });
      return await modal.present();
    }
}
