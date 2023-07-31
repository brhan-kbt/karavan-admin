import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list/user-list.component';
import { TrashedUserListComponent } from './user-list/trashed-user-list/trashed-user-list.component';
import { CustomerUserListComponent } from './user-list/customer-user-list/customer-user-list.component';
import { ManagerUserListComponent } from './user-list/manager-user-list/manager-user-list.component';
import { BranchAdminComponent } from './user-list/branch-admin/branch-admin.component';

const routes: Routes = [
  {
    path:'customer',
    component:CustomerUserListComponent
  },
  {
    path:'manager',
    component:ManagerUserListComponent
  },
  {
    path:'branch-admins',
    component:BranchAdminComponent
  },
  {
    path:'trash',
    component:TrashedUserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
