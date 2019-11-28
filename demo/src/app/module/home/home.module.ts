import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModuleModule } from '../../shared/shared-module.module';
import { PrimeModule } from '../../shared/primeng-module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModuleModule,
    PrimeModule
  ]
})
export class HomeModule { }
