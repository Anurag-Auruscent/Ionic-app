import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RegisterationService } from '../shared/services/registeration.service';
import { ToastService } from '../shared/services/toast.service';
import { ForgotPasswordService } from '../shared/services/forgot-password.service';

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
    private registrationService: RegisterationService,
    private forgotPasswordService: ForgotPasswordService
  ) { }

  ngOnInit() {
  }

  onTextChange(text: string) {
    this.useremail = text;
  }

  sendOtp() {
    if (this.useremail) {
      try {
        // Step 3: Call the service method to save the library to the database
        const payload = {
          email: this.useremail
        }
        this.forgotPasswordService.sendEmail(payload).subscribe({
          next: (responseData: any) => {
            console.log(responseData);
            const navigationExtras: NavigationExtras = {
              state: {
                email: this.useremail,
              }
            };
            this.router.navigate(['/forgot-password'], navigationExtras);
          },
          error: (error: any) => {
            console.log(error);
          }
        });
      } catch (error) {
        // Step 4: Handle errors
        console.error('Failed to save library to the database:', error);
      }
    } else {
      this.ts.presentToast('User email is required', 2000);
    }

  }

}

