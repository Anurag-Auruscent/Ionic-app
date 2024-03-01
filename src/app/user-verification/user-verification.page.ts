import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.page.html',
  styleUrls: ['./user-verification.page.scss'],
})
export class UserVerificationPage implements OnInit {

  otp: any;

  constructor() { }

  ngOnInit() {
  }

  verifyOtp(){
    console.log(this.otp);
    
  }
}
