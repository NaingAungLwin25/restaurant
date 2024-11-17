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
import { ErrorDialogComponent } from '../../../../../components/error-dialog/error-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { v4 as uuidv4 } from 'uuid';
import { Category, Product } from '../../../../../models';
import {
  ERROR_CATEGORY_IN_FETCH,
  ERROR_PRODUCT_IN_CREATE,
  ERROR_PRODUCT_IN_FETCH,
  ERROR_PRODUCT_IN_UPDATE,
} from '../../../../../constants';

@Component({
  selector: 'app-product-forms',
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
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent {
  public productForm: FormGroup;
  readonly dialog = inject(MatDialog);
  public productId: string = '';
  public isEdit: boolean = false;
  public title: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', Validators.required],
    });
  }

  public categoryList: Category[] = [];

  /**
   * Page initialization
   */
  ngOnInit() {
    this.getcategory();
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    if (this.productId) {
      this.isEdit = true;
      this.fetchproduct(this.productId);
    }
    this.title = this.isEdit ? 'Update' : 'Registration';
  }

  /**
   * Fetch categories
   */
  private getcategory() {
    this.apiService.getItems<Category>('category').subscribe({
      next: (data) => {
        this.categoryList = data;
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
   * Get products
   * @param id Product ID
   */
  private fetchproduct(id: string) {
    this.apiService.getItem('products', id).subscribe({
      next: (data) => {
        this.productForm.patchValue(data);
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
   * Save event
   */
  public handleSubmit() {
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) return;
    const payload = { ...this.productForm.getRawValue(), id: uuidv4() };
    const path = 'products';
    if (this.isEdit) {
      this.updateproduct(this.productId, path, payload);
      return;
    }
    this.createproduct(path, payload);
  }

  /**
   * Update product
   * @param id Product ID
   * @param path API path
   * @param payload Product data for update
   */
  private updateproduct(id: string, path: string, payload: Product) {
    this.apiService.updateItem<Product>(path, id, payload).subscribe({
      next: () => {
        this.router.navigate(['/admin/products']);
      },
      error: (error) => {
        console.error(error);
        this.dialog.open(ErrorDialogComponent, {
          data: { message: ERROR_PRODUCT_IN_UPDATE },
        });
      },
    });
  }

  /**
   * Register product
   * @param id Product ID
   * @param path API path
   * @param payload Product data for register
   */
  private createproduct(path: string, payload: Product) {
    this.apiService.createItem<Product>(path, payload).subscribe({
      next: () => {
        this.router.navigate(['/admin/products']);
      },
      error: (error) => {
        console.error(error);
        this.dialog.open(ErrorDialogComponent, {
          data: { message: ERROR_PRODUCT_IN_CREATE },
        });
      },
    });
  }

  /**
   * Handle click for cancel button
   */
  public handleCancel() {
    this.router.navigate(['/admin/products']);
  }
}
