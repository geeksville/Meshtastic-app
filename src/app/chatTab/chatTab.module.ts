import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatTabPage } from './chatTab.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ChatTabPageRoutingModule } from './chatTab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ChatTabPageRoutingModule
  ],
  declarations: [ChatTabPage]
})
export class ChatTabPageModule {}
