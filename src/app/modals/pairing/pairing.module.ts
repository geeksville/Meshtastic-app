import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';

import { PairingPageRoutingModule } from './pairing-routing.module';
import { PairingPage } from './pairing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PairingPageRoutingModule
  ],
  declarations: [PairingPage],
  providers: [BLE]
})
export class PairingPageModule {}
