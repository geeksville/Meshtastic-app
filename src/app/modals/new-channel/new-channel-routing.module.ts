import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewChannelPage } from './new-channel.page';

const routes: Routes = [
  {
    path: '',
    component: NewChannelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewChannelPageRoutingModule {}
