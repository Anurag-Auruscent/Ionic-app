import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { RegisterationService } from '../shared/services/registeration.service';
import { ToastService } from '../shared/services/toast.service';
import { environment } from 'src/environments/environment';
import { VerifyOtpRequest } from '../model/library.model';
import { ForgotPasswordService } from '../shared/services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  otp!: string;
  receiverEmail!: any;

  constructor(
    private router: Router,
    private ts: ToastService,
    private activatedRoute: ActivatedRoute,
    private registrationService: RegisterationService,
    private forgotPasswordService: ForgotPasswordService
  ) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation()?.extras.state as { email: string };
    this.receiverEmail = navigation.email;
    console.log("Email : ", this.receiverEmail);
  }

  onTextChange(text: string) {
    this.otp = text;
  }

  verifyOtp() {
    const verifyOtpPayload: VerifyOtpRequest = {
      receiverEmail: this.receiverEmail,
      enteredOTP: this.otp
    }
    this.forgotPasswordService.verifyOtp(verifyOtpPayload).subscribe({
      next: (responseData) => {
        console.log(responseData);
        this.ts.presentToast('Verified succesfully', 2000, "primary");
        const navigationExtras: NavigationExtras = {
          state: {
            email: this.receiverEmail,
          }
        };
        this.router.navigate(['/reset-password'], navigationExtras);
      },
      error: (error) => {
        console.error('Error', error.status);
        this.ts.presentToast('Failed to verify', 2000);
      }
    });

  }

}
