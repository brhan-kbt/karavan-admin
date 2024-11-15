import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ProductFormComponent } from '../ui-forms/product-form/product-form.component';
import { MaterialModule } from 'src/app/app.material.module';
import { AppCommonModule } from 'src/app/app.common.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AvailablityComponent } from './availablity/availablity.component';
import { IngredeintComponent } from './ingredeint/ingredeint.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { ProductIngredientComponent } from './product-ingredient/product-ingredient.component';
import { SharedModule } from 'src/app/shared/shimmer/table-shimmer-effect/shared.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { SeasonalProductsComponent } from './seasonal-products/seasonal-products.component';
import { SeasolProductComponent } from '../ui-forms/seasol-product/seasol-product.component';


@NgModule({
  declarations: [
    ProductsListComponent,
    AvailablityComponent,
    IngredeintComponent,
    ProductIngredientComponent,
    SeasonalProductsComponent,
    SeasolProductComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    AppCommonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatAutocompleteModule,
    FormsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatChipsModule,
    MatAutocompleteModule,
    SharedModule,
    MatTableExporterModule,
  ]
})
export class ProductModule { }
