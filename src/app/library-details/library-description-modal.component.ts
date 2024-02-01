// library-description-modal.component.ts

import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-library-description-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Edit Description</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismissModal()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="floating">New Description</ion-label>
        <ion-input [(ngModel)]="newDescription" name="newDescription" required></ion-input>
      </ion-item>

      <ion-button expand="full" (click)="saveChanges()">Save Changes</ion-button>
    </ion-content>
  `,
})
export class LibraryDescriptionModalComponent {
  newDescription: string = '';

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  saveChanges() {
    if (this.newDescription.trim() !== '') {
      this.modalController.dismiss({ role: 'editDescription', data: { newDescription: this.newDescription } });
    }
  }
}
