import { TestBed } from '@angular/core/testing';

import { CheckTutorialService } from './check-tutorial.service';

describe('CheckTutorialService', () => {
  let service: CheckTutorialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckTutorialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
