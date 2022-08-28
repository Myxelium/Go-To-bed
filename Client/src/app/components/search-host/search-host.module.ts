import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchHostPage } from './search-host.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SearchHostPageRoutingModule } from './search-host-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    SearchHostPageRoutingModule
  ],
  exports: [SearchHostPage],
  declarations: [SearchHostPage]
})
export class SearchHostPageModule {}
