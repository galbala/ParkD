import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkStatusComponent } from './park-status.component';

describe('ParkStatusComponent', () => {
  let component: ParkStatusComponent;
  let fixture: ComponentFixture<ParkStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
