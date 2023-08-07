import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DatetimePickerService {
  private startDate: Date = new Date();
  private endDate: Date = new Date();

  private startDateSubject  = new Subject<Date>();
  private endDateSubject = new Subject<Date>();
  startDateSubjectSelected$ = this.startDateSubject.asObservable();
  endDateSubjectSelected$ = this.endDateSubject.asObservable();

  setStartDate(date: Date) {
    console.log("[PICKER SERVICE] StartDate: " + date);
    this.startDate = date;
  }

  publishStartDateSelected(date: Date) {
    this.startDateSubject.next(date);
  }

  publishEndDateSelected(date: Date) {
    this.endDateSubject.next(date);
  }

  getStartDate(): Date {
    return this.startDate;
  }
  //
  setEndDate(date: Date) {
    console.log("[PICKER SERVICE] endDate: " + date);
    this.endDate = date;
  }

  getEndDate(): Date {
    return this.endDate;
  }

}
