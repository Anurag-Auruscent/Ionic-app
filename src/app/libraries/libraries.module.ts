import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibrariesPageRoutingModule } from './libraries-routing.module';

import { LibrariesPage } from './libraries.page';

import { LibraryDetailsService } from '../library-details/library.service';
import { LibraryService } from '../shared/services/library.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibrariesPageRoutingModule
  ],
  declarations: [LibrariesPage],
  providers: [LibraryDetailsService, LibraryService,]
})
export class LibrariesPageModule { }
