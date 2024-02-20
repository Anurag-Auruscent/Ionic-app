import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Library } from '../model/library.model';
import { LibraryService } from '../shared/services/library.service';
import { Router } from '@angular/router';
import { AlertController, IonSelect, PopoverController } from '@ionic/angular';
import axios from 'axios';
@Component({
  selector: 'app-library-details',
  templateUrl: './library-details.page.html',
  styleUrls: ['./library-details.page.scss'],
})
export class LibraryDetailsPage implements OnInit {
  @ViewChild('editSelect') editSelect!: IonSelect;
  libraryData!: any;
  libraryName!: string;
  showTextInput = false;
  editOption: string = '';
  editedValue: string = '';
  showEditOptions = false;

  constructor(
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    private router: Router,
    private popoverController: PopoverController,
    private alertController: AlertController,
  ) {

  }

  ngOnInit() {
    const libraryId = this.route.snapshot.params['id'];
    const apiURL = `http://localhost:9000/library/get-library?id=${libraryId}`;

    console.log('Fetching library details for ID:', libraryId);


    this.libraryService.getLibraryById(apiURL).subscribe(
      (data: any) => {
        // console.log('Library details response:', data);

        if (data && data.library) {
          this.libraryData = data;

          if (data.library.name) {
            this.libraryName = data.library.name;
            console.log('Library name:', this.libraryName);
          }

          if (data.library.id) {
            console.log('Library id:', data.library.id);
          }

          console.log('Assigned library object:', JSON.stringify(this.libraryData));
        } else {
          console.error('Library data or library property not found in the response.');
        }
      },
      (error) => {
        console.error('Error in fetching library details for ID:', error);
      }
    );

  }


  async editLibrary() {
    console.log('Edit Library clicked');
    this.showEditOptions = !this.showEditOptions;
    this.editSelect.open();

    const selectedOption = await this.waitForOptionSelection();
    console.log(selectedOption);
    if (selectedOption) {
      const newValue = await this.showInputDialog(selectedOption);
      console.log('inside first if', newValue);
      if (newValue !== null) {
        // Handle the selected option and the new value
        console.log(`Selected Option: ${selectedOption}, New Value: ${newValue}`);
        console.log('Calling updateLibrary');
        // Make an API call to update the library data
        // Replace the following line with the actual API call
        this.updateLibrary(selectedOption, newValue);
      }
    }
  }

  private async waitForOptionSelection(): Promise<string | null> {
    return new Promise((resolve) => {
      this.editSelect.ionChange.subscribe((event) => {
        const selectedOption = event.detail.value;
        resolve(selectedOption);
      });
    });
  }

  async promptDeleteConfirmation() {
    const confirmation = await this.showDeleteConfirmation();
    console.log("Reaches here ")
    if (confirmation === 'confirm') {
      // User confirmed deletion, proceed with API call
      this.performLibraryDeletion();
    } else {
      console.log('Deletion canceled');
    }
  }

  private async showInputDialog(option: string): Promise<string | null> {
    const alert = await this.alertController.create({
      header: `Edit ${option}`,
      inputs: [
        {
          name: 'newValue',
          type: 'text',
          placeholder: `Enter new ${option}`,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log(`Edit ${option} canceled`);
          },
        },
        {
          text: 'Edit',
          handler: (data) => {
            console.log('input data: ' + JSON.stringify(data));
            return data.newValue.trim() !== '' ? data.newValue.trim() : null;
          },
        },
      ],
    });
    await alert.present();

    const result = await alert.onDidDismiss();
    console.log("This is data: ", JSON.stringify(result));
    return result.data.values.newValue || null;
  }

  private async updateLibrary(option: string, newValue: string) {
    // Dynamic API URL based on the library id
    console.log("Added to check flow reaches here or not", JSON.stringify(this.libraryData))
    const apiURL = `http://localhost:9000/library/update?id=${this.libraryData.library.id}`;

    // Create the payload based on the selected option and new value
    const payload: any = {
      name: option === 'Name' ? newValue : this.libraryData.name,
      description: option === 'Description' ? newValue : this.libraryData.library.description,
      isPrivate: false, // Assuming isPrivate is a boolean
      webLinks: [],
    };
    console.log('Code reaches here check', JSON.stringify(payload));
    // Set the new value based on the selected option
    if (option === 'Name') {
      payload.name = newValue;
    } else if (option === 'Description') {
      payload.description = newValue;
    }

    // Make the API call using axios
    try {
      // const response = await axios.put(apiURL, payload);
      // console.log('API Response:', response.data);
      this.libraryService.updateLibrary(apiURL, payload)
        .subscribe({
          next: (response) => {
            console.log('Library updated successfully', response);
            // Handle success (e.g., show a success toast)
          },
          error: (error) => {
            console.error('API Error:', error);
            // Handle error (e.g., show an error toast)
          },
        });

      // Handle success (e.g., show a success toast)
    } catch (error) {
      console.error('API Error:', error);

      // Handle error (e.g., show an error toast)
    }
  }


  editOptionSelected(event: any) {
    // Handle the selected option
    const selectedOption = event.detail.value;

    switch (selectedOption) {
      case 'Name':
      case 'Description':
        // Implement the logic for editing the description
        this.handleEditOption(selectedOption);
        break;
      case 'deleteLibrary':
        this.handleDeleteLibrary();
        break;
      default:
        console.log('Invalid option selected');
    }

    // if (this.editSelect) {
    //   this.editSelect.ionDismiss;
    // }
  }

  private async handleEditOption(option: string) {
    const newValue = await this.showInputDialog(option);
    console.log('inside first if', newValue);

    if (newValue !== null) {
      // Step 2: Handle the selected option and the new value
      console.log(`Selected Option: ${option}, New Value: ${newValue}`);
      console.log('Calling updateLibrary');
      // Make an API call to update the library data
      // Replace the following line with the actual API call
      this.updateLibrary(option, newValue);
    }
  }

  private async handleDeleteLibrary() {
    // Step 3: Add a confirmation step for library deletion
    const confirmation = await this.showDeleteConfirmation();

    if (confirmation === 'confirm') {
      // Step 4: User confirmed deletion, proceed with API call
      this.performLibraryDeletion();
    } else {
      console.log('Deletion canceled');
    }
  }

  private async showDeleteConfirmation(): Promise<string> {
    // Step 5: Add a confirmation alert for library deletion
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Type "confirm" to delete the library:',
      inputs: [
        {
          name: 'confirmation',
          type: 'text',
          placeholder: 'Type here...',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Deletion canceled');
          },
        },
        {
          text: 'Confirm',
          handler: (data) => {
            return data.confirmation.trim().toLowerCase();
          },
        },
      ],
    });

    await alert.present();

    const result = await alert.onDidDismiss();
    return result.data.values.confirmation || 'cancel';
  }

  private performLibraryDeletion() {
    // Step 6: Implement the logic to delete the library
    const apiURL = `http://localhost:9000/library/delete-library?id=${this.libraryData.library.id}`;

    // Make the API call using axios or any other method you prefer
    // ...

    try {
      // const response = await axios.put(apiURL, payload);
      // console.log('API Response:', response.data);
      this.libraryService.deleteLibrary(apiURL)
        .subscribe({
          next: (response) => {
            console.log(' Deleted library successfully', response.data);
          },
          error: (error) => {
            console.log('API error:', error);
          }
        })
      // Handle success (e.g., show a success toast)
    } catch (error) {
      console.error('API Error:', error);

      // Handle error (e.g., show an error toast)
    }
  }

  saveChanges() {
    // Implement the logic to save changes based on the selected option
    console.log(`Save changes for ${this.editOption}: ${this.editedValue}`);

    // You can make an API call here to update the library name or description
    // For example:
    // this.libraryService.updateLibrary(this.library.id, { name: this.editedValue });

    // Reset values and hide the text input
    this.showTextInput = false;
    this.editOption = '';
    this.editedValue = '';
  }

  // Add other methods as needed

  goBack() {
    this.router.navigate(['/libraries']); // Adjust the route accordingly
  }
}
