// library-details-popover.component.ts

import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-library-details-popover',
  template: `
    <ion-list>
      <ion-item button (click)="editName()">Edit Name</ion-item>
      <ion-item button (click)="editDescription()">Edit Description</ion-item>
      <ion-item button (click)="deleteLibrary()">Delete Library</ion-item>
    </ion-list>
  `,
})
export class LibraryDetailsPopoverComponent {
  constructor(private popoverController: PopoverController) {}

  editName() {
    this.dismissWithResult({ role: 'editName', data: { newName: 'New Library Name' } });
  }

  editDescription() {
    this.dismissWithResult({ role: 'editDescription' });
  }

  deleteLibrary() {
    this.dismissWithResult({ role: 'delete' });
  }

  private dismissWithResult(result: any) {
    this.popoverController.dismiss(result);
  }
}
