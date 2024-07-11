import { TestBed } from '@angular/core/testing';

import { GuestGuardServiceService } from './guest-guard-service.service';

describe('GuestGuardServiceService', () => {
  
  let service: GuestGuardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestGuardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});