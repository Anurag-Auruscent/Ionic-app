import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentDetailsPageRoutingModule } from './content-details-routing.module';

import { ContentDetailsPage } from './content-details.page';
import { SharedModule } from '../shared/shared.module';
import { LibrariesPageRoutingModule } from '../libraries/libraries-routing.module';
import { LibraryService } from '../shared/services/library.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [ContentDetailsPage],
  providers: [LibraryService,]
})
export class ContentDetailsPageModule { }
