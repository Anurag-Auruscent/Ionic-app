import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FigmaLoginPageRoutingModule } from './figma-login-routing.module';

import { FigmaLoginPage } from './figma-login.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FigmaLoginPageRoutingModule,
    SharedModule
  ],
  declarations: [FigmaLoginPage]
})
export class FigmaLoginPageModule { }
