
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'; // Import InAppBrowser
import axios from 'axios';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';

import { TokenService } from '../shared/services/token.service';

import { jwtDecode } from 'jwt-decode';

import { ToastService } from '../shared/services/toast.service';
import OneSignal from 'onesignal-cordova-plugin';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { OAuthService } from 'angular-oauth2-oidc';
// import { KeycloakService } from '../keycloakservice.service';

// use hook after platform dom ready
// GoogleAuth.initialize({
//   clientId: '655025045604-okroi8g3i019jd3mqvigt7t5kq4kls63.apps.googleusercontent.com',
//   scopes: ['profile', 'email'],
//   grantOfflineAccess: true,
// });


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  user = null

  constructor(
    private router: Router,
    private inAppBrowser: InAppBrowser, // Inject InAppBrowser
    private toastController: ToastController,
    private tokenService: TokenService,
    private ts: ToastService,
    private oauthService: OAuthService
    // private keycloakService: KeycloakService
  ) {
    this.initializeApp();
  }
  initializeApp() {
    GoogleAuth.initialize()
  }

  loginWithGoogle() {
    // Redirect to Keycloak for Google login
    // this.keycloakService.login({ idpHint: 'google' });
  }


  async signIn() {
    try {
      const user = await GoogleAuth.signIn();
      console.log('user', user);
    } catch (error) {
      if (error === "popup_closed_by_user") {
        this.presentErrorToast(error); return
      }
    }
  }

  async refresh() {
    const authCode = await GoogleAuth.refresh();
    console.log('authCode', authCode);
  }

  async signOut() {
    await GoogleAuth.signOut();
    this.user = null;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duration in milliseconds
      position: 'bottom',
      color: 'success', // You can customize the color
    });
    toast.present();
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'danger', // Customize the color for error
    });
    toast.present();
  }

  configureOAuth(): void {
    // Set your Keycloak configuration here
    this.oauthService.configure({
      clientId: 'ionic-angular-gateway',
      issuer: 'http://localhost:8080/realms/angular-oauth',
      redirectUri: window.location.origin + '/login', // Adjust as needed
      postLogoutRedirectUri: window.location.origin + '/login',
      scope: 'openid profile email',
      customQueryParams: { 'kc_idp_hint': 'google' },
    });

    this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
      // Check if the user is authenticated after loading discovery document
      if (this.oauthService.hasValidAccessToken()) {
        this.router.navigate(['/home']); // Redirect to home if authenticated
      }
    });
  }

  googleLogin(): void {
    console.log('googleLogin clicked')
    this.oauthService.initCodeFlow();
  }

  login() {
    // console.log('Username:', this.username);
    // console.log('Password:', this.password);

    if (!this.username || !this.password) {
      console.error('Username and password are required');
      this.presentErrorToast('Username and password are required');
      return;
    }

    const keycloakCredentials = {
      client_id: environment.clientId,
      // client_id: '',
      grant_type: 'password',
      username: this.username,
      password: this.password,
      client_secret: environment.clientSecret,
      // client_secret: '',
    };

    // Replace 'your-keycloak-server' with the actual URL of your Keycloak server
    const keycloakUrl = environment.keycloakUrl;
    // const keycloakUrl = '';

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    console.log(keycloakCredentials, keycloakUrl, headers);
    axios.post(keycloakUrl, this.toFormUrlEncoded(keycloakCredentials), { headers: headers })
      .then((response) => {
        // Authentication successful
        console.log('Authentication successful', response.data);
        this.presentToast('Authentication successful');
        const token = response.data.access_token;
        this.tokenService.setToken(token);
        const decodedToken = jwtDecode(response.data.access_token);
        if (decodedToken.sub !== undefined) {
          const externalId = decodedToken.sub;
          // OneSignal.login(externalId);
        } else {
          // Handle the case where decodedToken.sub is undefined
          console.error('Decoded token sub is undefined');
        }
        // Navigate to a different page after successful login
        this.router.navigate(['/login', { skipLocationChange: true }]);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        // Handle authentication failure
        console.error('Authentication failed', error);
        this.presentErrorToast('Authentication failed');
        // Display an error message or perform other actions as needed
      });
  }

  // Helper function to convert an object to x-www-form-urlencoded format
  private toFormUrlEncoded(obj: any): string {
    const formBody: string[] = [];
    for (const property in obj) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(obj[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    // console.log(formBody);
    return formBody.join('&');
  }
}
