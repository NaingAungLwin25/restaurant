import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { PhoneNumberDialogComponent } from '../phone-number-dialog/phone-number-dialog.component';

@Component({
  selector: 'menu-otp-action',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    NgOtpInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './otp-action.component.html',
  styleUrl: './otp-action.component.scss',
})
export class OtpActionComponent {
  @ViewChild('otpInput') otpInput!: NgOtpInputComponent;
  public currentPhoneNumber: string = '';
  public dummyOTP = '111111';
  public error = false;
  public defaultTime = 30;
  public timer: number = this.defaultTime;
  public otpFormControl = new FormControl('', Validators.required);
  readonly dialog = inject(MatDialog);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.currentPhoneNumber = params.get('phone') || '';
      this.startTimer();
    });
  }

  onChangePhone() {
    const dialogRef = this.dialog.open(PhoneNumberDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['menu/otp'], { queryParams: { phone: result } });
        this.onResend();
      }
    });
  }

  onOtpChange(event: string) {
    if (event.length === 6 && event !== this.dummyOTP) {
      this.error = true;
      return;
    }
    if (event.length === 6 && event === this.dummyOTP) {
      this.error = false;
    }
  }

  startTimer() {
    const interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.otpInput.setValue('');
        this.error = false;
        clearInterval(interval);
      }
    }, 1000);
  }

  onResend() {
    this.onReset();
    this.timer = this.defaultTime;
    this.startTimer();
  }

  onReset() {
    this.error = false;
    this.otpInput.setValue('');
  }

  onContinue() {
    const formVal = this.otpFormControl.getRawValue();
    console.log('OTP entered:', formVal);
    if (formVal?.length === 6 && formVal !== this.dummyOTP) {
      this.error = true;
      return;
    }
    if (formVal?.length === 6 && formVal === this.dummyOTP) {
      this.router.navigate(['menu/complete']);
    }
  }
}
