import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsDetailComponent } from './attachments-detail.component';

describe('AttachmentsDetailComponent', () => {
  let component: AttachmentsDetailComponent;
  let fixture: ComponentFixture<AttachmentsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
