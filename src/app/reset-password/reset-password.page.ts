import { Component, OnInit } from '@angular/core';
import { RegisterationService } from '../shared/services/registeration.service';
import { Router, ActivatedRoute } from '@angular/router';
import { resetPasswordRequest } from '../model/library.model';
import { ToastService } from '../shared/services/toast.service';
import { ResetPasswordService } from '../shared/services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  receiverEmail: string = '';
  secretCode: string = '';

  constructor(
    private router: Router,
    private ts: ToastService,
    private activatedRoute: ActivatedRoute,
    private registrationService: RegisterationService,
    private resetPasswordService: ResetPasswordService
  ) {

  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation()?.extras.state as { email: string, secretCode: string };
    this.receiverEmail = navigation.email;
    this.secretCode = navigation.secretCode;
    console.log("Email : ", this.receiverEmail);
    console.log("Code : ", this.secretCode);
  }

  passwordNew!: string
  passwordConfirm!: string
  // passwordsMatch: boolean = false

  // onTextChange(event: any, field: string) {
  //   // Extract value from the event's target
  //   const value = event.target.value;

  //   // Update the corresponding field based on the argument passed
  //   if (field === 'new') {
  //     this.passwordNew = value;
  //   } else if (field === 'confirm') {
  //     this.passwordConfirm = value;
  //   }

  //   // Check if passwords match
  //   this.passwordsMatch = this.passwordNew === this.passwordConfirm;
  // }

  onTextChange(text: string) {
    this.passwordNew = text;
    console.log(this.passwordNew);
  }
  // checkPasswords() {
  //   this.passwordsMatch = this.passwordNew === this.passwordConfirm;
  //   console.log(this.passwordsMatch);

  // }

  onTextChangeTwo(text: string) {
    this.passwordConfirm = text;
    console.log(this.passwordConfirm);
  }


  resetPassword() {
    //call reset password service here
    const payload: resetPasswordRequest = {
      password: this.passwordNew,
      confirmPassword: this.passwordConfirm,
      email: this.receiverEmail,
      secretKey: this.secretCode
    }
    this.resetPasswordService.resetPassword(payload).subscribe({
      next: (responseData: any) => {
        console.log(responseData);
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  // verifyOtp() {
  //   const verifyOtpPayload: VerifyOtpRequest = {
  //     receiverEmail: this.receiverEmail,
  //     enteredOTP: this.otp
  //   }
  //   this.registrationService.verifyOtp(verifyOtpPayload).subscribe({
  //     next: (responseData) => {
  //       console.log(responseData);
  //       this.ts.presentToast('Verified succesfully', 2000, "primary");
  //       this.router.navigate(['/login']);
  //     },
  //     error: (error) => {
  //       console.error('Error', error.status);
  //       this.ts.presentToast('Failed to verify', 2000);
  //     }
  //   });
  // }

}
