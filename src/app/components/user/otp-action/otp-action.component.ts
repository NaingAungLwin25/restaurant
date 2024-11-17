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

  /**
   * Page Init
   */
  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.currentPhoneNumber = params.get('phone') || '';
      this.startTimer();
    });
  }

  /**
   * Hanlde for phone number change
   */
  public onChangePhone() {
    const dialogRef = this.dialog.open(PhoneNumberDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['menu/otp'], { queryParams: { phone: result } });
        this.onResend();
      }
    });
  }

  /**
   * Start timer for OTP
   */
  private startTimer() {
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

  /**
   * Handle for resend button event
   */
  public onResend() {
    this.onReset();
    this.timer = this.defaultTime;
    this.startTimer();
  }

  /**
   * Reset form and error
   */
  public onReset() {
    this.error = false;
    this.otpInput.setValue('');
  }

  /**
   * Handle for click continue button
   * @returns Error or go to complete page
   */
  public onContinue() {
    const formVal = this.otpFormControl.getRawValue();
    if (formVal?.length === 6 && formVal !== this.dummyOTP) {
      this.error = true;
      return;
    }
    if (formVal?.length === 6 && formVal === this.dummyOTP) {
      this.router.navigate(['menu/complete']);
    }
  }
}
