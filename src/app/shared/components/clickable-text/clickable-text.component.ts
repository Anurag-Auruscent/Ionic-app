import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-clickable-text',
  templateUrl: './clickable-text.component.html',
  styleUrls: ['./clickable-text.component.scss'],
})
export class ClickableTextComponent implements OnInit {
  @Input() prefix: string = '';
  @Output() onClick = new EventEmitter<void>();
  constructor() { }

  ngOnInit() { }

}
