import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {FlatpickrOptions} from "ng2-flatpickr";
import {DatetimePickerService} from "../datetime-picker.service";

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.css']
})
export class DatetimePickerComponent implements AfterViewInit {
  DAY = 86400000;
  HOUR = 3600000;

  @ViewChild('startPicker', { static: true }) startPicker: any;
  @ViewChild('endPicker', { static: true }) endPicker: any;

  ngAfterViewInit() {
    // Initialize Flatpickr manually after the view has been initialized
  }

  startOptions: FlatpickrOptions = {
    enableTime: true,
    time_24hr: true,
    mode: 'single',
    dateFormat: 'd.m.Y H:i',
    defaultDate: new Date(Date.now() - (this.HOUR*4)),
    maxDate: new Date(Date.now() - 3600000),
    onClose: (selectedDates: Date) => {
      console.log("[PICKER COMPONENT]onChange StartDate: " + selectedDates);
      this.onStartDateSelected(selectedDates);
    },
    onReady: (selectedDates: Date) => {
      console.log("[PICKER COMPONENT]onReady StartDate: " + selectedDates);
      this.onStartDateSelected(selectedDates);
    }
  };

  endOptions: FlatpickrOptions = {
    enableTime: true,
    time_24hr: true,
    mode: 'single',
    dateFormat: 'd.m.Y H:i',
    defaultDate: new Date(Date.now()),
    maxDate: new Date(Date.now()),
    onClose: (selectedDates: Date) => {
      console.log("[PICKER COMPONENT]onChange endDate: " + selectedDates);
      this.onEndDateSelected(selectedDates)
    },
    onReady: (selectedDates: Date) => {
      console.log("[PICKER COMPONENT]onChange endDate: " + selectedDates);
      this.onEndDateSelected(selectedDates);
    }
  };

  constructor(private datetimePickerService: DatetimePickerService) {}

  onStartDateSelected(selectedStartDate: any) {
    console.log("startDate:  " + selectedStartDate);
    this.datetimePickerService.setStartDate(selectedStartDate);
    this.datetimePickerService.publishStartDateSelected(selectedStartDate);
  }

  onEndDateSelected(selectedEndDate: any) {
    console.log("endDate:  " + selectedEndDate);
    this.datetimePickerService.setEndDate(selectedEndDate);
    this.datetimePickerService.publishEndDateSelected(selectedEndDate);
  }
}
