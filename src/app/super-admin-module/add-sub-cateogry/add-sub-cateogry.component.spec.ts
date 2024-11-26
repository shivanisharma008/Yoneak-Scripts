import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubCateogryComponent } from './add-sub-cateogry.component';

describe('AddSubCateogryComponent', () => {
  let component: AddSubCateogryComponent;
  let fixture: ComponentFixture<AddSubCateogryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSubCateogryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubCateogryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
