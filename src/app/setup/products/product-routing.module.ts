import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { AvailablityComponent } from './availablity/availablity.component';
import { IngredeintComponent } from './ingredeint/ingredeint.component';
import { ProductIngredientComponent } from './product-ingredient/product-ingredient.component';
import { SeasonalProductsComponent } from './seasonal-products/seasonal-products.component';

const routes: Routes = [
  {
    path:'add',
    component:ProductsComponent
  },
  {
    path:'list',
    component:ProductsListComponent
  },
  {
    path:'seasonal',
    component:SeasonalProductsComponent
  },
  {
    path:'ingredients-list',
    component:IngredeintComponent
  },
  {
    path:'availability',
    component:AvailablityComponent
  },
  {
    path:'select-ingredient',
    component:ProductIngredientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
