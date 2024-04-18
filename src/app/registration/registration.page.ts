import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';
import { environment } from 'src/environments/environment';
import { RegisterationService } from '../shared/services/registeration.service';
import axios from 'axios';
import { InAppBrowser, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { isPlatform } from '@ionic/angular';
import { generateRandomState, getParameterByName } from '../shared/helper/helper';
import pkceChallenge from 'pkce-challenge';
import { StorageService } from '../shared/services/storage.service';
import { TokenRequestBody } from '../model/library.model';
import { jwtDecode } from 'jwt-decode';
import { TokenService } from '../shared/services/token.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  firstName: string = "Anurag";
  lastName: string = "Rawat";
  userEmail: string = "anuragrawat469@gmail.com";
  userPassword: string = "anurag@123";
  userNumber!: string
  selectedSegment: string = 'email';
  code_challenge!: any;
  code_verifier!: any;
  kc_idp_hint!: string | null;

  constructor(
    private router: Router,
    private ts: ToastService,
    private registrationService: RegisterationService,
    private inAppBrowser: InAppBrowser,
    private storageService: StorageService,
    private tokenService: TokenService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.generateChallengeAndLogin();
  }

  ngOnInit() {
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

  onEmailChange(newEmail: string) {
    this.userEmail = newEmail
  }

  onPasswordChange(newPassword: string) {
    this.userPassword = newPassword
  }

  onNumberChange(newNumber: string) {
    this.userNumber = newNumber
  }

  onFirstNameChange(newFirstName: string) {
    this.firstName = newFirstName
  }

  onLastNameChange(newLastName: string) {
    this.lastName = newLastName
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

  async registerUser() {
    if (this.selectedSegment === 'email') {
      const token = await this.fetchAccessToken();
      if (token) {
        console.log("Token is set");
      } else {
        console.error("Failed to fetch token");
        this.ts.presentToast("Failed to fetch token", 3000);
        return;
      }
      this.userNumber = '';
      if (!this.firstName || !this.lastName) {
        this.ts.presentToast('First Name or Last Name is required', 2000);
        return;
      }
      if (!this.userEmail || !this.userPassword) {
        this.ts.presentToast('User email and password required', 2000);
        return;
      }

      console.log(`${this.firstName} ${this.lastName}`);
      console.log(`${this.userEmail} ${this.userPassword}`);
      const addUserPayload = {
        username: this.userEmail,
        role: "admin",
        email: this.userEmail,
        password: this.userPassword,
        dob: "25-08-2000",
        gender: "male",
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: ""
      };
      this.registrationService.addUser(addUserPayload).subscribe({
        next: (responseData) => {
          console.log(responseData);
          this.ts.presentToast('User added successfully and OTP sent', 2000, "primary");
          const email = responseData.email;
          console.log(email);
          const navigationExtras: NavigationExtras = {
            state: {
              email: email,
              phoneNumber: "",
              token: environment.token,
              flag: "email"
            }
          };
          this.router.navigate(['/user-verification'], navigationExtras);
        },
        error: (error) => {
          console.error('Error', error.status);
          if (error.status === 409) {
            this.ts.presentToast('User already registered', 5000);
          } else {
            this.ts.presentToast('Failed to add user', 2000);
          }
        }
      });
    } else if (this.selectedSegment === 'phone') {
      this.userEmail = '';
      this.userPassword = '';
      if (!this.userNumber) {
        this.ts.presentToast('Phone Number is required', 2000);
        return;
      }
      const addPhonePayload = {
        username: "James.west",
        role: "admin",
        password: "",
        dob: "01-09-1994",
        gender: "male",
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.userNumber,
        email: ""
      }
      this.registrationService.addUserByPhone(addPhonePayload).subscribe({
        next: (responseData) => {
          console.log(responseData);
          this.ts.presentToast('User added successfully and OTP sent', 2000, "primary");
          const navigationnExtras: NavigationExtras = {
            state: {
              email: "",
              phoneNumber: responseData.phoneNumber,
              token: environment.token,
              flag: "phone"
            }
          }
          this.router.navigate(['/user-verification'], navigationnExtras);
        },
        error: (error) => {
          console.error('Error', error.status);
          if (error.status === 409) {
            this.ts.presentToast('User already registered', 5000);
          } else {
            this.ts.presentToast('Failed to add user', 2000);
          }
        }

      })
    } else {
      this.ts.presentToast('Invalid registration segment', 2000);
      return;
    }
  }

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

  async fetchAccessToken(): Promise<string | null> {
    const payload = {
      client_id: environment.clientId,
      grant_type: 'client_credentials',
      client_secret: environment.clientSecret,
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const response = await axios.post(environment.keycloakUrl, this.toFormUrlEncoded(payload), { headers });
      environment.token = response.data.access_token;
      console.log(environment.token);
      return environment.token;
    } catch (error) {
      console.error('Error fetching access token', error);
      return null;
    }
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }


  async loadCodeChallenge() {
    this.code_challenge = await this.storageService.getItem<string>('code_challenge');
    this.code_verifier = await this.storageService.getItem<string>('code_verifier');
    if (!this.code_challenge || !this.code_verifier) {
      // Generate a new code challenge and verifier if they are not stored
      await this.generateChallenge();
    }
  }

  async generateChallengeAndLogin() {
    try {
      await this.loadCodeChallenge();
      const codeValue = getParameterByName('code');
      if (codeValue) {
        this.callSocialLogin(codeValue);
      }
    } catch (error) {
      console.error('Error generating challenge:', error);
    }
  }

  async callFacebookLogin(code: string) {

  }


  async callSocialLogin(code: string) {
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
      });
  }

  async generateChallenge() {
    console.log("not there");
    const challenge = await pkceChallenge(128);
    this.code_challenge = challenge.code_challenge;
    this.code_verifier = challenge.code_verifier;
    await this.storageService.setItem("code_challenge", this.code_challenge);
    await this.storageService.setItem("code_verifier", this.code_verifier);
    console.log(this.code_challenge);
    console.log(this.code_verifier);
    console.log(challenge);
    return challenge;
  }

  async handleSocialLogin(kcIdpHint: string) {
    // Construct the URL with the dynamically generated code_challenge
    //TODO : generate code challenge and generate code verifier and save it in ionic storage
    console.log(this.code_challenge);
    console.log(this.code_verifier)

    const state = generateRandomState(36);

    console.log(state);

    //@TODO : use state as the key for code_challenge and code_verifier

    // const keycloakAuthUrl = `http://localhost:8080/realms/angular-oauth/protocol/openid-connect/auth?client_id=ionic-angular-gateway&redirect_uri=http%3A%2F%2Flocalhost%3A8100%2Flogin&state=${state}&response_mode=fragment&response_type=code&scope=openid&kc_idp_hint=google&nonce=2d7a33fe-6fd3-42d7-8026-94521453f323&code_challenge=${this.code_challenge}&code_challenge_method=S256`;

    console.log(kcIdpHint);

    const keycloakAuthUrl = `http://localhost:8080/realms/angular-oauth/protocol/openid-connect/auth?client_id=ionic-angular-gateway&redirect_uri=http%3A%2F%2Flocalhost%3A8100%2Flogin&state=${state}&response_mode=fragment&response_type=code&scope=openid&kc_idp_hint=${kcIdpHint}&nonce=2d7a33fe-6fd3-42d7-8026-94521453f323&code_challenge=${this.code_challenge}&code_challenge_method=S256`;

    //@TODO: Apps are suppose to open the link in the default system browser 

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
}
