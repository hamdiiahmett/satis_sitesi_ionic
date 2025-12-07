import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SepetPage } from './sepet.page';

describe('SepetPage', () => {
  let component: SepetPage;
  let fixture: ComponentFixture<SepetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SepetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
