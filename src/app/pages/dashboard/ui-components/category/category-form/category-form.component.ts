import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ApiService } from '../../../../../services/api.service';
import { ErrorDialogComponent } from '../../../../../components/dashboard/error-dialog/error-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../../../../../models';

@Component({
  selector: 'app-category-forms',
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
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent {
  public categoryForm: FormGroup;
  readonly dialog = inject(MatDialog);
  private categoryId: string = '';
  public isEdit: boolean = false;
  public title: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  /**
   * Page Initialize
   */
  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id') || '';
    if (this.categoryId) {
      this.isEdit = true;
      this.fetchcategory(this.categoryId);
    }
    this.title = this.isEdit ? 'Update' : 'Registration';
  }

  /**
   * Fetch Category by ID
   * @param id Category ID
   */
  private fetchcategory(id: string) {
    this.apiService.getItem('category', id).subscribe({
      next: (data) => {
        this.categoryForm.patchValue(data);
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message },
        });
      },
    });
  }

  /**
   * Handle submit button
   */
  public handleSubmit() {
    if (this.categoryForm.invalid) return;
    const payload = { ...this.categoryForm.getRawValue(), id: uuidv4() };
    const path = 'category';
    if (this.isEdit) {
      this.updatecategory(this.categoryId, path, payload);
      return;
    }
    this.createcategory(path, payload);
  }

  /**
   * Update category
   * @param id Category ID
   * @param path API path
   * @param payload Category payload
   */
  private updatecategory(id: string, path: string, payload: Category) {
    this.apiService.updateItem<Category>(path, id, payload).subscribe({
      next: () => {
        this.router.navigate(['/admin/category']);
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message },
        });
      },
    });
  }

  /**
   * Create new category
   * @param path API path
   * @param payload Category payload
   */
  private createcategory(path: string, payload: Category) {
    this.apiService.createItem<Category>(path, payload).subscribe({
      next: () => {
        this.router.navigate(['/admin/category']);
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message },
        });
      },
    });
  }

  /**
   * Handle click for cancel button
   */
  public handleCancel() {
    this.router.navigate(['/admin/category']);
  }
}
