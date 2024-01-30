
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'; // Import InAppBrowser
import axios from 'axios';
import { ToastController } from '@ionic/angular';

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
    private toastController: ToastController
  ) {}

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
      client_id: 'ionic-angular-gateway',
      grant_type: 'password',
      username: this.username,
      password: this.password,
      client_secret: 'dNcB1Tl0N5p1H3rDpIPRH7LAyrDuu4RD',
    };

    // Replace 'your-keycloak-server' with the actual URL of your Keycloak server
    const keycloakUrl = 'http://localhost:8080/realms/angular-oauth/protocol/openid-connect/token';

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    console.log(keycloakCredentials, keycloakUrl, headers);
    axios.post(keycloakUrl, this.toFormUrlEncoded(keycloakCredentials), { headers: headers })
      .then((response) => {
        // Authentication successful
        console.log('Authentication successful', response.data);
        this.presentToast('Authentication successful');
        // Handle the authentication response as needed
        // You may want to store the tokens or perform additional actions

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


// import { Component } from '@angular/core';
// import { HttpClient , HttpHeaders} from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage {
//   username: string = '';
//   password: string = '';

//   constructor(private http: HttpClient, private router: Router) {}

//   login() {
//     console.log('Username :', this.username);
//     console.log('Password:', this.password);
//     if (!this.username || !this.password) {
//     console.error('Username and password are required');
//     return;
//     }
//     const keycloakCredentials = { 
//       client_id: 'ionic-angular-gateway',
//       grant_type: 'password',
//       username: this.username,
//       password: this.password,
//       client_secret: 'dNcB1Tl0N5p1H3rDpIPRH7LAyrDuu4RD',
//     };

//     // Replace 'your-keycloak-server' with the actual URL of your Keycloak server
//     const keycloakUrl = 'http://localhost:8080/realms/angular-oauth/protocol/openid-connect/token';

//     const headers = new HttpHeaders({
//       'Content-Type': 'application/x-www-form-urlencoded',
//     });
//     console.log(keycloakCredentials, keycloakUrl, headers);
//     // Make an API call to authenticate the user
//     this.http.post(keycloakUrl, keycloakCredentials,{headers: headers}).subscribe(
//       (response: any) => {
//         // Authentication successful
      
//         console.log('Authentication successful', response);
//         // Navigate to a different page after successful login
//         this.router.navigate(['/home']);
//       },
//       (error) => {
//         // Handle authentication failure
//         console.error('Authentication failed', error);
//         // Display an error message or perform other actions as needed
//       }
//     );
//   }
// }


// import { Component } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage {
//   private keycloakUrl = 'http://localhost:8080/realms/angular-oauth/protocol/openid-connect/token';
//   private clientId = 'ionic-angular-gateway';
//   private clientSecret = 'dNcB1Tl0N5p1H3rDpIPRH7LAyrDuu4RD';
//   username: string = '';
//   password: string = '';
//   constructor(private http: HttpClient, private router : Router) { }
//   login() {
//     const body = new URLSearchParams();
//     body.set('grant_type', 'password');
//     body.set('client_id', this.clientId);
//     body.set('client_secret', this.clientSecret);
//     body.set('username', this.username);
//     body.set('password', this.password);
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/x-www-form-urlencoded',
//     });
//     this.http.post(this.keycloakUrl, body.toString(), { headers: headers }).subscribe(
//       response => {
//         console.log(response)
//         // Handle the successful login response
//         // const accessToken = response['access_token'];
//         // Store the token or redirect to a secure page
//       },
//       error => {
//         // Handle login error
//         console.error('Login failed', error);
//       }
//     );
//   }
// }