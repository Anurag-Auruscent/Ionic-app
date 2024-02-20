
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'; // Import InAppBrowser
import axios from 'axios';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';

import { TokenService } from '../shared/services/token.service';
// import OneSignal from 'onesignal-cordova-plugin';

import { jwtDecode } from 'jwt-decode';

import { ToastService } from '../shared/services/toast.service';
import OneSignal from 'onesignal-cordova-plugin';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private inAppBrowser: InAppBrowser, // Inject InAppBrowser
    private toastController: ToastController,
    private tokenService: TokenService,
    private ts: ToastService
  ) {
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
          OneSignal.login(externalId);
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
