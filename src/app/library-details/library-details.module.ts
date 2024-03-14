import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibraryDetailsPageRoutingModule } from './library-details-routing.module';

import { LibraryDetailsPage } from './library-details.page';
import { LibraryService } from '../shared/services/library.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [LibraryDetailsPage],
  providers: [LibraryService]
})
export class LibraryDetailsPageModule { }
