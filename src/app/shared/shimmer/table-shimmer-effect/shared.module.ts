import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableShimmerEffectComponent } from './table-shimmer-effect.component';



@NgModule({
  declarations: [
    TableShimmerEffectComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ // Add this line to export the component
    TableShimmerEffectComponent
  ]
})
export class SharedModule { }
