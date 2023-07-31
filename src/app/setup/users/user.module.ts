import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list/user-list.component';
import { UserFormComponent } from '../ui-forms/user-form/user-form.component';
import { MaterialModule } from 'src/app/app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrashedUserListComponent } from './user-list/trashed-user-list/trashed-user-list.component';
import { ManagerUserListComponent } from './user-list/manager-user-list/manager-user-list.component';
import { CustomerUserListComponent } from './user-list/customer-user-list/customer-user-list.component';
import { BranchAdminComponent } from './user-list/branch-admin/branch-admin.component';
import { BranchSeletionFormComponent } from '../ui-forms/branch-seletion-form/branch-seletion-form.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
    TrashedUserListComponent,
    ManagerUserListComponent,
    CustomerUserListComponent,
    BranchAdminComponent,
    BranchSeletionFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
