import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserVerificationPageRoutingModule } from './user-verification-routing.module';
import { UserVerificationPage } from './user-verification.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserVerificationPageRoutingModule,
    SharedModule
  ],
  declarations: [UserVerificationPage]
})
export class UserVerificationPageModule {}
