import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DeviceRestartData} from "./device-restart-data";
import {environment} from "../environments/environment";
import {DeviceConfiguration} from "./device-configuration";


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private readonly deviceRestartsUrl;
  private readonly deviceConfigurationUrl;

  constructor(private http: HttpClient) {
    this.deviceRestartsUrl = environment.apiUrl + '/devices-restart?deviceId=' + environment.deviceId;
    this.deviceConfigurationUrl = environment.apiUrl + '/devices/' + environment.deviceId + '/configuration' ;
  }

  getDevicesRestartByRange(startDate: any, endDate: any): Observable<DeviceRestartData[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<any>(this.deviceRestartsUrl, { headers: headers, params: params });
  }

  getDeviceConfiguration(): Observable<DeviceConfiguration> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(this.deviceConfigurationUrl, { headers: headers });
  }

  putDeviceConfiguration(deviceConfig: DeviceConfiguration): Observable<DeviceConfiguration> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(this.deviceConfigurationUrl, deviceConfig, { headers: headers });
  }
}
