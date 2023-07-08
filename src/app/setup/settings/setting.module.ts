import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingsComponent } from './settings.component';
import { CustomizeComponent } from './customize/customize.component';


@NgModule({
  declarations: [
    SettingsComponent,
    CustomizeComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
