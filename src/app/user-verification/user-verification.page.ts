import { Component, OnInit } from '@angular/core';
import { UserModelResponse, VerifyOtpRequest } from '../model/library.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';
import { RegisterationService } from '../shared/services/registeration.service';

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
    private registrationService: RegisterationService
  ) { }

  ngOnInit() {
    // this.activatedRoute.paramMap.subscribe(
    //   params => {
    //     this.receiverEmail = params.get('email');
    //     console.log(this.receiverEmail);

    //   }
    // )

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { email: string };
    this.receiverEmail = state.email;
    console.log("Email : ", this.receiverEmail);
  }

  onTextChange(text: string) {
    this.otp = text;
  }

  verifyOtp() {
    const verifyOtpPayload: VerifyOtpRequest = {
      recevierEmail: this.receiverEmail,
      enteredOtp: this.otp
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
}
