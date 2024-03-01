import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';
import { environment } from 'src/environments/environment';
import { RegisterationService } from '../shared/services/registeration.service';
import axios from 'axios';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  firstName: string = "Anurag";
  lastName: string = "Rawat";
  userEmail: string = "anuragrawat@gmail.com";
  userPassword: string = "anurag@123";
  userNumber!: string
  selectedSegment: string = 'email';

  constructor(
    private router: Router,
    private ts: ToastService,
    private registrationService: RegisterationService,
  ) { }

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
    if (!this.firstName || !this.lastName) {
      this.ts.presentToast('First Name or Last Name is required', 2000);
      return;
    }

    if (this.selectedSegment === 'email') {
      this.userNumber = '';
      if (!this.userEmail || !this.userPassword) {
        this.ts.presentToast('User email and password required', 2000);
        return;
      }
    } else if (this.selectedSegment === 'phone') {
      this.userEmail = '';
      this.userPassword = '';
      if (!this.userNumber) {
        this.ts.presentToast('Phone Number is required', 2000);
        return;
      }
    } else {
      this.ts.presentToast('Invalid registration segment', 2000);
      return;
    }

    const token = await this.fetchAccessToken();


    if (token) {
      console.log("Token is set");
      this.ts.presentToast("Token is already there", 3000);
    } else {
      console.error("Failed to fetch token");
      this.ts.presentToast("Failed to fetch token", 3000);
      return;
    }

    // Your registration logic here
    console.log(`${this.firstName} ${this.lastName}`);
    if (this.selectedSegment === 'email') {
      console.log(`${this.userEmail} ${this.userPassword}`);
      const addUserPayload = {
        username: this.userEmail,
        // role: "admin",
        email: this.userEmail,
        password: this.userPassword,
        dob: "25-08-2000",
        gender: "male",
        firstName: this.firstName,
        lastName: this.lastName,
      };

      // const headers = {
      //   'Content-Type': 'application/x-www-form-urlencoded',
      //   'Authorization': `Bearer ${environment.token}`
      // };

      // axios.post(environment.addUserURL, addUserPayload, { headers: headers })
      //   .then((response) => {
      //     console.log(response.data);
      //   }).catch((error) => {
      //     console.error(error);
      //   })

      this.registrationService.addUser(addUserPayload).subscribe({
        next: (responseData) => {
          console.log(responseData);
          this.ts.presentToast('User added successfully and OTP sent', 2000, "primary");
          const email = responseData.email;
          console.log(email);
          const navigationExtras: NavigationExtras = {
            state: {
              email: email
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
      console.log(`${this.userNumber}`);
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
}
