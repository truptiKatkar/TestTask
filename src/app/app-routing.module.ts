import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './components/helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./components/user/user.module').then((m) => m.UserModule),
    canActivate: [authGuard],
    data: { roles: ['user'] },
  },
  {
    path: 'super-user',
    loadChildren: () =>
      import('./components/super-user/super-user.module').then(
        (m) => m.SuperUserModule
      ),
    canActivate: [authGuard],
    data: { role: ['super-user'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
