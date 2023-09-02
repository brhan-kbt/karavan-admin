import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AppCommonModule } from 'src/app/app.common.module';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { SharedModule } from 'src/app/shared/shimmer/table-shimmer-effect/shared.module';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailComponent,
  ],
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    AppCommonModule,
    MatProgressSpinnerModule,
    CommonModule,
    OrderRoutingModule,
    DatePipe,
    SharedModule
  ]
})
export class OrderModule { }
