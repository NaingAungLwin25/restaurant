import { Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { OtpPageComponent } from './pages/menu/otp-page/otp-page.component';
import { CompletePageComponent } from './pages/menu/complete-page/complete-page.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'menu/otp', component: OtpPageComponent },
  { path: 'menu/complete', component: CompletePageComponent },
  { path: '**', redirectTo: '/' },
];
