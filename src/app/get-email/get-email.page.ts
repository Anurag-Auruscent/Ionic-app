import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { environment } from 'src/environments/environment';
import { VerifyOtpRequest } from '../model/library.model';
import { RegisterationService } from '../shared/services/registeration.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-get-email',
  templateUrl: './get-email.page.html',
  styleUrls: ['./get-email.page.scss'],
})
export class GetEmailPage implements OnInit {

  otp!: string;
  receiverEmail!: any;
  useremail: string = "anurag@auruscent.com";

  constructor(
    private router: Router,
    private ts: ToastService,
    private activatedRoute: ActivatedRoute,
    private registrationService: RegisterationService
  ) { }

  ngOnInit() {
  }

  onTextChange(text: string) {
    this.useremail = text;
  }

  sendOtp() {
    if (this.useremail) {
      const navigationExtras: NavigationExtras = {
        state: {
          email: this.useremail,
          token: environment.token
        }
      };
      this.router.navigate(['/reset-password'], navigationExtras);
    } else {
      this.ts.presentToast('User email is required', 2000);
    }

  }

}
