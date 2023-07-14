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

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    BodyComponent,
    DashboardComponent,
    SublevelMenuComponent,
    HeaderComponent,
    LoginComponent,
    LayoutComponent,
    RevenueAnalysisComponent,
    ChartComponent,
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
    NgApexchartsModule
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
