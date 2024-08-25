import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperUserRoutingModule } from './super-user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SuperUserComponent } from './super-user.component';

@NgModule({
  declarations: [SuperUserComponent],
  imports: [CommonModule, SuperUserRoutingModule, SharedModule],
})
export class SuperUserModule {}
