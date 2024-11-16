import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../../../material.module';
import { ApiService } from '../../../../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../../../components/dashboard/error-dialog/error-dialog.component';
import { Router } from '@angular/router';
import { DeleteConfirmDialogComponent } from '../../../../../components/dashboard/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-user-list',
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
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['name', 'address', 'phone', 'budget'];
  dataSource = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getItems('users').subscribe({
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
    this.router.navigate(['/admin/users/create']);
  }

  goToEdit(id: string) {
    this.router.navigate(['/admin/users/' + id]);
  }

  deleteUser(id: string) {
    const deleteDialogRef = this.dialog.open(DeleteConfirmDialogComponent);
    deleteDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.deleteItem('users', id).subscribe({
          next: (data) => {
            this.getUsers();
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
