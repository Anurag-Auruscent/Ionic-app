import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchfilternav',
  templateUrl: './searchfilternav.page.html',
  styleUrls: ['./searchfilternav.page.scss'],
})
export class SearchfilternavPage implements OnInit {

  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() type: any = 'text';
  @Input() icon: any;
  @Output() filterChange = new EventEmitter<any>;
  constructor() { }

  ngOnInit() {
  }

  onFilterChange() {
    this.filterChange.emit(this.value);
  }

}
