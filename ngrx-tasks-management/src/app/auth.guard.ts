import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
      private router: Router,
      private authService: AuthService,
  ) {
  }

  async canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Promise<boolean> {
    if (!this.authService.isAuthenticated()) {
      console.log('[AuthGuard] navigating to /login');
      await this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
