import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss'],
})
export class OtpInputComponent implements AfterViewInit {
  @Input() length: number = 6;
  @Output() otpChange = new EventEmitter<string>();

  otp: string[] = Array(this.length).fill('');
  @ViewChild('otpInput')
  otpInput!: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    // Set focus on the first input element when the component initializes
    this.setFocus(0);
  }

  onInputKeyPress(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    if (value.length === 1) {
      this.otp[index] = value;

      if (index < this.length - 1) {
        // Move focus to the next input element
        this.setFocus(index + 1);
      } else {
        // Notify parent component about the complete OTP
        this.otpChange.emit(this.otp.join(''));
      }
    } else if (value.length === 0 && index > 0) {
      // Move focus to the previous input element on backspace
      this.setFocus(index - 1);
    }
  }

  setFocus(index: number) {
    if (this.otpInput && this.otpInput.nativeElement.children[index]) {
      this.otpInput.nativeElement.children[index].focus();
    }
  }
}
