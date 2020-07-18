import { Injectable } from '@angular/core';
import { AppPreferences } from '@ionic-native/app-preferences/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { Configs } from '../models/configs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {

  constructor(private appPreferences: AppPreferences,
              private platform: Platform,
              private storage: Storage,
              private toastCtrl: ToastController) { }

  load() : Promise<Configs> {
    // use native storage if on device
    if (this.platform.is('ios') || this.platform.is('android')) {
      return this.appPreferences.fetch(null, 'configs').then(
        (res) => { 
          return res;
        },
        (err) => {
          this.showError(err);
        }
      );
    }
    else {
      this.storage.get('configs').then((res) => { 
        return res;
      },
      (err) => {
        this.showError(err);
      }
      );
    }
  }

  save(configs : Configs) : Promise<any> {
    // use native storage if on device
    if (this.platform.is('ios') || this.platform.is('android')) {
      return this.appPreferences.store(null, 'configs', configs).then((res) => { 
        return res;
      },
      (err) => {
        this.showError(err);
      }
      );
    } else {
      this.storage.set('configs', configs).then((res) => { 
        return res;
      },
      (err) => {
        this.showError(err);
      }
      );
    }
  }

  async showError(err: string) {
    const toast = await this.toastCtrl.create({
      message: err,
      duration: 2000
    });
    toast.present();
  }

}
