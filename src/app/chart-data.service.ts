import { Injectable } from '@angular/core';
import {ChartDataHolder} from "./chart-data-holder";
import {SensorDataService} from "./sensor-data.service";
import {SensorData} from "./sensor-data";
import {map, Observable} from "rxjs";
import {DeviceService} from "./device.service";
import {DeviceRestartData} from "./device-restart-data";


@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  private sensorData: SensorData[][] = [];

  constructor(private sensorDataService: SensorDataService,
              private deviceService: DeviceService) { }

  getSensorDataAndProcess(startDate: string, endDate: string): Observable<ChartDataHolder[]>  {
    console.info('Dates : ' + startDate + " end: " + endDate);
    return this.sensorDataService.getSensorDataByRange(startDate, endDate).pipe(
        map((response: any[][]) => {
          this.sensorData = response;
          const chartDataHolders: ChartDataHolder[] = [];

          this.sensorData.forEach((sensorDataList) => {
            const chartTitle = sensorDataList[1].sensorDescription;

            const chartDataHolder: ChartDataHolder = {
              title: chartTitle,
              sensorData: sensorDataList,
            };
            console.log("[CHART-SERVICE] Creating ChartDataHolder for: " + chartTitle);

            chartDataHolders.push(this.populateDataPoints(sensorDataList, chartDataHolder));
          });

          return chartDataHolders;
        }));
  }

  getDeviceRestartDataAndProcess(startDate: string, endDate: string): Observable<any[]>{
    return this.deviceService.getDevicesRestartByRange(startDate, endDate).pipe(
      map((response: any[]) => {

        let result: any = [];
        const test = <DeviceRestartData[]> response;
        test.forEach((item) => {
            // item.deviceId
          result.push(item.creationDate);
        });
        return result;
      }));
  }

  populateDataPoints(content: SensorData[], chartDataHolder: ChartDataHolder): ChartDataHolder {
    let humidityArray: any[] = [];
    let temperatureArray: any[] = [];
    let labelsArray: string[] = [];

    content.forEach((item) => {
      humidityArray.push(item.humidity);
      temperatureArray.push(item.temperature);
      labelsArray.push(item.creationDate);
    });

    chartDataHolder.temperatureArray = temperatureArray;
    chartDataHolder.humidityArray = humidityArray;
    chartDataHolder.labelsArray = labelsArray;

    return chartDataHolder;
  }


}
