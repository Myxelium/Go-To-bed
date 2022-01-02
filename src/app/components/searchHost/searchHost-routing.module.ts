import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchHostPage } from './searchHost.page';

const routes: Routes = [
  {
    path: '',
    component: SearchHostPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchHostPageRoutingModule {}
