import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../../material.module';
import { ApiService } from '../../../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../../components/error-dialog/error-dialog.component';
import { User } from '../../../../models';
import { ERROR_LOGIN, ERROR_LOGIN_INVALID } from '../../../../constants';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  readonly dialog = inject(MatDialog);

  constructor(private router: Router, private apiService: ApiService) {}

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  /**
   * Login
   */
  public onSubmit() {
    const formValue = this.form.getRawValue();
    const uri = `users?name=${formValue.username}&password=${formValue.password}`;
    const decodedURI = decodeURI(uri);
    this.apiService.getItems<User>(decodedURI).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.dialog.open(ErrorDialogComponent, {
            data: { message: ERROR_LOGIN_INVALID },
          });
        } else {
          const user = data[0];
          localStorage.setItem('loginUser', JSON.stringify(user));
          this.router.navigate(['/admin']);
        }
      },
      error: (error) => {
        console.error(error);
        this.dialog.open(ErrorDialogComponent, {
          data: { message: ERROR_LOGIN },
        });
      },
    });
  }
}
