import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.scss'],
})
export class NameInputComponent implements OnInit {
  @Input() label!: string;
  @Input() placeholder!: string;
  firstName: string = '';
  lastName: string = '';
  @Input() type: any = '';
  @Input() value: any = '';
  @Input() labelClass: any = '';
  @Input() inputClass: any = '';
  @Input() inputStyle: any = {};
  @Input() icon: any = '';

  constructor() { }

  ngOnInit() { }

}
