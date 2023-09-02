import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AppCommonModule } from 'src/app/app.common.module';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategorySubcategoryDetailComponent } from './category-subcategory-detail/category-subcategory-detail.component';
import { CategoryFormComponent } from '../ui-forms/category-form/category-form.component';
import { SubCategoryFormComponent } from '../ui-forms/sub-category-form/sub-category-form.component';
import { SharedModule } from 'src/app/shared/shimmer/table-shimmer-effect/shared.module';


@NgModule({
  declarations: [
    CategoryListComponent,
    SubCategoryListComponent,
    CategoryDetailComponent,
    CategorySubcategoryDetailComponent,
    CategoryFormComponent,
    SubCategoryFormComponent,
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
    CategoryRoutingModule,
    SharedModule
  ],
})
export class CategoryModule { }
