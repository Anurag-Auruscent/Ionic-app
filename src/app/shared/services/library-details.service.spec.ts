import { TestBed } from '@angular/core/testing';

import { LibraryDetailsService } from './library-details.service';

describe('LibraryDetailsService', () => {
  let service: LibraryDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
