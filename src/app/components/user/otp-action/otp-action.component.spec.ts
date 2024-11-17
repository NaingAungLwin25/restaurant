import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpActionComponent } from './otp-action.component';

describe('OtpActionComponent', () => {
  let component: OtpActionComponent;
  let fixture: ComponentFixture<OtpActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
