import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponRoutingModule } from './coupon-routing.module';
import { CouponListComponent } from './coupon-list/coupon-list.component';
import { MaterialModule } from 'src/app/app.material.module';
import { SharedModule } from 'src/app/shared/shimmer/table-shimmer-effect/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CouponFormComponent } from '../ui-forms/coupon-form/coupon-form.component';


@NgModule({
  declarations: [
    CouponListComponent,
    CouponFormComponent
  ],
  imports: [
    CommonModule,
    CouponRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CouponModule { }
