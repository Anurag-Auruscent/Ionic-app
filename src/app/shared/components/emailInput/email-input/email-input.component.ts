import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss'],
})
export class EmailInputComponent implements OnInit {
  @Input() label: any = '';
  @Input() type: any = 'email';
  @Input() value: any = '';
  @Input() placeholder: any = '';
  @Input() labelClass: any = '';
  @Input() inputClass: any = '';
  @Input() inputStyle: any = {};
  @Input() icon: any = '';
  @Output() emailChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  onEmailChange() {
    this.emailChange.emit(this.value);
  }
}
