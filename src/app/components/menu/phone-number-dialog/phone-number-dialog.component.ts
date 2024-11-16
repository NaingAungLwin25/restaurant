import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phone-number-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './phone-number-dialog.component.html',
  styleUrl: './phone-number-dialog.component.scss',
})
export class PhoneNumberDialogComponent {
  readonly dialogRef = inject(MatDialogRef<PhoneNumberDialogComponent>);
  phoneControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^09\d{9}$/),
  ]);

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'dialog-close',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/menu/images/dialog-close.svg'
      )
    );
  }

  handleDialogClose() {
    const phone = this.phoneControl.getRawValue();
    console.log(phone);
    if (this.phoneControl.valid && phone) {
      this.dialogRef.close(phone);
      return;
    }
    this.dialogRef.close();
  }
}
