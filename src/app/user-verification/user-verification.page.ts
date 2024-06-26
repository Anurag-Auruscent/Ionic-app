import { Component, OnInit } from '@angular/core';
import { VerifyOtpRequestEmail, VerifyOtpRequestPhone, VerifyOtpRequestPhoneLogin } from '../model/library.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';
import { RegisterationService } from '../shared/services/registeration.service';
import { environment } from 'src/environments/environment';
import { LoginService } from '../shared/services/login.service';
import axios from 'axios';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.page.html',
  styleUrls: ['./user-verification.page.scss'],
})
export class UserVerificationPage implements OnInit {
  otp!: string;
  receiverEmail!: any;
  flag!: string;
  phoneNumber!: string;
  timerRunning: boolean = false;
  showTimer: boolean = false;
  minutes: string = '01';
  seconds: string = '00';

  constructor(
    private router: Router,
    private ts: ToastService,
    private activatedRoute: ActivatedRoute,
    private registrationService: RegisterationService,
    private loginService: LoginService

  ) { }

  ngOnInit() {
    // this.activatedRoute.paramMap.subscribe(
    //   params => {
    //     this.receiverEmail = params.get('email');
    //     console.log(this.receiverEmail);

    //   }
    // )
    const navigation = this.router.getCurrentNavigation()?.extras.state as { email: string, phoneNumber: string, token: string, flag: string };
    this.receiverEmail = navigation.email;
    environment.token = navigation.token;
    this.flag = navigation.flag;
    this.phoneNumber = navigation.phoneNumber;
    console.log("Email : ", this.receiverEmail);
    console.log("Phone : ", this.phoneNumber);
    console.log(this.flag);
    console.log(environment.token);
  }

  ionViewWillEnter() {
    this.startTimer()
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
    if (this.flag === "phone") {
      const verifyOtpPayload: VerifyOtpRequestPhone = {
        phoneNumber: this.phoneNumber,
        otp: this.otp
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
    else if (this.flag === "phone-login") {
      const verifyOtpPayloadLogin: VerifyOtpRequestPhoneLogin = {
        phoneNumber: this.phoneNumber,
        otp: this.otp
      }
      // this.loginService.verifyPhoneOtpLogin(verifyOtpPayloadLogin).subscribe({
      //   next: (responseData) => {
      //     console.log(responseData);
      //     this.ts.presentToast('Logged in successfully', 2000, 'primary');
      //     const navigationExtras: NavigationExtras = {
      //       state: {
      //         token: responseData,
      //         flag: "phone-login"
      //       }
      //     };
      //     console.log("Navigation extras before sending to home", navigationExtras);

      //     this.router.navigate(['/home'], navigationExtras);
      //   }, error: (error) => {
      //     console.error('Error', error.status);
      //     this.ts.presentToast('Failed to verify', 2000);
      //   }
      // })

      axios.post("http://localhost:9000/users/login-via-phone", verifyOtpPayloadLogin)
        .then((response) => {
          // Authentication successful
          console.log('Authentication successful', response.data);
          this.ts.presentToast('Authentication successful', 2000, 'success');
          // const token = response.data.access_token;
          // this.tokenService.setToken(token);
          // const decodedToken = jwtDecode(response.data.access_token);
          const navigationExtras: NavigationExtras = {
            state: {
              token: response.data.accessToken,
              flag: "phone-login"
            }
          };
          console.log("Beofre calling home ", navigationExtras);

          this.router.navigate(['/home'], navigationExtras);
        })
        .catch((error) => {
          // Handle authentication failure
          console.error('Authentication failed', error);
          this.ts.presentToast('Authentication failed', 2000);
        });

      // this.loginService.verifyPhoneOtpLogin(verifyOtpPayloadLogin).subscribe(() => {
      //   console.log();

      // }, error => {
      //   console.log(error);
      // })

    }
    else {
      const verifyOtpPayload: VerifyOtpRequestEmail = {
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
  }

  // resend otp api call
  resendOtp() {
    console.log(this.flag);
    if (this.flag === "phone-login") {
      const payload = {
        phoneNo: this.phoneNumber
      }
      this.registrationService.resendOtpForPhone(payload).subscribe({
        next: (responseData) => {
          console.log(responseData);
        },
        error: (error) => {
          console.error("Error", error);
        }
      })
    } else if (this.flag === "email-login") {
      const payload = {
        email: this.receiverEmail
      }
      this.registrationService.resendOtp(payload).subscribe({
        next: (responseData) => {
          console.log(responseData);
        },
        error: (error) => {
          console.error('Error', error.status);
        },
      });

      this.startTimer();
    }
  }

  // start for timer
  startTimer() {
    this.timerRunning = true;
    this.showTimer = true;
    let duration = 60;
    let timer = duration;
    let interval = setInterval(() => {
      let minutes = Math.floor(timer / 60);
      let seconds = Math.floor(timer % 60);

      this.minutes = minutes < 10 ? '0' + minutes : String(minutes);
      this.seconds = seconds < 10 ? '0' + seconds : String(seconds);

      if (--timer < 0) {
        clearInterval(interval);
        this.timerRunning = false;
        this.showTimer = false;
      }
    }, 1000);
  }
}
