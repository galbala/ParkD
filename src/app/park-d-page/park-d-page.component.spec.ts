import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkDpageComponent } from './park-dpage.component';

describe('ParkDpageComponent', () => {
  let component: ParkDpageComponent;
  let fixture: ComponentFixture<ParkDpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkDpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkDpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
