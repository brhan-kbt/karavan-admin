import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [
  {
    path:'add',
    component:ProductsComponent
  },
  {
    path:'list',
    component:ProductsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
