// import { Component, Input, Output, EventEmitter } from '@angular/core';

// @Component({
//   selector: 'app-button',
//   templateUrl: './button.component.html',
//   styleUrls: ['./button.component.scss'],
// })
// export class ButtonComponent {
//   @Input() label: any;
//   @Input() customClass: any;
//   @Output() clickEvent = new EventEmitter<void>();

//   onClick() {
//     this.clickEvent.emit();
//   }

//   constructor() {}

//   ngOnInit() {}
// }

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: any;
  @Input() customClass: any;
  @Input() isDisabled: boolean = false; // New input property to control the disabled state
  @Output() clickEvent = new EventEmitter<void>();

  onClick() {
    this.clickEvent.emit();
  }

  constructor() { }

  ngOnInit() { }
}

