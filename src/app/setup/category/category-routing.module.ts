import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategorySubcategoryDetailComponent } from './category-subcategory-detail/category-subcategory-detail.component';

const routes: Routes = [
  {
    path:'cat-list',
    component:CategoryListComponent
  },

  {
    path:'detail/:id',
    component:CategoryDetailComponent
  },

  {
    path:'subcategory/detail/:id',
    component:CategorySubcategoryDetailComponent
  },

  {
    path:'sub-list',
    component:SubCategoryListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
