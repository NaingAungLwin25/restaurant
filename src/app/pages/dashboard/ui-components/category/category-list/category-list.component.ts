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
  displayedColumns: string[] = ['name', 'budget'];
  dataSource = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.getcategory();
  }

  getcategory() {
    this.apiService.getItems('category').subscribe({
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
    this.router.navigate(['/admin/category/create']);
  }

  goToEdit(id: string) {
    this.router.navigate(['/admin/category/' + id]);
  }

  deletecategory(id: string) {
    const deleteDialogRef = this.dialog.open(DeleteConfirmDialogComponent);
    deleteDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.deleteItem('category', id).subscribe({
          next: (data) => {
            this.getcategory();
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
