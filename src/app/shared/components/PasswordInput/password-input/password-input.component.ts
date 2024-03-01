import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent implements OnInit {
  @Input() label: any = '';
  @Input() type: any = 'password';
  @Input() value: any = '';
  @Input() placeholder: any = '';
  @Input() labelClass: any = '';
  @Input() inputClass: any = '';
  @Input() inputStyle: any = {};
  @Input() icon: any = '';
  @Output() passwordChange = new EventEmitter();
  isPasswordVisible: boolean = false;
  areCredentialsWrong: any;
  constructor() { }

  ngOnInit() { }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onPasswordChange() {
    this.passwordChange.emit(this.value);
  }

}
