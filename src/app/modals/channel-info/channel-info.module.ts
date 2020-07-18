import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { IonicModule } from '@ionic/angular';

import { ChannelInfoPageRoutingModule } from './channel-info-routing.module';

import { ChannelInfoPage } from './channel-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChannelInfoPageRoutingModule,
    QRCodeModule
  ],
  declarations: [ChannelInfoPage]
})
export class ChannelInfoPageModule {}
