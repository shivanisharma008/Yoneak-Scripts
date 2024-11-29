import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeOthersVideoComponent } from './see-others-video.component';

describe('SeeOthersVideoComponent', () => {
  let component: SeeOthersVideoComponent;
  let fixture: ComponentFixture<SeeOthersVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeeOthersVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeOthersVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
