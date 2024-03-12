import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FormsModule } from '@angular/forms';

import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SHInterceptor } from './shared/interceptor/sh.interceptor';
import { TokenService } from './shared/services/token.service';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule,
    OAuthModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }, InAppBrowser, TokenService, {
    provide: HTTP_INTERCEPTORS,
    useClass: SHInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
