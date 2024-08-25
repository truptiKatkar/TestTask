import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);

  const user = authenticationService.userValue;
  const isLoggedIn = user?.token;

  if (isLoggedIn) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  return next(req);
};
