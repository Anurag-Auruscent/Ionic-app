
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'; // Import InAppBrowser
import axios from 'axios';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

import { TokenService } from '../shared/services/token.service';

import { jwtDecode } from 'jwt-decode';

import { ToastService } from '../shared/services/toast.service';
import OneSignal from 'onesignal-cordova-plugin';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { FormGroup } from '@angular/forms';

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
  userEmail: string = '';
  userPassword: string = '';
  user = null
  selectedSegment: any = 'email';
  loginForm!: FormGroup;
  userNumber: string = ''
  areCredentialsWrong: boolean = false;

  constructor(
    private router: Router,
    private inAppBrowser: InAppBrowser, // Inject InAppBrowser
    private toastController: ToastController,
    private tokenService: TokenService,
    private ts: ToastService,
  ) {
    this.initializeApp();
  }

  ionViewWillEnter() {
    const button = document.querySelector('.segmentLabel');
    button?.classList.add('active');
  }

  ionViewWillLeave() {
    const buttons = document.querySelectorAll('.segmentLabel');
    buttons.forEach(button => {
      const segmentButton = button as HTMLIonSegmentButtonElement;
      segmentButton.classList.remove('active');
    });
    this.selectedSegment = "email"
    this.userEmail = ""
    this.userPassword = ""
    this.userNumber = ""
  }

  handleFieldClick(buttonValue: string) {
    console.log(`${buttonValue} clicked`);

    const buttons = document.querySelectorAll('.segmentLabel');
    buttons.forEach(button => {
      const segmentButton = button as HTMLIonSegmentButtonElement;
      if (segmentButton.value === buttonValue) {
        segmentButton.classList.add('active');
      } else {
        segmentButton.classList.remove('active');
      }
    })
  }

  initializeApp() {
    GoogleAuth.initialize()
  }

  async signIn() {
    try {
      const user = await GoogleAuth.signIn();
      console.log('user', user);
    } catch (error) {
      if (error === "popup_closed_by_user") {
        this.ts.presentToast(error, 2000); return
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

  onEmailChange(newEmail: string) {
    this.userEmail = newEmail
  }

  onPasswordChange(newPassword: string) {
    this.userPassword = newPassword
  }

  onNumberChange(newNumber: string) {
    this.userNumber = newNumber
  }

  goToRegisterPage() {
    this.router.navigate(['/registration']);
  }

  goToForgotPasswordPage() {
    this.router.navigate(['/forgot-password']);
  }

  login() {

    if (this.selectedSegment === "phone") {
      this.userEmail = '';
      this.userPassword = '';
      if (!this.userNumber) {
        console.error('Username number is required');
        this.ts.presentToast('User Phone number is required', 2000);
        return;
      }
      console.log("This is a phone number", this.userNumber);
    }

    if (this.selectedSegment === "email") {
      this.userNumber = '';
      if (!this.userEmail || !this.userPassword) {
        console.error('Username and password are required');
        this.ts.presentToast('Username and password are required', 2000);
        return;
      }
      const keycloakCredentials = {
        client_id: environment.clientId,
        // client_id: '',
        grant_type: 'password',
        username: this.userEmail,
        password: this.userPassword,
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
          this.areCredentialsWrong = false;
          console.log('Authentication successful', response.data);
          this.ts.presentToast('Authentication successful', 2000, 'success');
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
          this.ts.presentToast('Authentication failed', 2000);
          if (error.response && error.response.status === 401) {
            this.areCredentialsWrong = true; // Set the flag only on incorrect credentials
          } else {
            this.areCredentialsWrong = false; // Reset the flag for other errors
          }
          // Display an error message or perform other actions as needed
        });
    }
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
