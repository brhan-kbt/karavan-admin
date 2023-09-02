import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchlistComponent } from './branch-list/branchlist/branchlist.component';
import { MaterialModule } from 'src/app/app.material.module';
import { BranchFormComponent } from '../ui-forms/branch-form/branch-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shimmer/table-shimmer-effect/shared.module';


@NgModule({
  declarations: [
    BranchlistComponent,
    BranchFormComponent,
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class BranchModule { }
