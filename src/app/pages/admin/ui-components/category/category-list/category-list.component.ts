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
import { Category } from '../../../../../models';
import {
  ERROR_CATEGORY_IN_DELETE,
  ERROR_CATEGORY_IN_FETCH,
} from '../../../../../constants';

@Component({
  selector: 'app-category-list',
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
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent {
  readonly dialog = inject(MatDialog);
  public displayedColumns: string[] = ['name', 'budget'];
  public dataSource: Array<Category> = [];

  constructor(private apiService: ApiService, private router: Router) {}

  /**
   * Page Initialization
   */
  ngOnInit() {
    this.getcategory();
  }

  /**
   * Get Categories
   */
  private getcategory() {
    this.apiService.getItems<Category>('category').subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (error) => {
        console.error(error);
        this.dialog.open(ErrorDialogComponent, {
          data: { message: ERROR_CATEGORY_IN_FETCH },
        });
      },
    });
  }

  /**
   * Go to registration page
   */
  public goToAdd() {
    this.router.navigate(['/admin/category/create']);
  }

  /**
   * Go to edit page
   * @param id Category ID
   */
  public goToEdit(id: string) {
    this.router.navigate(['/admin/category/' + id]);
  }

  /**
   * Delete Category
   * @param id Category ID
   */
  public deletecategory(id: string) {
    const deleteDialogRef = this.dialog.open(DeleteConfirmDialogComponent);
    deleteDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.deleteItem<Category>('category', id).subscribe({
          next: () => {
            this.getcategory();
          },
          error: (error) => {
            console.error(error);
            this.dialog.open(ErrorDialogComponent, {
              data: { message: ERROR_CATEGORY_IN_DELETE },
            });
          },
        });
      }
    });
  }

  /**
   * Get image from assets according to product name
   * @param name Name of product
   * @returns Image path from assets
   */
  public getImage(name: string) {
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
