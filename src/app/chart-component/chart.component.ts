import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ChartData, ChartDataset, ChartOptions, ChartType, LayoutPosition} from "chart.js";
import {SensorDataService} from "../sensor-data.service";
import {DatePipe} from "@angular/common";
import {DatetimePickerService} from "../datetime-picker.service";
import {Subscription} from "rxjs";
import {ChartDataService} from "../chart-data.service";
import {ChartDataHolder} from "../chart-data-holder";

type ChartPosition = 'top' | 'right' | 'bottom' | 'left';


@Component({
  selector: 'app-chart-component',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit, OnDestroy {

  private chartDataHolders: ChartDataHolder [] = [];

  public lineChartData: ChartDataset[][] = [];

  public lineChartLabels: string[][] = [];
  public lineChartOptions: ChartOptions[] = [];

  public selectedChartType: ChartType = 'line';

  private startDateSelectedSubscription!: Subscription;
  private endDateSelectedSubscription!: Subscription;

  constructor(private sensorDataService: SensorDataService,
              private chartDataService: ChartDataService,
              private datetimePickerService: DatetimePickerService,
              private datePipe: DatePipe) {
  }

  onChartTypeChange(): void {
    console.log('Selected Chart Type Changed:', this.selectedChartType);
    this.lineChartOptions = [];
    this.convertToChartData(this.chartDataHolders);
  }

  convertToChartData(chartDataHolders: ChartDataHolder[]): void {
    this.lineChartData = [];
    this.lineChartLabels = [];
    this.lineChartOptions = [];
    this.chartDataHolders = chartDataHolders;
    chartDataHolders.forEach((chartDataHolder) => {
      let temperatureDataSet: ChartDataset = this.createDataSet(chartDataHolder.temperatureArray!, 'Temperature', 'red');
      let humidityDataSet: ChartDataset = this.createDataSet(chartDataHolder.humidityArray!, 'Humidity', 'blue');
      console.log("[CHART] Populating data for " + chartDataHolder.title + " Sensor data: " + chartDataHolder.sensorData.length);
      this.lineChartData.push([temperatureDataSet, humidityDataSet]);
      this.lineChartLabels.push(chartDataHolder.labelsArray!.map((creationDate, index) => (index % 10 === 0 ? this.formatDateAndTimeForChart(creationDate) : '')));

      if (this.selectedChartType == 'bar') {
        this.populateChartOptions(chartDataHolder.title, 'right');
      } else {
        this.populateChartOptions(chartDataHolder.title, 'left');
      }
    });
  }

  createRestartsDataset(restartArray: any[]): ChartDataset {
    return {
      data: restartArray,
      label: 'Restarts',
      borderColor: 'green',
      fill: true,
      pointStyle: false,
      borderWidth: 0
    }
  }

  populateChartOptions(chartTitle: string, chartPosition: ChartPosition): void {
    console.log("[CHART] setting " + chartPosition + " chart options. lineChartOptions.size " + this.lineChartOptions.length);
    this.lineChartOptions.push({
      responsive: true,
      plugins: {
        title: {
          position: chartPosition,
          display: true,
          text: chartTitle,
          font: {
            size: 16
          }
        },
        legend: {
          display: true
        }
      }
    });
  }

  createDataSet(data: any[], label: string, borderColor: string): ChartDataset {
    let dataSet: ChartDataset = {
      type: this.selectedChartType,
      data: data,
      label: label,
      borderColor: borderColor,

    };
    if (dataSet.type == 'line') {
       dataSet.fill = true;
       dataSet.pointStyle = false;
       dataSet.borderWidth = 1;

    }
    return dataSet;
  }

  formatDateAndTimeForChart(datetime: string): string {
    const date = new Date(datetime);
    return this.datePipe.transform(date, 'HH-mm')!;
  }

  transformDateForBackEnd(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd\'T\'HH:mm:ss')!
  }

  ngAfterViewInit() {
    let startDate = this.datePipe.transform(this.datetimePickerService.getStartDate(), 'yyyy-MM-dd\'T\'HH:mm:ss')!;
    let endDate = this.datePipe.transform(this.datetimePickerService.getEndDate(), 'yyyy-MM-dd\'T\'HH:mm:ss')!;

    this.chartDataService.getSensorDataAndProcess(startDate, endDate)
      .subscribe((chartDataHolders) => {
        this.convertToChartData(chartDataHolders)
      });

    this.chartDataService.getDeviceRestartDataAndProcess(startDate, endDate).subscribe((creationDateArray) => {
      let restartsDataSet = this.createRestartsDataset(creationDateArray);
      this.lineChartData.forEach((dataSetArray) => {
        dataSetArray.push(restartsDataSet)
      })
    });
    // this.convertToChartData(this.chartDataHolders);
    console.log("[CHART] IN CHART INIT METHOD");

    this.startDateSelectedSubscription = this.datetimePickerService.startDateSubjectSelected$.subscribe((date: Date) => {
      this.chartDataService.getSensorDataAndProcess(this.transformDateForBackEnd(date)!, this.transformDateForBackEnd(this.datetimePickerService.getEndDate())!)
        .subscribe((chartDataHolders) => {
          console.log("[CHART] IN CHART START DATE UPDATE METHOD");
          this.convertToChartData(chartDataHolders)
        });
      this.chartDataService.getDeviceRestartDataAndProcess(this.transformDateForBackEnd(date)!, this.transformDateForBackEnd(this.datetimePickerService.getEndDate())!)
        .subscribe((creationDateArray) => {
          let restartsDataSet = this.createRestartsDataset(creationDateArray);
          this.lineChartData.forEach((dataSetArray) => {
            dataSetArray.push(restartsDataSet)
          })
        });
    });

    this.endDateSelectedSubscription = this.datetimePickerService.endDateSubjectSelected$.subscribe(async (date: Date) => {
      this.chartDataService.getSensorDataAndProcess(this.transformDateForBackEnd(this.datetimePickerService.getStartDate())!, this.transformDateForBackEnd(date)!)
        .subscribe((chartDataHolders) => {
          console.log("[CHART] IN CHART END DATE UPDATE METHOD");
          this.convertToChartData(chartDataHolders)
        });
      this.chartDataService.getDeviceRestartDataAndProcess(this.transformDateForBackEnd(this.datetimePickerService.getStartDate())!, this.transformDateForBackEnd(date)!)
        .subscribe((creationDateArray) => {
          var restartsDataSet = this.createRestartsDataset(creationDateArray);
          this.lineChartData.forEach((dataSetArray) => {
            dataSetArray.push(restartsDataSet)
          })
        });
    });
  }

  ngOnDestroy(): void {
    this.startDateSelectedSubscription.unsubscribe();
    this.endDateSelectedSubscription.unsubscribe();
  }
}
