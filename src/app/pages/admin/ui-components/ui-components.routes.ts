import { Routes } from '@angular/router';

// ui
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { ProductComponent } from './product/product-list/product.component';
import { ProductFormComponent } from './product/product-form/product-form.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            component: UserListComponent,
          },
          {
            path: 'create',
            component: UserFormComponent,
          },
          {
            path: ':id',
            component: UserFormComponent,
          },
        ],
      },
      {
        path: 'category',
        children: [
          {
            path: '',
            component: CategoryListComponent,
          },
          {
            path: 'create',
            component: CategoryFormComponent,
          },
          {
            path: ':id',
            component: CategoryFormComponent,
          },
        ],
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            component: ProductComponent,
          },
          {
            path: 'create',
            component: ProductFormComponent,
          },
          {
            path: ':id',
            component: ProductFormComponent,
          },
        ],
      },
    ],
  },
];
