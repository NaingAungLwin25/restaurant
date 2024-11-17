import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { v4 as uuidv4 } from 'uuid';
import { ApiService } from '../../../../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../../../components/dashboard/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../../models';

@Component({
  selector: 'app-user-forms',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  userForm: FormGroup;
  readonly dialog = inject(MatDialog);
  userId: string = '';
  isEdit: boolean = false;
  title: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^09\d{9}$/)]],
    });
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.userId);
    if (this.userId) {
      this.isEdit = true;
      this.fetchUser(this.userId);
    }
  }

  fetchUser(id: string) {
    this.apiService.getItem<User>('users', id).subscribe({
      next: (data) => {
        this.userForm.patchValue(data);
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message },
        });
      },
    });
  }

  handleSubmit() {
    if (this.userForm.invalid) return;
    const payload = { ...this.userForm.getRawValue(), id: uuidv4() };
    const path = 'users';
    if (this.isEdit) {
      this.updateUser(this.userId, path, payload);
      return;
    }
    this.createUser(path, payload);
  }

  updateUser(id: string, path: string, payload: User) {
    this.apiService.updateItem<User>(path, id, payload).subscribe({
      next: (data) => {
        this.router.navigate(['/admin/users']);
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message },
        });
      },
    });
  }

  createUser(path: string, payload: User) {
    this.apiService.createItem<User>(path, payload).subscribe({
      next: (data) => {
        this.router.navigate(['/admin/users']);
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message },
        });
      },
    });
  }

  handleCancel() {
    this.router.navigate(['/admin/users']);
  }
}
