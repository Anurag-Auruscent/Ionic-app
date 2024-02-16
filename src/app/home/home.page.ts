// home.page.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { HomeService } from '../shared/services/home.service';

import { Library } from '../model/library.model';
import { LibraryService } from '../shared/services/library.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  urlInput: string = '';
  responseData: any;
  libraries: any[] = [];
  selectedLibrary: any;  // Property to store the selected library in the dropdown
  allLibraries!: any[];   // Property to store all libraries for "See All Libraries" button

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private authService: AuthService,
    private homeService: HomeService,
    private libraryService: LibraryService
  ) {
    this.allLibraries = [...this.libraries];  // Copy of libraries for "See All Libraries" button
  }

  ngOnInit() {
    // this.getLibraries();
  }

  ionViewWillEnter() {
    // This method will be called every time the page is about to enter.
    this.getLibraries();
  }

  getLibraries() {
    // const jwtToken = this.authService.getAccessToken();
    const apiURL = environment.getAllLibrariesApiUrl;
    this.libraryService.getAllLibraries(apiURL).subscribe(
      (data: Library[]) => {
        console.log(data);
        this.libraries = data;
      });
  }

  librarySelected() {
    // Handle the selected library, you can display details or perform any action
  }

  seeAllLibraries() {
    // For now, we are just resetting the libraries to show all in the grid
    this.router.navigate(['/libraries']);
  }

  submitUrl() {
    // Check if the URL is entered
    if (!this.urlInput) {
      this.presentErrorToast('Please enter a URL before submitting');
      return;
    }

    // Check if a library is selected
    if (!this.selectedLibrary) {
      this.presentErrorToast('Please select a library before submitting the URL');
      return;
    }

    // Continue with the URL submission logic
    const libraryId = this.selectedLibrary.id; // Assuming 'id' is the property representing the libraryId
    const payload = {
      name: this.selectedLibrary.name,  // Assuming 'name' is the property representing the library name
      description: this.selectedLibrary.description,  // Assuming 'description' is the property representing the library description
      isPrivate: this.selectedLibrary.isPrivate,  // Assuming 'isPrivate' is the property representing the library privacy status
      webLinks: [this.urlInput]  // Add the URL to the webLinks array
    };
    console.log("This is the library id : ", this.selectedLibrary.id);
    const apiURL = `http://localhost:9000/library/update?id=${libraryId}`

    this.homeService.fetchAllLibrary(apiURL, payload).subscribe((responseData) => {
      // Handle the response from the server
      console.log(responseData);
      // Show success toast
      this.presentToast('Link added to library successfully');
    },
      (error) => {
        // Handle error
        console.error('Error:', error);
        // Show error toast
        this.presentErrorToast('Failed to add link to library');
      }
    );



    // const jwtToken = this.authService.getAccessToken();
    // axios.put(`http://localhost:9000/library/update?id=${libraryId}`, payload,
    //   {
    //     headers: {
    //       'Authorization': `Bearer ${jwtToken}`
    //     }
    //   }).then((response) => {
    //     // Handle the response from the server
    //     this.responseData = response.data;
    //     console.log(this.responseData)
    //     // Show success toast
    //     this.presentToast('Link added to library successfully');
    //   })
    //   .catch((error) => {
    //     // Handle any errors that occurred during the HTTP request
    //     console.error('Error:', error);
    //     // Show error toast
    //     this.presentErrorToast('Failed to add link to the library');
    //   });
  }

  isEvenIndex(library: any): boolean {
    const index = this.libraries.indexOf(library);
    return index % 2 === 0;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    toast.present();
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }

  async createNewLibrary() {
    const alert = await this.alertController.create({
      header: 'Create New Library',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Library Name'
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Library Description'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Library creation canceled');
          }
        },
        {
          text: 'Create',
          handler: (data) => {
            // Check if both name and description are provided
            if (data.name && data.description) {
              // Make an API call to save the new library data
              this.saveLibraryToDatabase(data.name, data.description)
                .then(() => {
                  this.presentToast('Library created successfully');
                })
                .catch((error) => {
                  console.error('Failed to save library to the database:', error);
                  this.presentErrorToast('Failed to create library');
                });
            } else {
              this.presentErrorToast('Please provide both name and description');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async saveLibraryToDatabase(name: string, description: string): Promise<void> {
    // Step 1: Change the API URL
    const apiUrl = environment.saveLibraryToDatabaseApiUrl;

    // Step 2: Update the payload structure
    const payload = {
      name: name,
      description: description,
      isPrivate: false,
      webLinks: []
      // Include other properties as needed
    };

    try {
      // Step 3: Call the service method to save the library to the database
      this.libraryService.createNewLibrary(apiUrl, payload).subscribe(
        (data: Library[]) => {
          console.log(data);

          this.allLibraries = data;
          console.log('Library saved to the database successfully');
          this.getLibraries();
        });
    } catch (error) {
      // Step 4: Handle errors
      console.error('Failed to save library to the database:', error);
    }


    // // Step 3: Fetch the JWT token (replace 'your-jwt-token' with the actual token retrieval logic)
    // const jwtToken = this.authService.getAccessToken();  // Replace this with your actual token retrieval logic

    // // Step 4: Make an HTTP POST request to save the new library data with JWT token in the header
    // return axios.post(apiUrl, payload, {
    //   headers: {
    //     'Authorization': `Bearer ${jwtToken}`
    //   }
    // });
  }




  goBack() {
    this.router.navigate(['/login']);
  }

  // Navigating to LibraryDetailsPage when a library is clicked
  viewLibraryDetails(library: any) {
    this.router.navigate(['/library-details'], { queryParams: library });
  }
}
