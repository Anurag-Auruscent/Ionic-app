import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetEmailPage } from './get-email.page';

describe('GetEmailPage', () => {
  let component: GetEmailPage;
  let fixture: ComponentFixture<GetEmailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GetEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
