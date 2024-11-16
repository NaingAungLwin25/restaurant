import { Routes } from '@angular/router';

// ui
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';

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
        path: 'products',
        component: AppFormsComponent,
      },
      {
        path: 'category',
        component: AppTablesComponent,
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
    ],
  },
];
