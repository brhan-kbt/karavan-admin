import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { MediaListComponent } from './media-list/media-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/app.material.module';
import { GalleriaModule } from 'primeng/galleria';
import { MediaFormComponent } from '../ui-forms/media-form/media-form.component';

@NgModule({
  declarations: [
    MediaListComponent,
    MediaFormComponent
  ],
  imports: [
    CommonModule,
    MediaRoutingModule,
    MaterialModule,
    FormsModule,
    GalleriaModule,
    ReactiveFormsModule
  ],

})
export class MediaModule { }
