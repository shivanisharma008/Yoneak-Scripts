import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCateogryComponent } from './sub-cateogry.component';

describe('SubCateogryComponent', () => {
  let component: SubCateogryComponent;
  let fixture: ComponentFixture<SubCateogryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubCateogryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCateogryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
