import {Component, OnInit} from '@angular/core';
import {DeviceConfiguration} from "../device-configuration";
import {DeviceService} from "../device.service";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  deviceConfig!: DeviceConfiguration;

  constructor(private deviceService: DeviceService){ }

  saveForm(): void {
    let deviceConfiguration = this.mapConfigToBackend(this.deviceConfig);
    console.log(deviceConfiguration);

    this.deviceService.putDeviceConfiguration(deviceConfiguration).subscribe(
      (response: DeviceConfiguration) => {
        this.deviceConfig = response;
      },
      (error: any) => {
        console.error('Error fetching device configuration:', error);
      }
    );
  }

  switchRelay1(): void {
    // Handler logic for switching relay 1
  }

  switchRelay2(): void {
    // Handler logic for switching relay 2
  }

  disableRelay1(): void {
    // Handler logic for disabling relay 1
  }

  disableRelay2(): void {
    // Handler logic for disabling relay 2
  }

  ngOnInit(): void {
    this.deviceService.getDeviceConfiguration().subscribe(
      (response: DeviceConfiguration) => {
        this.deviceConfig = this.mapConfigToFront(response);
      },
      (error: any) => {
        console.error('Error fetching device configuration:', error);
      }
    );
  }

  mapConfigToFront(deviceConfig: DeviceConfiguration):DeviceConfiguration {
    let clonedObject = { ...deviceConfig };
    clonedObject.sensorDataInterval = this.mapMiliSecToSec(clonedObject.sensorDataInterval);
    clonedObject.sensorReadInterval = this.mapMiliSecToSec(clonedObject.sensorReadInterval);
    clonedObject.fanWorkInterval = this.mapMiliSecToMin(clonedObject.fanWorkInterval);
    clonedObject.fanWorkPeriodInterval = this.mapMiliSecToMin(clonedObject.fanWorkPeriodInterval);
    clonedObject.pumpWorkInterval = this.mapMiliSecToSec(clonedObject.pumpWorkInterval);

    return clonedObject;
  }

  mapConfigToBackend(deviceConfig: DeviceConfiguration):DeviceConfiguration {
    let clonedObject = { ...deviceConfig };
    clonedObject.sensorDataInterval = this.mapSecToMiliSec(clonedObject.sensorDataInterval);
    clonedObject.sensorReadInterval = this.mapSecToMiliSec(clonedObject.sensorReadInterval);
    clonedObject.fanWorkInterval = this.mapMinToMiliSec(clonedObject.fanWorkInterval);
    clonedObject.fanWorkPeriodInterval = this.mapMinToMiliSec(clonedObject.fanWorkPeriodInterval);
    clonedObject.pumpWorkInterval = this.mapSecToMiliSec(clonedObject.pumpWorkInterval);

    return clonedObject;
  }

  mapMiliSecToSec(value: number): number {
    return value/1000
  }

  mapMiliSecToMin(value: number): number {
    return value/(60* 1000)
  }

  mapSecToMiliSec(value: number): number {
    return value * 1000
  }

  mapMinToMiliSec(value: number): number {
    return value * (60* 1000)
  }
}
