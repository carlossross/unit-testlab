import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthState } from '../auth/auth-state.service';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth = inject(AuthState);
  const router = inject(Router);

  return auth.isLoggedIn() ? true : router.parseUrl('/login');
};
