import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ASpinnerComponent } from './a-spinner.component';

describe('ASpinnerComponent', () => {
  let component: ASpinnerComponent;
  let fixture: ComponentFixture<ASpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ASpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ASpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
