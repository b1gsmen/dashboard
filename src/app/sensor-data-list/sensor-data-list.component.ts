import {Component, OnInit} from '@angular/core';
import { SensorDataService } from '../sensor-data.service';
import {SensorData} from "../sensor-data";

@Component({
  selector: 'app-sensor-data-list',
  templateUrl: './sensor-data-list.component.html',
  styleUrls: ['./sensor-data-list.component.css']
})
export class SensorDataListComponent implements OnInit {

  sensorDataList:  SensorData[] = [];
  totalPages = 0;
  pageNumber = 1;
  pageSize = 25; // Set the desired page size

  constructor(private sensorDataService: SensorDataService) { }

  ngOnInit(): void {
    this.loadPage(this.pageNumber -1, this.pageSize);
  }

  loadPage(pageNumber: number, pageSize: number): void {
    this.sensorDataService.getSensorDataPage(pageNumber, pageSize).subscribe(
      response => {
        this.sensorDataList = response.content;
        this.pageNumber = response.number;
        this.totalPages = response.totalPages - 1;
        // You can also handle other pagination properties like total items, current page, etc. from the response
      },
      error => {
        console.error('Error loading data:', error);
      }
    );
  }

  loadNextPage(): void {
    this.pageNumber++;
    this.loadPage(this.pageNumber, this.pageSize);
  }

  loadPreviousPage(): void {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.loadPage(this.pageNumber, this.pageSize);
    }
  }

  getLastPageNumber(): any {
    return this.totalPages;
  }
}
