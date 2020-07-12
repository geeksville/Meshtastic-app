import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapTabPage } from './mapTab.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { MapTabPageRoutingModule } from './mapTab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MapTabPageRoutingModule
  ],
  declarations: [MapTabPage]
})
export class MapTabPageModule {}
