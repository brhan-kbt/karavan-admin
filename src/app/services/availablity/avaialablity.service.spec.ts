import { TestBed } from '@angular/core/testing';

import { AvaialablityService } from './avaialablity.service';

describe('AvaialablityService', () => {
  let service: AvaialablityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvaialablityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
