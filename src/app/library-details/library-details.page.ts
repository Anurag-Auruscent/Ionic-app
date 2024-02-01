// library-details.page.ts

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import {PopoverController, ToastController } from '@ionic/angular';
import { LibraryDetailsPopoverComponent } from './library-details-popover.component'; // Import the Popover component
import { LibraryService } from './library.service';


@Component({
  selector: 'app-library-details',
  templateUrl: 'library-details.page.html',
  styleUrls: ['library-details.page.scss'],
})
export class LibraryDetailsPage {

  library: any;
  urlInput: string = '';
  responseData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private popoverController: PopoverController,
    private libraryService: LibraryService
  ) {}

  ionViewDidEnter() {
    // Fetch the library details from the route parameters
    this.activatedRoute.queryParams.subscribe(params => {
      this.library = params;
    });
  }

  async openSettings(ev: any) {
    const popover = await this.popoverController.create({
      component: LibraryDetailsPopoverComponent,
      event: ev,
      translucent: true,
      componentProps: { library: this.library },
    });

    popover.onDidDismiss().then((result) => {
      if (result.role === 'editName' && result.data.newName) {
        // Call the updateLibraryName method from the LibraryService
        this.libraryService.updateLibraryName(this.library.id, result.data.newName);
        this.presentToast('Name edited successfully');
      }
    });

    await popover.present();
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

  handleSettingsResult(result: string) {
    if (result === 'delete') {
      this.presentToast('Library deleted successfully');
    } else if (result === 'editName') {
      this.presentToast('Name edited successfully');
    } else if (result === 'editDescription') {
      this.presentToast('Description edited successfully');
    }
  }
}
