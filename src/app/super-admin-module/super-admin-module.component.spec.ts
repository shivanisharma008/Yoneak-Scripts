import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminModuleComponent } from './super-admin-module.component';

describe('SuperAdminModuleComponent', () => {
  let component: SuperAdminModuleComponent;
  let fixture: ComponentFixture<SuperAdminModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperAdminModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperAdminModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
