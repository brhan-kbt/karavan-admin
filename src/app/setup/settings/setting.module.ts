import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingsComponent } from './settings.component';
import { CustomizeComponent } from './customize/customize.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatInputModule } from '@angular/material/input';
import { EditorModule } from 'primeng/editor';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    SettingsComponent,
    CustomizeComponent,
    ProfileComponent,
    SettingComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    MatInputModule,
    EditorModule,
    ToastModule
  ]
})
export class SettingModule { }
