import { Component } from '@angular/core';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  chartSeries: ApexNonAxisChartSeries = [40, 32, 28];

  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    }
  };

  chartLabels = ["Cake", "Coffee", "Food"];

  chartTitle: ApexTitleSubtitle = {
    text: 'Total Orders',
    align: 'center'
  };

  chartDataLabels: ApexDataLabels = {
    enabled: true
  };


  constructor() {
  }

  ngOnInit(): void {
  }
}
