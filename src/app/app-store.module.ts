import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { gotobedReducer } from './store/gotobed.reducer';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/menu/menu.module').then(page => page.MenuPageModule)
  }
];
@NgModule({
  imports: [
    StoreModule.forFeature('Gotobed', gotobedReducer), StoreRouterConnectingModule.forRoot(),
  ],
  exports: [RouterModule]
})
export class AppStoreModule {}
