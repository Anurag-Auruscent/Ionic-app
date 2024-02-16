import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ViewAllNotificationsPage } from './viewallnotifications.page';

describe('ViewallnotificationsPage', () => {
  let component: ViewAllNotificationsPage;
  let fixture: ComponentFixture<ViewAllNotificationsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewAllNotificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
