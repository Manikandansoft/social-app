import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { PrimeModule } from 'src/app/shared/primeng-module';
import { MessageService } from 'src/app/service/message-service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }
  const mockRouter = new MockRouter();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SharedModuleModule,
        PrimeModule
      ],
      declarations: [ HomeComponent],
      providers: [Service, { provide: ActivatedRoute, useValue: mockRouter },
       UrlConfig, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
