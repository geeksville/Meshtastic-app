import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinChannelPage } from './join-channel.page';

const routes: Routes = [
  {
    path: '',
    component: JoinChannelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinChannelPageRoutingModule {}
