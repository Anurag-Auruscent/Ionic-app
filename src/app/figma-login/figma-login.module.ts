import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FigmaLoginPageRoutingModule } from './figma-login-routing.module';

import { FigmaLoginPage } from './figma-login.page';
import { EmailInputComponent } from '../shared/components/emailInput/email-input/email-input.component';
import { PasswordInputComponent } from '../shared/components/PasswordInput/password-input/password-input.component';
import { ButtonComponent } from '../shared/components/button/button/button.component';
import { ButtonSocialComponent } from '../shared/components/buttonSocial/button-social/button-social.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FigmaLoginPageRoutingModule
  ],
  declarations: [FigmaLoginPage, EmailInputComponent, PasswordInputComponent, ButtonComponent, ButtonSocialComponent]
})
export class FigmaLoginPageModule { }
