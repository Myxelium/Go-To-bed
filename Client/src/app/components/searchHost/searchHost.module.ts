import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchHostPage } from './searchHost.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SearchHostPageRoutingModule } from './searchHost-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    SearchHostPageRoutingModule
  ],
  declarations: [SearchHostPage]
})
export class SearchHostPageModule {}
