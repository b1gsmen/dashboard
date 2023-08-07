import {SensorData} from "./sensor-data";

export interface ChartDataHolder {
  title: string;
  sensorData: SensorData[];
  temperatureArray?: any[];
  humidityArray?: any[];
  labelsArray?: string[];
  // age: number;
  // Add more properties as needed
}
