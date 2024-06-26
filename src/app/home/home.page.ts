// home.page.ts

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HomeService } from '../shared/services/home.service';
import { TranslateConfigService } from '../shared/services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';

import { Library, LibraryListServerResponse } from '../model/library.model';
import { LibraryService } from '../shared/services/library.service';
import { TokenService } from '../shared/services/token.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  token: any;
  libraryId!: number;
  urlInput: string = '';
  responseData: any;
  libraries: any[] = [];
  selectedLibrary: any;  // Property to store the selected library in the dropdown
  allLibraries: Library[] = [];   // Property to store all libraries for "See All Libraries" button
  flag!: string;
  language: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private alertController: AlertController,
    private homeService: HomeService,
    private libraryService: LibraryService,
    private tokenService: TokenService,
    private toastService: ToastService,
    private translateConfigService: TranslateConfigService,
    private translateService: TranslateService
  ) {
    this.allLibraries = [...this.libraries]; // Copy of libraries for "See All Libraries" button
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLanguage();
  }

  ngOnInit() {
    this.getLibraryIdFromUrl();
    const navigation = this.router.getCurrentNavigation()?.extras.state as { token: string, flag: string };
    this.flag = navigation.flag
    console.log("Home navigation object ", navigation);
    if (this.flag === "phone-login") {
      this.token = navigation.token
      this.tokenService.setToken(this.token);
      console.log("Token from phone number :", this.token);
    } else {
      console.log("Token is already set");
    }
  }

  ionViewWillEnter() {
    // This method will be called every time the page is about to enter.
    this.getLibraries();
  }

  private getLibraries() {
    this.libraryService.getAllLibraries().subscribe({
      next: (data: LibraryListServerResponse) => {
        // console.log(data);
        // console.log(data.content[0].name);
        this.allLibraries = data.content;
      },
      error: (error) => {
        console.error('Error fetching libraries:', error);
        // Handle error as needed
      },
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

    console.log('This is the selected library ', this.selectedLibrary);
    if (!this.urlInput) {
      this.presentErrorToast('Please enter a URL before submitting');
      return;
    }

    // Check if a library is selected
    if (!this.selectedLibrary) {
      this.presentErrorToast(
        'Please select a library before submitting the URL'
      );
      return;
    }

    // Continue with the URL submission logic
    const libraryId = this.selectedLibrary.id; // Assuming 'id' is the property representing the libraryId
    const payload = {
      name: this.selectedLibrary.name, // Assuming 'name' is the property representing the library name
      description: this.selectedLibrary.description, // Assuming 'description' is the property representing the library description
      isPrivate: this.selectedLibrary.isPrivate, // Assuming 'isPrivate' is the property representing the library privacy status
      webLinks: [this.urlInput], // Add the URL to the webLinks array
    };
    // console.log("This is the library id : ", this.selectedLibrary.id);
    const apiURL = `http://localhost:9000/library/update?id=${libraryId}`;

    this.homeService.fetchAllLibrary(apiURL, payload).subscribe({
      next: (responseData) => {
        // Handle the response from the server
        console.log(responseData);
        // Show success toast
        this.presentToast('Link added to library successfully');
      },
      error: (error) => {
        // Handle error
        console.error('Error:', error);
        // Show error toast
        this.presentErrorToast('Failed to add link to library');
      },
    });

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
          placeholder: 'Library Name',
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Library Description',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Library creation canceled');
          },
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
                  console.error(
                    'Failed to save library to the database:',
                    error
                  );
                  this.presentErrorToast('Failed to create library');
                });
            } else {
              this.presentErrorToast(
                'Please provide both name and description'
              );
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async saveLibraryToDatabase(
    name: string,
    description: string
  ): Promise<void> {
    // Step 1: Change the API URL
    const apiUrl = environment.saveLibraryToDatabaseApiUrl;
    // const apiUrl = '';

    // Step 2: Update the payload structure
    const payload = {
      name: name,
      description: description,
      isPrivate: false,
      webLinks: [],
      // Include other properties as needed
    };

    try {
      // Step 3: Call the service method to save the library to the database
      this.libraryService.createNewLibrary(apiUrl, payload).subscribe({
        next: (data: Library[]) => {
          console.log(data);
          this.allLibraries = data;
          console.log('Library saved to the database successfully');
          this.getLibraries();
        },
        error: (error) => {
          console.error('Error:', error);
          // Handle error as needed
        },
      });
    } catch (error) {
      // Step 4: Handle errors
      console.error('Failed to save library to the database:', error);
    }
  }

  async goBack() {
    // Check if the authentication token exists
    if (await this.tokenService.getToken()) {
      this.router.navigate(['/home']);
      this.toastService.presentToast(
        "can't go back with an active auth_token",
        3000
      );
    } else {
      // If token doesn't exist, navigate to the login page
      this.router.navigate(['/login']);
    }
  }

  // Navigating to LibraryDetailsPage when a library is clicked
  viewLibraryDetails(library: any) {
    this.router.navigate(['/library-details'], { queryParams: library });
  }

  // navigate to notifications page
  gotoNotification() {
    this.router.navigate(['/viewallnotifications']);
  }

  // extract library id from url
  getLibraryIdFromUrl(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.libraryId = +id;
      this.readRequestAccessLibrary(this.libraryId);
    }
  }
  // api call to make library access request for read
  readRequestAccessLibrary(libraryId: number) {
    this.libraryService.readRequestAccessLibrary(libraryId).subscribe({
      next: (response: any) => {
        console.log(response.status);
        if (response.status === 200) {
          this.presentToast('Library access request sent to the owner');
        }
      },
      error: (error) => {
        console.error('Error:', error);
        // Handle error and show error toast if needed
      },
    });
  }
}
