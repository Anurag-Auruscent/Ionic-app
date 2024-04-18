import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {

  @Input() label: any = '';
  @Input() type: any = 'text';
  @Input() value: any = '';
  @Input() placeholder: any = '';
  @Input() labelClass: any = '';
  @Input() inputClass: any = '';
  @Input() inputStyle: any = {};
  @Input() icon: any = '';
  @Output() textChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  onTextChange() {
    this.textChange.emit(this.value);
  }
}
