import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { PrimeModule } from 'src/app/shared/primeng-module';
import { GroupComponent } from './group.component';
import { MessageService } from 'src/app/service/message-service';

describe('GroupComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupComponent ],
      imports: [
        HttpClientTestingModule,
        SharedModuleModule,
        PrimeModule
      ],
      providers: [Service, UrlConfig, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
