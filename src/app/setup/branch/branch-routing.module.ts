import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchlistComponent } from './branch-list/branchlist/branchlist.component';

const routes: Routes = [
  {
    path:'list',
    component:BranchlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
