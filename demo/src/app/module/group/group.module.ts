import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { SharedModuleModule } from '../../shared/shared-module.module';
import { PrimeModule } from '../../shared/primeng-module';

@NgModule({
  declarations: [GroupComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
    PrimeModule,
    SharedModuleModule
  ]
})
export class GroupModule { }
