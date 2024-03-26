import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  passwordNew!: string
  passwordConfirm!: string
  passwordsMatch: boolean = false

  onTextChange(event: any, field: string) {
    // Extract value from the event's target
    const value = event.target.value;

    // Update the corresponding field based on the argument passed
    if (field === 'new') {
      this.passwordNew = value;
    } else if (field === 'confirm') {
      this.passwordConfirm = value;
    }

    // Check if passwords match
    this.passwordsMatch = this.passwordNew === this.passwordConfirm;
  }

  resetPassword() {

  }

}
