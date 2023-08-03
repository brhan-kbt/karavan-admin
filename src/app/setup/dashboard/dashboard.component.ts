import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { ProductService } from 'src/app/services/product.service';

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

  constructor(private product: ProductService) {}
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




}
