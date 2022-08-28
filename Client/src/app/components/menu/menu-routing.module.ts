import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from '../home/home.page';
import { SearchHostPage } from '../search-host/search-host.page';
import { SettingsPage } from '../settings/settings.page';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage, pathMatch: 'full',},
  { path: 'searchHost', component: SearchHostPage, pathMatch: 'full',},
  { path: 'settings', component: SettingsPage, pathMatch: 'full',}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MenuPageRoutingModule {}
