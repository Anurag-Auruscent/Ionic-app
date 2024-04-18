import { Injectable } from '@angular/core';
import { App, URLOpenListenerEvent } from '@capacitor/app';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  receivedUrl: string = '';

  constructor() {
    this.initializeApp();
  }

  private initializeApp(){
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      console.log(event);
      
      this.receivedUrl = event.url;
    })
  }
}
