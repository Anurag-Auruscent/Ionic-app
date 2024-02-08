
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'; // Import InAppBrowser
import axios from 'axios';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';

import { TokenService } from '../shared/services/token.service';

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
    private tokenService: TokenService
  ) {
    this.tokenService.clearToken()
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
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    if (!this.username || !this.password) {
      console.error('Username and password are required');
      this.presentErrorToast('Username and password are required');
      return;
    }

    const keycloakCredentials = {
      client_id: environment.clientId,
      grant_type: 'password',
      username: this.username,
      password: this.password,
      client_secret: environment.clientSecret,
    };

    // Replace 'your-keycloak-server' with the actual URL of your Keycloak server
    const keycloakUrl = environment.keycloakUrl;

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    console.log(keycloakCredentials, keycloakUrl, headers);


    axios.post(keycloakUrl, this.toFormUrlEncoded(keycloakCredentials), { headers: headers })
      .then((response) => {
        // Authentication successful

        console.log('Authentication successful', response.data);
        this.presentToast('Authentication successful');
        // You may want to store the tokens or perform additional actions
        // Sets token inside the authService
        const token = response.data.access_token;
        console.log(token)
        this.tokenService.setToken(token);

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
    console.log(formBody);
    return formBody.join('&');
  }
}
