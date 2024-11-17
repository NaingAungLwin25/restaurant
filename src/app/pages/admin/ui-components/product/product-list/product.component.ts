import { Component, inject } from '@angular/core';

import { ApiService } from '../../../../../services/api.service';
import { CommonModule } from '@angular/common';
import { DeleteConfirmDialogComponent } from '../../../../../components/admin/delete-confirm-dialog/delete-confirm-dialog.component';
import { ErrorDialogComponent } from '../../../../../components/error-dialog/error-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../../../../material.module';
import { Router } from '@angular/router';
import { Product } from '../../../../../models';
import {
  ERROR_PRODUCT_IN_DELETE,
  ERROR_PRODUCT_IN_FETCH,
} from '../../../../../constants';

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
  public displayedColumns: string[] = [
    'name',
    'price',
    'description',
    'category',
    'budget',
  ];
  public dataSource: Product[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  /**
   * Page initialization
   */
  ngOnInit() {
    this.getproducts();
  }

  /**
   * Fetch products
   */
  private getproducts() {
    this.apiService.getItems<Product>('products').subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (error) => {
        console.error(error);
        this.dialog.open(ErrorDialogComponent, {
          data: { message: ERROR_PRODUCT_IN_FETCH },
        });
      },
    });
  }

  /**
   * Go to registration page
   */
  public goToAdd() {
    this.router.navigate(['/admin/products/create']);
  }

  /**
   * Go to update page
   * @param id Product ID
   */
  public goToEdit(id: string) {
    this.router.navigate(['/admin/products/' + id]);
  }

  /**
   * Delete Product
   * @param id Product ID
   */
  public deleteproduct(id: string) {
    const deleteDialogRef = this.dialog.open(DeleteConfirmDialogComponent);
    deleteDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.deleteItem<Product>('products', id).subscribe({
          next: () => {
            this.getproducts();
          },
          error: (error) => {
            console.error(error);
            this.dialog.open(ErrorDialogComponent, {
              data: { message: ERROR_PRODUCT_IN_DELETE },
            });
          },
        });
      }
    });
  }
}
