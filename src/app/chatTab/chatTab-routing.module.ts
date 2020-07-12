import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatTabPage } from './chatTab.page';

const routes: Routes = [
  {
    path: '',
    component: ChatTabPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatTabPageRoutingModule {}
