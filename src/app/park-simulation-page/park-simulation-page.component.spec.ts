import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkSimulationPageComponent } from './park-simulation-page.component';

describe('ParkSimulationPageComponent', () => {
  let component: ParkSimulationPageComponent;
  let fixture: ComponentFixture<ParkSimulationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkSimulationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkSimulationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
