import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/menu/header/header.component';
import { OrderCompleteComponent } from '../../../components/menu/order-complete/order-complete.component';

@Component({
  selector: 'app-complete-page',
  standalone: true,
  imports: [HeaderComponent, OrderCompleteComponent],
  templateUrl: './complete-page.component.html',
  styleUrl: './complete-page.component.scss',
})
export class CompletePageComponent {}
