import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NbCardModule, NbThemeModule } from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuPage } from './menu/menu.page';
import { NetworkRequestsService } from './network/networkRequests.service';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpClientModule } from '@angular/common/http';
import { AppStoreModule } from './app-store.module';

@NgModule({
  declarations: [AppComponent, MenuPage],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NbCardModule,
    NbThemeModule.forRoot(),
    StoreModule.forRoot({}, {}),
    StoreRouterConnectingModule.forRoot(),
    HttpClientModule,
    AppStoreModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  exports: [NetworkRequestsService]
})
export class AppModule {}
