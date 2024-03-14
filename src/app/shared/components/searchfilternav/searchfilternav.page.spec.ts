import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchfilternavPage } from './searchfilternav.page';

describe('SearchfilternavPage', () => {
  let component: SearchfilternavPage;
  let fixture: ComponentFixture<SearchfilternavPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchfilternavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
