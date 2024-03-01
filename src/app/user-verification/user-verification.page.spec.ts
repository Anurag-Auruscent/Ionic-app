import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserVerificationPage } from './user-verification.page';

describe('UserVerificationPage', () => {
  let component: UserVerificationPage;
  let fixture: ComponentFixture<UserVerificationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
