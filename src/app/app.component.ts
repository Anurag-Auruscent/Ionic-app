import { Component } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    OneSignal.Debug.setLogLevel(6)
    OneSignal.initialize(environment.OneSignalAppId);
    OneSignal.Notifications.addEventListener('click', async (e) => {
      let clickData = await e.notification;
      console.log("Notification Clicked : " + clickData);
    })
    OneSignal.Notifications.requestPermission(true).then((success: Boolean) => {
      console.log("Notification permission granted " + success);
    })
  }
}
