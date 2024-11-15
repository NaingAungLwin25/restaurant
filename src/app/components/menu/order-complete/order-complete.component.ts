import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'menu-order-complete',
  standalone: true,
  imports: [],
  templateUrl: './order-complete.component.html',
  styleUrl: './order-complete.component.scss',
})
export class OrderCompleteComponent {
  constructor(private router: Router) {}
  backToHome() {
    this.router.navigate(['/']);
  }
}
