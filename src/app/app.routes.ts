import { Routes } from '@angular/router';
import { OtpPageComponent } from './pages/user/otp-page/otp-page.component';
import { CompletePageComponent } from './pages/user/complete-page/complete-page.component';
import { FullComponent } from './layouts/admin/full/full.component';
import { BlankComponent } from './layouts/admin/blank/blank.component';
import { AuthGuard } from './guard/auth.guard';
import { HeaderComponent } from './layouts/user/header/header.component';
import { MenuComponent } from './pages/user/menu/menu.component';

export const routes: Routes = [
  {
    path: 'menu',
    component: HeaderComponent,
    children: [
      { path: '', component: MenuComponent },
      { path: 'otp', component: OtpPageComponent },
      { path: 'complete', component: CompletePageComponent },
    ],
  },
  {
    path: 'admin',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/admin/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
    ],
  },
  {
    path: 'admin',
    component: BlankComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/admin/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'menu' },
];
