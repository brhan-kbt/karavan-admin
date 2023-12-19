import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponListComponent } from './coupon-list/coupon-list.component';

const routes: Routes = [
  {
    path:'list',
    component:CouponListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponRoutingModule { }
