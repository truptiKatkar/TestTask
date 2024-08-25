import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);

  const user = authenticationService.userValue;
  if (user) {
    const requiredRoles = (route.data['roles'] as Array<string>) || [];
    console.log(requiredRoles, 'requiredRoles');
    console.log(
      requiredRoles.includes(user.role),
      'requiredRoles.includes(user.role)'
    );
    if (requiredRoles.includes(user.role)) {
      return true;
    }
    router.navigate(['/login']);
    return false;
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
