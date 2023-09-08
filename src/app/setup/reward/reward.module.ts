import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardRoutingModule } from './reward-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { MaterialModule } from 'src/app/app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shimmer/table-shimmer-effect/shared.module';


@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    RewardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RewardModule { }
