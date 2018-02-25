import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkSimulateComponent } from './park-simulate.component';

describe('ParkSimulateComponent', () => {
  let component: ParkSimulateComponent;
  let fixture: ComponentFixture<ParkSimulateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkSimulateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkSimulateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
