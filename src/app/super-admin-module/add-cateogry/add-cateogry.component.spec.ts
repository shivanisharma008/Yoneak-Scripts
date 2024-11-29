import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCateogryComponent } from './add-cateogry.component';

describe('AddCateogryComponent', () => {
  let component: AddCateogryComponent;
  let fixture: ComponentFixture<AddCateogryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCateogryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCateogryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
