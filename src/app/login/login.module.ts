import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { EmailInputComponent } from '../shared/components/emailInput/email-input/email-input.component';
import { PasswordInputComponent } from '../shared/components/PasswordInput/password-input/password-input.component';
import { ButtonComponent } from '../shared/components/button/button/button.component';
import { ButtonSocialComponent } from '../shared/components/buttonSocial/button-social/button-social.component';
import { MobileInputComponent } from '../shared/components/MobileInput/mobile-input/mobile-input.component';
import { ClickableTextComponent } from '../shared/components/clickable-text/clickable-text.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [LoginPage, EmailInputComponent, PasswordInputComponent, ButtonComponent, ButtonSocialComponent, MobileInputComponent, ClickableTextComponent]
})
export class LoginPageModule { }
