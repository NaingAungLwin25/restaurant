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
  productForm: FormGroup;
  readonly dialog = inject(MatDialog);
  productId: string = '';
  isEdit: boolean = false;
  title: string = '';

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

  categoryList = [] as any;

  getcategory() {
    this.apiService.getItems('category').subscribe({
      next: (data) => {
        this.categoryList = data;
        console.log('Items fetched:', data);
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message },
        });
      },
    });
  }

  ngOnInit() {
    this.getcategory();
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.productId);
    if (this.productId) {
      this.isEdit = true;
      this.fetchproduct(this.productId);
    }
  }

  fetchproduct(id: string) {
    this.apiService.getItem('products', id).subscribe({
      next: (data) => {
        this.productForm.patchValue(data);
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message },
        });
      },
    });
  }

  handleSubmit() {
    if (this.productForm.invalid) return;
    const payload = { ...this.productForm.getRawValue(), id: uuidv4() };
    const path = 'products';
    if (this.isEdit) {
      this.updateproduct(this.productId, path, payload);
      return;
    }
    this.createproduct(path, payload);
  }

  updateproduct(id: string, path: string, payload: any) {
    this.apiService.updateItem(path, id, payload).subscribe({
      next: (data) => {
        this.router.navigate(['/admin/products']);
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message },
        });
      },
    });
  }

  createproduct(path: string, payload: any) {
    console.log(payload, 'payload');
    this.apiService.createItem(path, payload).subscribe({
      next: (data) => {
        this.router.navigate(['/admin/products']);
      },
      error: (error) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message },
        });
      },
    });
  }

  handleCancel() {
    this.router.navigate(['/admin/products']);
  }
}
