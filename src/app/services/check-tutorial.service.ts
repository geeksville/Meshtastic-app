import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { CanLoad, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AppPreferences } from '@ionic-native/app-preferences/ngx';

@Injectable({
  providedIn: 'root'
})
export class CheckTutorialService implements CanLoad {

  constructor(private appPreferences: AppPreferences,
    private platform: Platform,
    private router: Router,
    private storage: Storage,
    private toastCtrl: ToastController) { }
  
    canLoad() {
      if (this.platform.is('ios') || this.platform.is('android')) {
        return this.appPreferences.fetch(null, 'did_tutorial').then(res => {
          if (res) {
            this.router.navigateByUrl('/tabs');
            return false;
          } else {
            return true;
          }
        });
      } else {
        return this.storage.get('did_tutorial').then(res => {
          if (res) {
            this.router.navigateByUrl('/tabs');
            return false;
          } else {
            return true;
          }
        });
      }
    }

    wasSeen() : Promise<any> {
      // use native storage if on device
      if (this.platform.is('ios') || this.platform.is('android')) {
          return this.appPreferences.fetch(null, 'did_tutorial').then(
            (res) => { 
              return res;
            },
            (err) => {
              this.showError(err);
            });
      } else {
        this.storage.get('did_tutorial').then((res) => { 
          return res;
        },
        (err) => {
          this.showError(err);
        });
      }
    }

    setSeen() : Promise<boolean> {
      // use native storage if on device
      if (this.platform.is('ios') || this.platform.is('android')) {
        return this.appPreferences.store(null, 'did_tutorial', true).then((res) => { 
          return true;
        },
        (err) => {
          this.showError(err);

          return false;
        }
        );
      } else {
        this.storage.set('did_tutorial', true).then((res) => { 
          return true;
        },
        (err) => {
          this.showError(err);

          return false;
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
