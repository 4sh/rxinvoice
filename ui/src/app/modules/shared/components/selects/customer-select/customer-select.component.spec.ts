import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSelectComponent } from './customer-select.component';

describe('CustomerSelectComponent', () => {
  let component: CustomerSelectComponent;
  let fixture: ComponentFixture<CustomerSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
