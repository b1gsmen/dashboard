import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class SensorDataService {

  private readonly sensorDataUrl;
  private readonly sensorDataRangeUrl;

  constructor(private http: HttpClient) {
    console.log(environment.apiUrl);
    console.log(environment.deviceId);
    this.sensorDataUrl = environment.apiUrl + '/sensor-data?deviceId=' + environment.deviceId;
    this.sensorDataRangeUrl = environment.apiUrl + '/sensor-data-range?deviceId=' + environment.deviceId;
  }

  getSensorDataPage(pageNumber: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', pageSize.toString());

    return this.http.get<any>(this.sensorDataUrl, { headers: headers, params: params });
  }

  getSensorDataByRange(startDate: any, endDate: any): Observable<[][]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<any>(this.sensorDataRangeUrl, { headers: headers, params: params });
  }
}
