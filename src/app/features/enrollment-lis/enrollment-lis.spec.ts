import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentLis } from './enrollment-lis';

describe('EnrollmentLis', () => {
  let component: EnrollmentLis;
  let fixture: ComponentFixture<EnrollmentLis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentLis],
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollmentLis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
