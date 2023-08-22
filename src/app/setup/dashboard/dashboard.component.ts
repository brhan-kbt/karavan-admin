import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { ProductService } from 'src/app/services/product.service';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // chartSeries: ApexNonAxisChartSeries = [40, 32, 28];

  // chartDetails: ApexChart = {
  //   type: 'pie',
  //   toolbar: {
  //     show: true
  //   }
  // };

  // chartLabels = ["Cake", "Coffee", "Food"];

  // chartTitle: ApexTitleSubtitle = {
  //   text: 'Total Orders',
  //   align: 'center'
  // };

  // chartDataLabels: ApexDataLabels = {
  //   enabled: true
  // };

  data: any;

  options: any;
  products!: any;
  formGroup!:FormGroup;
  value!:number;
  reportData:any;

  constructor(private product: ProductService, private report:ReportService) {
    report.getReport().then(res=>{
      this.reportData=res;
      this.selectedOrderSummary = this.reportData.orderSummary['today'];
      console.log(this.reportData);
    })
  }
  getStarStyleClass(): string {
    return this.value > 0 ? 'custom-filled-star' : '';
  }
  ngOnInit() {

    this.value = 3;
    this.formGroup = new FormGroup({
        value: new FormControl(4)
    });
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = 'black';

      this.data = {
          labels: ['Cake','Coffee',  'Food'],
          datasets: [
              {
                  data: [540, 325, 702],
                  backgroundColor: [ ' #F2BFB2',' #C58C53', '  #FFAA7F'],
                  hoverBackgroundColor: ['#F9E5D1','#F7D6B6 ',  '#FFD8B6']
              }
          ]
      };

      this.options = {
          plugins: {
              legend: {
                  labels: {
                      usePointStyle: true,
                      color: textColor
                  }
              }
          }
      };

      this.product.getProducts().then((data) => {
        this.products = data;
    });

  }
  selectedOrderSummary:any;
  updateOrderSummary(type: string): void {
    this.selectedOrderSummary = this.reportData.orderSummary[type];
    console.log(this.selectedOrderSummary)
  }



}
