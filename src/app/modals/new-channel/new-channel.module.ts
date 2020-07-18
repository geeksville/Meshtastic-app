import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { IonicModule } from '@ionic/angular';

import { NewChannelPageRoutingModule } from './new-channel-routing.module';

import { NewChannelPage } from './new-channel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewChannelPageRoutingModule,
    QRCodeModule
  ],
  declarations: [NewChannelPage]
})
export class NewChannelPageModule {}
