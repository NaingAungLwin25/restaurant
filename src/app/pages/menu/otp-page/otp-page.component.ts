import { Component } from '@angular/core';
import { OtpActionComponent } from '../../../components/menu/otp-action/otp-action.component';

@Component({
  selector: 'app-otp-page',
  standalone: true,
  imports: [OtpActionComponent],
  templateUrl: './otp-page.component.html',
  styleUrl: './otp-page.component.scss',
})
export class OtpPageComponent {}
