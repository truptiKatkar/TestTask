import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperUserComponent } from './super-user.component';

const routes: Routes = [
  {
    path: '',
    component: SuperUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperUserRoutingModule {}
