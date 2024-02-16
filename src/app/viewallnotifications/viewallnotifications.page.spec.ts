import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewallnotificationsPage } from './viewallnotifications.page';

describe('ViewallnotificationsPage', () => {
  let component: ViewallnotificationsPage;
  let fixture: ComponentFixture<ViewallnotificationsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewallnotificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
