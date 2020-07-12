import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'chatTab',
        loadChildren: () => import('../chatTab/chatTab.module').then(m => m.ChatTabPageModule)
      },
      {
        path: 'mapTab',
        loadChildren: () => import('../mapTab/mapTab.module').then(m => m.MapTabPageModule)
      },
      {
        path: 'settingsTab',
        loadChildren: () => import('../settingsTab/settingsTab.module').then(m => m.SettingsTabPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/chatTab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/chatTab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
