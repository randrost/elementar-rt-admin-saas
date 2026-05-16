import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@service/auth.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {of, switchMap} from 'rxjs';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return toObservable(authService.isAuthenticated).pipe(
    switchMap((authenticated: boolean) => {
      if (!authenticated) {
        return of(true);
      } else {
        router.navigate(['/'])
        return of(false);
      }
    })
  );
};
