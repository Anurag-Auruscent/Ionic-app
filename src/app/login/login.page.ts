
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx'; // Import InAppBrowser
import axios from 'axios';
import { ToastController, isPlatform } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';

import { TokenService } from '../shared/services/token.service';

import { jwtDecode } from 'jwt-decode';

import { ToastService } from '../shared/services/toast.service';
import OneSignal from 'onesignal-cordova-plugin';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { FormGroup } from '@angular/forms';
import pkceChallenge from 'pkce-challenge';
import { TokenRequestBody } from '../model/library.model';

// use hook after platform dom ready
GoogleAuth.initialize({
  clientId: '655025045604-okroi8g3i019jd3mqvigt7t5kq4kls63.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  grantOfflineAccess: true,
});


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
  code!: string | null;
  code_challenge!: any;
  code_verifier!: any;
  kc_idp_hint!: string | null;


  @ViewChild('webView', { static: true }) webView!: ElementRef;

  constructor(
    private router: Router,
    private inAppBrowser: InAppBrowser, // Inject InAppBrowser
    private toastController: ToastController,
    private tokenService: TokenService,
    private ts: ToastService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.initializeApp();
    // this.route.queryParams.subscribe(params => {
    //   const codeValue = params['code'];
    //   if (codeValue) {
    //     this.callGoogleLogin(codeValue);
    //   }
    // });
    this.generateChallengeAndLogin();
  }

  async loadCodeChallenge() {
    // Load the code challenge from local storage
    this.code_challenge = localStorage.getItem('code_challenge');
    this.code_verifier = localStorage.getItem('code_verifier');
    if (!this.code_challenge || !this.code_verifier) {
      // Generate a new code challenge and verifier if they are not stored
      await this.generateChallenge();
    }
  }

  async generateChallengeAndLogin() {
    try {
      // Load the code challenge
      await this.loadCodeChallenge();
      // Proceed to callGoogleLogin if a code is present
      const codeValue = this.getParameterByName('code');
      if (codeValue) {
        this.callGoogleLogin(codeValue);
      }
    } catch (error) {
      console.error('Error generating challenge:', error);
    }
  }

  async callFacebookLogin(code: string) {

  }


  async callGoogleLogin(code: string) {
    console.log("calling with code: ", code);
    // const challenge = await pkceChallenge(128);
    const requestBody: TokenRequestBody = {
      client_id: 'ionic-angular-gateway',
      client_secret: environment.clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:8100/login',
      code: code,
      code_verifier: this.code_verifier
    };
    const keycloakUrl = environment.keycloakUrl;

    console.log(requestBody);


    //   const string = "http://localhost:8080/realms/angular-oauth/protocol/openid-connect/auth?client_id=ionic-angular-gateway&redirect_uri=http%3A%2F%2Flocalhost%3A8100%2Flogin&state=da3b1eb2-a201-4f9d-86ad-bb0c93a5cab7&response_mode=fragment&response_type=code&scope=openid&kc_idp_hint=google&nonce=2d7a33fe-6fd3-42d7-8026-94521453f323&code_challenge=ME9UKQgzP4H2YqgG9U807mDRqZxebKtE6VCL9z7qj3U&code_challenge_method=S256"

    console.log("code verifier", requestBody.code_verifier);
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    // Make a POST request to the Keycloak token endpoint
    axios.post(keycloakUrl, requestBody, { headers: headers })
      .then((response) => {
        // Authentication successful
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
        // this.router.navigate(['/login', { skipLocationChange: true }]);
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

  getParameterByName(name: string): string | null {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  ngOnInit() {
    // this.generateChallenge();
  }

  async generateChallenge() {
    console.log("not there");
    const challenge = await pkceChallenge(128);
    this.code_challenge = challenge.code_challenge;
    this.code_verifier = challenge.code_verifier;
    // Store the code challenge and verifier in local storage
    localStorage.setItem('code_challenge', this.code_challenge);
    localStorage.setItem('code_verifier', this.code_verifier);
    console.log(this.code_challenge);
    console.log(this.code_verifier);
    console.log(challenge);
    return challenge;
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


  handleFacebookLogin() {

  }

  handleGoogleLogin() {
    // Construct the URL with the dynamically generated code_challenge
    console.log(this.code_challenge);
    console.log(this.code_verifier)
    const keycloakAuthUrl = `http://localhost:8080/realms/angular-oauth/protocol/openid-connect/auth?client_id=ionic-angular-gateway&redirect_uri=http%3A%2F%2Flocalhost%3A8100%2Flogin&state=da3b1eb2-a201-4f9d-86ad-bb0c93a5cab7&response_mode=fragment&response_type=code&scope=openid&kc_idp_hint=google&nonce=2d7a33fe-6fd3-42d7-8026-94521453f323&code_challenge=${this.code_challenge}&code_challenge_method=S256`;

    if (isPlatform('cordova')) {
      // If the app is running on a mobile device
      const browserOptions: InAppBrowserOptions = {
        location: 'no',
        zoom: 'no'
      };
      const browser: InAppBrowserObject = this.inAppBrowser.create(keycloakAuthUrl, '_blank', browserOptions);
      browser.on('exit').subscribe(() => {
        console.log('In-app browser closed');
        // Handle the case when the in-app browser is closed
      });
    } else {
      // If the app is running on a non-mobile device (e.g., desktop web browser)
      window.open(keycloakAuthUrl, '_blank');
    }
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


// const keycloakCredentials = {
//   client_id: environment.clientId,
//   grant_type: 'authorization_code',
//   client_secret: environment.clientSecret,
//   redirect_uri: 'http://localhost:8100/home',
//   code: code,
//   code_verifier: challenge.code_verifier,
// };
// const keycloakUrl = environment.keycloakUrl;

// const headers = {
//   'Content-Type': 'application/x-www-form-urlencoded',
// };
// // Make a POST request to the Keycloak token endpoint
// axios.post(keycloakUrl, this.toFormUrlEncoded(keycloakCredentials), { headers: headers })
//   .then((response) => {
//     // Authentication successful
//     console.log('Authentication successful', response.data);
//     this.ts.presentToast('Authentication successful', 2000, 'success');
//     const token = response.data.access_token;
//     this.tokenService.setToken(token);
//     const decodedToken = jwtDecode(response.data.access_token);
//     if (decodedToken.sub !== undefined) {
//       const externalId = decodedToken.sub;
//       // OneSignal.login(externalId);
//     } else {
//       // Handle the case where decodedToken.sub is undefined
//       console.error('Decoded token sub is undefined');
//     }
//     // Navigate to a different page after successful login
//     // this.router.navigate(['/login', { skipLocationChange: true }]);
//     // this.router.navigate(['/home']);
//   })
//   .catch((error) => {
//     // Handle authentication failure
//     console.error('Authentication failed', error);
//     this.ts.presentToast('Authentication failed', 2000);
//     if (error.response && error.response.status === 401) {
//       this.areCredentialsWrong = true; // Set the flag only on incorrect credentials
//     } else {
//       this.areCredentialsWrong = false; // Reset the flag for other errors
//     }
//     // Display an error message or perform other actions as needed
//   });