import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ACustomerSelectComponent } from './a-customer-select.component';

describe('CustomerSelectComponent', () => {
  let component: ACustomerSelectComponent;
  let fixture: ComponentFixture<ACustomerSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ACustomerSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ACustomerSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
