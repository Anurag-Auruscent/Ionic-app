import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeeppagePageRoutingModule } from './deeppage-routing.module';

import { DeeppagePage } from './deeppage.page';
import { UrlService } from '../shared/services/url.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeeppagePageRoutingModule
  ],
  declarations: [DeeppagePage],
  providers: [UrlService]
})
export class DeeppagePageModule {}
