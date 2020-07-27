import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

import { JoinChannelPageRoutingModule } from './join-channel-routing.module';

import { JoinChannelPage } from './join-channel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinChannelPageRoutingModule
  ],
  declarations: [JoinChannelPage],
  providers: [QRScanner]
})
export class JoinChannelPageModule {}
