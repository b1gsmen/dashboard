import { Component } from '@angular/core';
import {ChartDataset, ChartData, ChartOptions, ChartType} from "chart.js";

@Component({
  selector: 'app-test-chart',
  templateUrl: './test-chart.component.html',
  styleUrls: ['./test-chart.component.css']
})
export class TestChartComponent {

  public testChartType: ChartType = 'line';
  public lineChartLegend = true;

  data1: number[] = [1, 15, 4, 12, 7, 25, 10, 14, 2];

  dataSet: ChartDataset = {
    label: "Dataset 1 ",
    data: this.data1,
    pointStyle: false,
    fill: true,
    borderWidth: 1
  };

  public testChartData: ChartData = {
    labels: ["Test", "Test1", "Test2", 1, 2, 3, 4, 5, 6, 7, 8],
    datasets: [this.dataSet],
  };

  public testChartLabels: string[] = ["10", "9", "8", "8", "7", "6", "5", "4", "3", "2", "1"];

  public testChartOptions: ChartOptions = {
    responsive: true,
    animation: false,
    plugins: {
      title: {
        position: 'left',
        display: true,
        text: "Test chart",
        font: {
          size: 16
        }
      },
      legend: {
        display: true
      }
    }
  };


}
