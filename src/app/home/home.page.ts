// home.page.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastController, AlertController } from '@ionic/angular';

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
    private alertController: AlertController
  ) {
    this.allLibraries = [...this.libraries];  // Copy of libraries for "See All Libraries" button
  }

  librarySelected() {
    // Handle the selected library, you can display details or perform any action
  }

  seeAllLibraries() {
    // Navigate to a page or perform any action to show all libraries
    // For now, we are just resetting the libraries to show all in the grid
    // this.libraries = [...this.allLibraries];
    this.router.navigate(['/libraries']);
  }

  submitUrl() {
    // ... existing code for URL submission

    axios.post(`http://localhost:9092/content/save-metadata?link=${encodeURIComponent(this.urlInput)}`)
      .then((response) => {
        // Handle the response from the server
        this.responseData = response.data;

        // Add the new library to the list
        this.libraries.push({
          title: this.responseData.title,
          description: this.responseData.description,
          // Add other properties as needed
        });

        // Show success toast
        this.presentToast('Library added successfully');
      })
      .catch((error) => {
        // Handle any errors that occurred during the HTTP request
        console.error('Error:', error);

        // Show error toast
        this.presentErrorToast('Failed to add library');
      });
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
              // Add the new library to the list
              this.libraries.push({
                title: data.name,
                description: data.description,
                // Add other properties as needed
              });
              this.presentToast('Library created successfully');
            } else {
              this.presentErrorToast('Please provide both name and description');
            }
          }
        }
      ]
    });

    await alert.present();
  }
  

  goBack() {
    this.router.navigate(['/login']);
  }

  // Navigating to LibraryDetailsPage when a library is clicked
  viewLibraryDetails(library: any) {
    this.router.navigate(['/library-details'], { queryParams: library });
  }
}
