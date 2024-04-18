import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LibrariesPageRoutingModule } from './libraries-routing.module';
import { LibrariesPage } from './libraries.page';
import { LibraryService } from '../shared/services/library.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibrariesPageRoutingModule,
    SharedModule
  ],
  declarations: [LibrariesPage],
  providers: [LibraryService,]
})
export class LibrariesPageModule { }
