import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './setup/dashboard/dashboard.component';
import { LoginComponent } from './setup/auth/login/login.component';

const routes: Routes = [
  {
    path:'', redirectTo:'dashboard',pathMatch:'full',
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'dashboard', component:DashboardComponent
  },
  {
    path:'products',
    loadChildren:()=>import('./setup/products/product.module').then(m=>m.ProductModule),
  },
  {
    path:'settings',
    loadChildren:()=>import('./setup/settings/setting.module').then(m=>m.SettingModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
