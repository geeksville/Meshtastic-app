import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CheckTutorialService } from './services/check-tutorial.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule )
  },
  {
    path: 'pairing',
    loadChildren: () => import('./modals/pairing/pairing.module').then( m => m.PairingPageModule)
  },
  {
    path: 'join-channel',
    loadChildren: () => import('./modals/join-channel/join-channel.module').then( m => m.JoinChannelPageModule)
  },
  {
    path: 'chat-detail',
    loadChildren: () => import('./chat-detail/chat-detail.module').then( m => m.ChatDetailPageModule)
  },
  {
    path: 'channel-info',
    loadChildren: () => import('./modals/channel-info/channel-info.module').then( m => m.ChannelInfoPageModule)
  },
  {
    path: 'new-channel',
    loadChildren: () => import('./modals/new-channel/new-channel.module').then( m => m.NewChannelPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./tutorial/tutorial.module').then( m => m.TutorialPageModule),
    canLoad: [CheckTutorialService]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
