import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class ProductModule { }
