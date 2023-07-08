import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './app.material.module';

@NgModule({
    imports: [
    ],
    exports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: []
})
export class AppCommonModule {

}
