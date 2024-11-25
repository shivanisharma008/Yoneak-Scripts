import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptsDetailsComponent } from './scripts-details.component';

describe('ScriptsDetailsComponent', () => {
  let component: ScriptsDetailsComponent;
  let fixture: ComponentFixture<ScriptsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScriptsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScriptsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
