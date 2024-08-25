import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      if ([401, 403].includes(err.status)) {
        const authService = inject(AuthenticationService);
        authService.logout();
      }

      const error = err.error.message || err.statusText;
      return throwError(() => new Error(error));
    })
  );
};
