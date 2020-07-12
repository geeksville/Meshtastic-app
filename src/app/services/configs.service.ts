import { Injectable } from '@angular/core';
import { AppPreferences } from '@ionic-native/app-preferences/ngx';
import { Configs } from '../models/configs';

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {

  constructor(private appPreferences: AppPreferences) { }

  load() : Promise<Configs> { 
    return this.appPreferences.fetch(null, 'configs').then((res) => { 
      return res;
    });
  }

  save(configs : Configs) : Promise<any>  { 
    return this.appPreferences.store(null, 'configs', configs).then((res) => { 
      return res;
    });
  }
}
