import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ConfigsService } from '../services/configs.service';
import { Configs } from '../models/configs';

@Component({
  selector: 'app-settingsTab',
  templateUrl: 'settingsTab.page.html',
  styleUrls: ['settingsTab.page.scss']
})
export class SettingsTabPage implements OnInit {
  cnf: Configs;
  datarate: number;
  browser: any;

  constructor(private cnfService: ConfigsService,
              private iab: InAppBrowser) { 
    this.cnf = new Configs;
  }

  ngOnInit() {
    this.cnfService.load().then((res) => this.cnf = res);
    this.datarate = 0;
  }

  saveVal() {
    this.cnfService.save(this.cnf);

    this.datarate =  Math.trunc( this.cnf.spreading_factor * ( ( 4/(4 + this.cnf.code_rate) ) /  ( Math.pow(2, this.cnf.spreading_factor) / this.cnf.bandwith ) ) * 1000 );
  }

  openHelp() {
    this.browser = this.iab.create('https://meshtastic.discourse.group/');
  }

  closeHelp() {
    this.browser.close();
  }
}
