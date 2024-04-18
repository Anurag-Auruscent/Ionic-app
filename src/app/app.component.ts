import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import OneSignal from 'onesignal-cordova-plugin';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private zone: NgZone) {
    this.initializeApp();
    // OneSignal.Debug.setLogLevel(6)
    // OneSignal.initialize(environment.OneSignalAppId);
    // OneSignal.Notifications.addEventListener('click', async (e) => {
    //   let clickData = await e.notification;
    //   console.log("Notification Clicked : " + clickData);
    // })
    // OneSignal.Notifications.requestPermission(true).then((success: Boolean) => {
    //   console.log("Notification permission granted " + success);
    // })
  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        console.log('received url', event.url);

        const domain = 'sphaghettihead:/';
        const pathArray = event.url.split(domain);
        console.log('path array', pathArray);

        const appPath = pathArray.pop();
        if (appPath) {
          console.log(appPath)
          this.router.navigateByUrl(appPath);
        }
      })
    })
  }
}
