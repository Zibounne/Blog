import { TestBed } from '@angular/core/testing';

import { UserGuardServiceService } from './user-guard-service.service';

describe('UserGuardServiceService', () => {
  
  let service: UserGuardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGuardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});