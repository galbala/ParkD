import { TestBed, inject } from '@angular/core/testing';

import { ParkdService } from './parkd.service';

describe('ParkdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParkdService]
    });
  });

  it('should be created', inject([ParkdService], (service: ParkdService) => {
    expect(service).toBeTruthy();
  }));
});
