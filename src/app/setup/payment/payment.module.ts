import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/app.material.module';
import { SharedModule } from 'src/app/shared/shimmer/table-shimmer-effect/shared.module';


@NgModule({
  declarations: [
    PaymentListComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PaymentModule { }
