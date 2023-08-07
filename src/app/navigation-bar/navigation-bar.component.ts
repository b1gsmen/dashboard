import { Component } from '@angular/core';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  title = 'b1gs mushroom chamber';
  deviceId = environment.deviceId;

}
