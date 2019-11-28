import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormBuilder, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  // let mockRouter = {
  //   navigate: jasmine.createSpy('navigate')
  // };
  let serviceSpy = jasmine.createSpyObj('serviceSpy', ['getList', 'validUser']);

  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [SharedModuleModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: Service, useValue: serviceSpy },
        UrlConfig],
        schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    serviceSpy = TestBed.get(Service);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
