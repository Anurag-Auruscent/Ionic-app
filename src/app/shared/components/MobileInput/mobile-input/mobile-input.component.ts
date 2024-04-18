import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-input',
  templateUrl: './mobile-input.component.html',
  styleUrls: ['./mobile-input.component.scss'],
})
export class MobileInputComponent implements OnInit {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() labelClass: any = '';
  @Input() inputClass: any = '';
  @Input() icon: string = '';
  @Input() inputStyle: any = {};
  @Input() type: string = 'phone'; // Add this line
  @Output() numberChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  onNumberChange() {
    this.numberChange.emit(this.value);
  }

}
