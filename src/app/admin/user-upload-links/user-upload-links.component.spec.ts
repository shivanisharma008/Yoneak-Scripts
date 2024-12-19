import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUploadLinksComponent } from './user-upload-links.component';

describe('UserUploadLinksComponent', () => {
  let component: UserUploadLinksComponent;
  let fixture: ComponentFixture<UserUploadLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserUploadLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUploadLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
