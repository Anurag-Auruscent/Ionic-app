import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewallnotificationsPageRoutingModule } from './viewallnotifications-routing.module';

import { ViewAllNotificationsPage } from './viewallnotifications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewallnotificationsPageRoutingModule
  ],
  declarations: [ViewAllNotificationsPage]
})
export class ViewallnotificationsPageModule { }
