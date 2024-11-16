import { Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { OtpPageComponent } from './pages/menu/otp-page/otp-page.component';
import { CompletePageComponent } from './pages/menu/complete-page/complete-page.component';
import { FullComponent } from './layouts/dashboard/full/full.component';
import { BlankComponent } from './layouts/dashboard/blank/blank.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'menu/otp', component: OtpPageComponent },
  { path: 'menu/complete', component: CompletePageComponent },
  {
    path: 'admin',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/dashboard/ui-components/ui-components.routes').then(
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
          import('./pages/dashboard/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  { path: '**', redirectTo: '/' },
];
