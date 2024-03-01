import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameInputComponent } from './components/nameInput/name-input/name-input.component';
import { EmailInputComponent } from './components/emailInput/email-input/email-input.component';
import { PasswordInputComponent } from './components/PasswordInput/password-input/password-input.component';
import { ButtonComponent } from './components/button/button/button.component';
import { ButtonSocialComponent } from './components/buttonSocial/button-social/button-social.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MobileInputComponent } from './components/MobileInput/mobile-input/mobile-input.component';

@NgModule({
  declarations: [
    // Declare your shared components, directives, pipes, etc. here
    NameInputComponent,
    EmailInputComponent,
    PasswordInputComponent,
    ButtonComponent,
    ButtonSocialComponent,
    MobileInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
    // Import any modules you need for the shared features
  ],
  exports: [
    // Export any components, directives, pipes, etc. that you want to make available to other modules
    NameInputComponent,
    EmailInputComponent,
    PasswordInputComponent,
    ButtonComponent,
    ButtonSocialComponent,
    MobileInputComponent,
    FormsModule
  ]
})
export class SharedModule { }
