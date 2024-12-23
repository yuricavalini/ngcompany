import { TestBed } from '@angular/core/testing';

import { JwTService } from './jwt.service';

describe('JwTService', () => {
  let service: JwTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
