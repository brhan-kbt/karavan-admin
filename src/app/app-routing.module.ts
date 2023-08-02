import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './setup/dashboard/dashboard.component';
import { LoginComponent } from './setup/auth/login/login.component';
import { LogoutComponent } from './shared/logout/logout.component';

const routes: Routes = [
  {
    path:'', redirectTo:'dashboard',pathMatch:'full',
  },
  {
    path:'login', component:LoginComponent
  },

  {
    path:'logout', component:LogoutComponent
  },
  {
    path:'dashboard', component:DashboardComponent
  },
  {
    path:'products',
    loadChildren:()=>import('./setup/products/product.module').then(m=>m.ProductModule),
  },
  {
    path:'users',
    loadChildren:()=>import('./setup/users/user.module').then(m=>m.UserModule),
  },
  {
    path:'branch',
    loadChildren:()=>import('./setup/branch/branch.module').then(m=>m.BranchModule),
  },
  {
    path:'settings',
    loadChildren:()=>import('./setup/settings/setting.module').then(m=>m.SettingModule),
  },
  {
    path:'order',
    loadChildren:()=>import('./setup/order/order.module').then(m=>m.OrderModule),
  },

  {
    path:'category',
    loadChildren:()=>import('./setup/category/category.module').then(m=>m.CategoryModule),
  },
  {
    path:'reward',
    loadChildren:()=>import('./setup/reward/reward.module').then(m=>m.RewardModule),
  },

  {
    path:'gallery',
    loadChildren:()=>import('./setup/media/media.module').then(m=>m.MediaModule),
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
