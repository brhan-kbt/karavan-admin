import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaListComponent } from './media-list/media-list.component';
import { PromotionListComponent } from './promotion-list/promotion-list.component';

const routes: Routes = [
  {
    path:'list',
    component:MediaListComponent
  },

  {
    path:'promotion',
    component:PromotionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
