import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './alert/alert.component';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FooterComponent } from './footer/footer.component';
import { Service } from '../service/service';
import { AuthGuard } from '../service/auth-guard';
import { UrlConfig } from '../service/url-config';

@NgModule({
  declarations: [AlertComponent, HeaderComponent, SpinnerComponent, FooterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [Service, AuthGuard, UrlConfig],
  exports: [ FormsModule,
    ReactiveFormsModule,
    AlertComponent, HeaderComponent,
    SpinnerComponent, FooterComponent ]
})
export class SharedModuleModule { }
