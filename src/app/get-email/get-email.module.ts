import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetEmailPageRoutingModule } from './get-email-routing.module';

import { GetEmailPage } from './get-email.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetEmailPageRoutingModule,
    SharedModule
  ],
  declarations: [GetEmailPage]
})
export class GetEmailPageModule { }
