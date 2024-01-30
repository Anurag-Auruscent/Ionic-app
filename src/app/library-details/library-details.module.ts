import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibraryDetailsPageRoutingModule } from './library-details-routing.module';

import { LibraryDetailsPage } from './library-details.page';
import { LibraryDetailsPopoverComponent } from './library-details-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryDetailsPageRoutingModule
  ],
  declarations: [LibraryDetailsPage, LibraryDetailsPopoverComponent]
})
export class LibraryDetailsPageModule {}
