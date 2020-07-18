import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsTabPage } from './settingsTab.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { SettingsTabPageRoutingModule } from './settingsTab-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: SettingsTabPage }]),
    SettingsTabPageRoutingModule,
  ],
  declarations: [SettingsTabPage],
  providers: [InAppBrowser]
})
export class SettingsTabPageModule {}
