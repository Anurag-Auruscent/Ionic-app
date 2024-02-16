import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private zone: NgZone) {
    this.initializeApp();
  }

  initializeApp(){
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        console.log('received url', event.url);
        
        const domain = 'sphaghettihead:/';
        const pathArray = event.url.split(domain);
        console.log('path array', pathArray);
        
        const appPath = pathArray.pop();
        if(appPath){
          console.log(appPath)
          this.router.navigateByUrl(appPath);
        }
      })
    })
  }
}
