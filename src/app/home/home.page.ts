// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage {

//   urlInput: string = '';

//   constructor(private router: Router) {}

//   submitUrl() {
//     // You can perform any action with the entered URL here
//     console.log('Submitted URL:', this.urlInput);

//     // For now, let's navigate back to the login page
//     this.router.navigate(['/dummy']);
//   }

//   goBack() {
//     // Navigate back to the login page
//     this.router.navigate(['/login']);
//   }

// }



import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  urlInput: string = '';
  responseData: any;

  constructor(private router: Router) {}

  submitUrl() {
    // You can perform any action with the entered URL here
    console.log('Submitted URL:', this.urlInput);

    // Make an HTTP POST request with Axios
    // const payload = { url: this.urlInput };
    axios.post(`https://smart-clouds-beg.loca.lt/content/save-metadata?link=${encodeURIComponent(this.urlInput)}`)
  .then((response) => {
    // Handle the response from the server
    this.responseData = response.data;
    console.log('Server response:', response.data);

    // Optionally, you can navigate to another page if needed
    // this.router.navigate(['/success']);
  })
  .catch((error) => {
    // Handle any errors that occurred during the HTTP request
    console.error('Error:', error);

    // Optionally, you can navigate to an error page
    this.router.navigate(['/error']);
  });
  }

  goBack() {
    // Navigate back to the login page
    this.router.navigate(['/login']);
  }

}




// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage {

//   urlInput: string = '';

//   constructor(private router: Router, private httpClient: HttpClient) {}

//   submitUrl() {
//     // You can perform any action with the entered URL here
//     console.log('Submitted URL:', this.urlInput);

//     // Make an HTTP POST request to your endpoint
//     const payload = { url: this.urlInput };
//     this.httpClient.post('your_endpoint_url', payload).subscribe(
//       (response) => {
//         // Handle the response from the server
//         console.log('Server response:', response);

//         // Optionally, you can navigate to another page if needed
//         this.router.navigate(['/success']);
//       },
//       (error) => {
//         // Handle any errors that occurred during the HTTP request
//         console.error('Error:', error);

//         // Optionally, you can navigate to an error page
//         this.router.navigate(['/error']);
//       }
//     );
//   }

//   goBack() {
//     // Navigate back to the login page
//     this.router.navigate(['/login']);
//   }

// }
