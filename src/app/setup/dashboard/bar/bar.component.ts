import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  data: any;
  options: any;
  reportData: any;
  labels: any;
  datasets: any[] = [];
  categories = ['cake', 'hot beverages', 'fast food'];
  chartConfig: any;

  constructor(private report: ReportService) {}

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const categoryColors: { [key: string]: string } = {
      cake: documentStyle.getPropertyValue('--blue-500'),
      'hot beverages': documentStyle.getPropertyValue('--pink-500'),
      'fast food': documentStyle.getPropertyValue('--pink-400'),
    };

    this.report.getReport().then((res) => {
      this.reportData = res.categorySummary;
      console.log('Bar : ', this.reportData);
      this.labels = Object.keys(this.reportData);
      console.log('Labels : ', this.labels);

      this.categories.forEach((category) => {
        const dataset = {
          data: this.labels.map((month: any) => this.reportData[month][category]),
          label: category,
          backgroundColor: categoryColors[category],
          borderColor: categoryColors[category],
        };

        this.datasets.push(dataset);
      });

      this.chartConfig = {
        labels: this.labels,
        datasets: this.datasets,
      };

      this.data = {
        labels: this.labels,
        datasets: this.chartConfig.datasets,
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500,
              },
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
        },
      };

      console.log('====================================');
      console.log('Chart Data : ', this.chartConfig);
      console.log('====================================');
    });
  }
}
