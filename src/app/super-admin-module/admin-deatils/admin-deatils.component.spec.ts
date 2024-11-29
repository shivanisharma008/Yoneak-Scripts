import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeatilsComponent } from './admin-deatils.component';

describe('AdminDeatilsComponent', () => {
  let component: AdminDeatilsComponent;
  let fixture: ComponentFixture<AdminDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDeatilsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
