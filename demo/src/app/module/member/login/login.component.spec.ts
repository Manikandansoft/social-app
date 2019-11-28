import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // let mockRouter = {
  //   navigate: jasmine.createSpy('navigate')
  // };
  let serviceSpy = jasmine.createSpyObj('serviceSpy', ['getList', 'validUser']);

  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModuleModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        // { provide: Router, useValue: mockRouter },
        { provide: FormBuilder, useValue: formBuilder },
        { provide: Service, useValue: serviceSpy },
        UrlConfig],
        schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    serviceSpy = TestBed.get(Service);
    // mockRouter = TestBed.get(Router);
  }));



  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check form created', () => {
   // component.ngOnInit();
    // spyOn(serviceSpy, 'validUser').and.returnValue(true);

    component.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('Should check valid user while onClickSubmit', () => {
    component.submitted = true;
    const username = component.loginForm.controls.username;
    const password = component.loginForm.controls.password;
    username.setValue('test');
    password.setValue('123');
    expect(username).toBeTruthy();
    expect(password).toBeTruthy();

  });
});
