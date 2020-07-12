import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Channel } from '../../models/channel';

@Component({
  selector: 'app-new-channel',
  templateUrl: './new-channel.page.html',
  styleUrls: ['./new-channel.page.scss'],
})
export class NewChannelPage implements OnInit {
  public qrdata: string = null;
  public elementType: "img" | "url" | "canvas" | "svg" = null;
  public level: "L" | "M" | "Q" | "H";
  public scale: number;
  public width: number;
  public generated: boolean;

  constructor(private modalCtrl: ModalController) { 
    this.elementType = "img";
    this.level = "M";
    this.scale = 1;
    this.width = 256;
    this.generated = false;
  }

  ngOnInit() { }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  generateQR() {
    this.generated = true;
  }

}
