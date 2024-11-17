import { Component, inject } from '@angular/core';

import { ApiService } from '../../../../../services/api.service';
import { CommonModule } from '@angular/common';
import { DeleteConfirmDialogComponent } from '../../../../../components/dashboard/delete-confirm-dialog/delete-confirm-dialog.component';
import { ErrorDialogComponent } from '../../../../../components/dashboard/error-dialog/error-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../../../../material.module';
import { Router } from '@angular/router';
import { Product } from '../../../../../models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = [
    'name',
    'price',
    'description',
    'category',
    'budget',
  ];
  dataSource: Product[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.getproducts();
  }

  getproducts() {
    this.apiService.getItems<Product>('products').subscribe({
      next: (data) => {
        this.dataSource = data;
        console.log('Items fetched:', data);
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message },
        });
      },
    });
  }

  goToAdd() {
    this.router.navigate(['/admin/products/create']);
  }

  goToEdit(id: string) {
    this.router.navigate(['/admin/products/' + id]);
  }

  deleteproduct(id: string) {
    const deleteDialogRef = this.dialog.open(DeleteConfirmDialogComponent);
    deleteDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.deleteItem<Product>('products', id).subscribe({
          next: (data) => {
            this.getproducts();
          },
          error: (error) => {
            this.dialog.open(ErrorDialogComponent, {
              data: { message: error.message },
            });
          },
        });
      }
    });
  }
}
