import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeeppagePage } from './deeppage.page';

describe('DeeppagePage', () => {
  let component: DeeppagePage;
  let fixture: ComponentFixture<DeeppagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeeppagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
