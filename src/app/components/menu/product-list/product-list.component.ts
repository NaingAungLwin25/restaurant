import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { PhoneNumberDialogComponent } from '../phone-number-dialog/phone-number-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'menu-product-list',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, CommonModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  @Input() productWithCategory: any = [];
  readonly dialog = inject(MatDialog);

  constructor(private router: Router) {}

  public handleOnOrder(name: string) {
    const dialogRef = this.dialog.open(PhoneNumberDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['menu/otp'], { queryParams: { phone: result } });
      }
    });
  }

  getImage(name: string) {
    const cleanedName = name.replace(/\s+/g, '').toLowerCase();
    const images = {
      coffee: 'coffee',
      bubbletea: 'bubble-tea',
      smoothie: 'smoothie',
      fruittea: 'fruit-tea',
      soda: 'soda',
      yoguart: 'yoguart',
    };

    const imageName = images[cleanedName as keyof typeof images] || 'default';

    return `assets/menu/images/${imageName}.png`;
  }
}
