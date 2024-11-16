import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrl: './delete-confirm-dialog.component.scss',
})
export class DeleteConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteConfirmDialogComponent>);

  handleDialogClose(result: boolean = false) {
    this.dialogRef.close(result);
  }
}
