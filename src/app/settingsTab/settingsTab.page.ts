import { Component, OnInit } from '@angular/core';
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

  constructor(private cnfService: ConfigsService) { }

  ngOnInit() {
    this.cnfService.load().then((res) => this.cnf = res);
  }

  saveVal() {
    this.cnfService.save(this.cnf);

    this.datarate = 1000 * this.cnf.spreading_factor * ( 4/(4 + this.cnf.code_rate) ) /  ( Math.pow(2, this.cnf.spreading_factor) / this.cnf.bandwith );
  }
}
