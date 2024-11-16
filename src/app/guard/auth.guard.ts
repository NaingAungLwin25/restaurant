import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = this.checkAuthentication();

    if (!isAuthenticated) {
      this.router.navigate(['/admin/auth/login']);
    }

    return isAuthenticated;
  }

  private checkAuthentication(): boolean {
    return !!localStorage.getItem('loginUser');
  }
}