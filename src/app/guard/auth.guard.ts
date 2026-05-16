import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { of, switchMap } from 'rxjs';
import {AuthService} from '@service/auth.service';
import {toObservable} from '@angular/core/rxjs-interop';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return toObservable(authService.isAuthenticated).pipe(
    switchMap((authenticated: boolean) => {
      if (authenticated) {
        return of(true);
      } else {
        router.navigate(['/auth/sign-in'])
        return of(false);
      }
    })
  );
};
