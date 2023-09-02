import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { BodyComponent } from './shared/body/body.component';
import { DashboardComponent } from './setup/dashboard/dashboard.component';
import { SublevelMenuComponent } from './shared/sidenav/sublevel-menu.component';
import { HeaderComponent } from './shared/header/header.component';
import { OverlayModule } from '@angular/cdk/overlay'
import { CdkMenuModule } from '@angular/cdk/menu';
import { LoginComponent } from './setup/auth/login/login.component';
import { LayoutComponent } from './setup/layout/layout.component'
import { AppCommonModule } from './app.common.module';

import { MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthInterceptor } from './setup/interceptor/auth.interceptor';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { RevenueAnalysisComponent } from './setup/auth/analytics/revenue-analysis/revenue-analysis.component';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartComponent } from './setup/auth/chart/chart.component';
import { VerifyDeleteOrRestoreComponent } from './shared/verify-delete-or-restore/verify-delete-or-restore.component';
import { ChartModule } from 'primeng/chart';
import { BarComponent } from './setup/dashboard/bar/bar.component';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { ProductFormComponent } from './setup/ui-forms/product-form/product-form.component';
import { LogoutComponent } from './shared/logout/logout.component';
import { RatingModule } from 'primeng/rating';
import { DonoutComponent } from './setup/dashboard/donout/donout.component';
import { IngredientFormComponent } from './setup/ui-forms/ingredient-form/ingredient-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { UpdateAvailablityComponent } from './setup/ui-forms/update-availablity/update-availablity.component';
import { ProfileFormComponent } from './setup/ui-forms/profile-form/profile-form.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IngredientProductComponent } from './setup/ui-forms/ingredient-product/ingredient-product.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    BodyComponent,
    DonoutComponent,
    DashboardComponent,
    SublevelMenuComponent,
    HeaderComponent,
    LoginComponent,
    LayoutComponent,
    RevenueAnalysisComponent,
    ChartComponent,
    VerifyDeleteOrRestoreComponent,
    BarComponent,
    ProductFormComponent,
    LogoutComponent,
    IngredientFormComponent,
    UpdateAvailablityComponent,
    ProfileFormComponent,
    IngredientProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OverlayModule,
    CdkMenuModule,
    AppCommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    CanvasJSAngularChartsModule,
    NgChartsModule,
    NgApexchartsModule,
    ChartModule,
    TableModule,
    DatePipe,
    RatingModule,
    MatSelectModule,
    MatChipsModule,
    ProgressSpinnerModule,
    NgMultiSelectDropDownModule,


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: NgChartsConfiguration, useValue: { generateColors: false }}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
