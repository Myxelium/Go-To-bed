import { WOLService } from './services/WOL.service';
import { SearchHostPage } from './components/search-host/search-host.page';
import { ExploreContainerComponent } from './components/explore-container/explore-container.component';
import { ServerSettingsComponent } from './components/settings/serverSettings/serverSettings.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Drivers } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuPage } from './components/menu/menu.page';
import { NetworkRequestsService } from './services/networkRequests.service';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpClientModule } from '@angular/common/http';
import { AppStoreModule } from './app-store.module';
import { EffectsModule } from '@ngrx/effects';
import { GotobedStoreModule } from './store/gotobed.store.module';
import { GotobedEffects } from './store/gotobed.effects';
import { IonicStorageModule } from '@ionic/storage-angular';
import * as CordovaSQLLiteDriver from 'localforage-cordovasqlitedriver';
import { SettingsPage } from './components/settings/settings.page';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

const components = [
  AppComponent,
  MenuPage,
  ServerSettingsComponent,
  SettingsPage,
  ExploreContainerComponent,
  SearchHostPage
];

@NgModule({
  declarations: [components],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreRouterConnectingModule.forRoot(),
    HttpClientModule,
    AppStoreModule,
    EffectsModule.forRoot([GotobedEffects]),
    GotobedStoreModule,
    IonicStorageModule.forRoot({
      name: 'gotobedStorage',
      driverOrder: [CordovaSQLLiteDriver._driver, Drivers.IndexedDB]}),
  ],
  providers: [HTTP, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
  exports: [NetworkRequestsService, WOLService]
})
export class AppModule {}
