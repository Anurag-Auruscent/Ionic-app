import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent  implements OnInit {
  @Input() label: any = '';
  @Input() type: any = 'password';
  @Input() value: any = '';
  @Input() placeholder: any = '';
  @Input() labelClass: any = '';
  @Input() inputClass: any = '';
  @Input() inputStyle: any = {};
  @Input() icon: any = '';
  constructor() { }

  ngOnInit() {}

}
