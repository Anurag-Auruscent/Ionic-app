import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FigmaLoginPage } from './figma-login.page';

describe('FigmaLoginPage', () => {
  let component: FigmaLoginPage;
  let fixture: ComponentFixture<FigmaLoginPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FigmaLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
