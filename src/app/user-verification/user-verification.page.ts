import { Component, OnInit } from '@angular/core';
import { UserModelResponse, VerifyOtpRequest } from '../model/library.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';
import { RegisterationService } from '../shared/services/registeration.service';
import { environment } from 'src/environments/environment';
import { OtpService } from '../shared/services/otp.service';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.page.html',
  styleUrls: ['./user-verification.page.scss'],
})
export class UserVerificationPage implements OnInit {

  otp!: string;
  receiverEmail!: any;

  constructor(
    private router: Router,
    private ts: ToastService,
    private activatedRoute: ActivatedRoute,
    private registrationService: RegisterationService,
    public otpService: OtpService
  ) { }

  ngOnInit() {
    // this.activatedRoute.paramMap.subscribe(
    //   params => {
    //     this.receiverEmail = params.get('email');
    //     console.log(this.receiverEmail);

    //   }
    // )

    const navigation = this.router.getCurrentNavigation()?.extras.state as { email: string, token: string };
    this.receiverEmail = navigation.email;
    environment.token = navigation.token;
    console.log("Email : ", this.receiverEmail);
    console.log(environment.token);
    // 
  }

  onTextChange(text: string) {
    this.otp = text;
  }

  blockOtp(otp: string) {
    // Implement your OTP verification logic here
    this.otp = otp;
    console.log(this.otp);
  }

  verifyOtp() {
    const verifyOtpPayload: VerifyOtpRequest = {
      receiverEmail: this.receiverEmail,
      enteredOTP: this.otp
    }
    this.registrationService.verifyOtp(verifyOtpPayload).subscribe({
      next: (responseData) => {
        console.log(responseData);
        this.ts.presentToast('Verified succesfully', 2000, "primary");
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error', error.status);
        this.ts.presentToast('Failed to verify', 2000);
      }
    });

  }

  resendOtp() {
    const payload = {
      email : this.receiverEmail
    }

    this.otpService.resendOtp(payload).subscribe({
      next: (responseData) => {
        console.log(responseData);
      },
      error: (error) => {
        console.error('Error', error.status);
      },
    });

    this.otpService.startTimer(60);
  }
}
