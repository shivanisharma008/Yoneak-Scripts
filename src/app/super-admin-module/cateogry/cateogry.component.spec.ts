import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateogryComponent } from './cateogry.component';

describe('CateogryComponent', () => {
  let component: CateogryComponent;
  let fixture: ComponentFixture<CateogryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CateogryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CateogryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
