import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DatetimePickerComponent } from './datetime-picker/datetime-picker.component';
import { ChartComponent } from './chart-component/chart.component';
import { SensorDataListComponent } from './sensor-data-list/sensor-data-list.component';
import {DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { TestChartComponent } from './test-chart/test-chart.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contacts', component: ContactComponent },
  { path: 'devices/:deviceId/configuration', component: ConfigurationComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DatetimePickerComponent,
    ChartComponent,
    SensorDataListComponent,
    TestChartComponent,
    ConfigurationComponent,
    NavigationBarComponent,
    HomeComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule,
    Ng2FlatpickrModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
