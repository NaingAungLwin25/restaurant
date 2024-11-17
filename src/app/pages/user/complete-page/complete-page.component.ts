import { Component } from '@angular/core';
import { OrderCompleteComponent } from '../../../components/user/order-complete/order-complete.component';

@Component({
  selector: 'app-complete-page',
  standalone: true,
  imports: [OrderCompleteComponent],
  templateUrl: './complete-page.component.html',
  styleUrl: './complete-page.component.scss',
})
export class CompletePageComponent {}
