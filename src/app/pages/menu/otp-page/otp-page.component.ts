import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/menu/header/header.component';
import { OtpActionComponent } from '../../../components/menu/otp-action/otp-action.component';

@Component({
  selector: 'app-otp-page',
  standalone: true,
  imports: [HeaderComponent, OtpActionComponent],
  templateUrl: './otp-page.component.html',
  styleUrl: './otp-page.component.scss',
})
export class OtpPageComponent {}
