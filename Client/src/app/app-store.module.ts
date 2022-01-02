import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { gotobedReducer } from './store/gotobed.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('Gotobed', gotobedReducer), StoreRouterConnectingModule.forRoot(),
  ],
  exports: [RouterModule]
})
export class AppStoreModule {}
