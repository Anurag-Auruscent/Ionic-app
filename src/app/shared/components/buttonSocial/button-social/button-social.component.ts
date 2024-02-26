import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-social',
  templateUrl: './button-social.component.html',
  styleUrls: ['./button-social.component.scss'],
})
export class ButtonSocialComponent  {
  @Input() label: any;
  @Input() src: any;
  @Input() customClass: any;
  @Output() clickEvent = new EventEmitter<void>();

  onClick() {
    this.clickEvent.emit();
  }
  constructor() { }

  ngOnInit() {}

}
