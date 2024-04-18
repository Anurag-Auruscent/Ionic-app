import { TestBed } from '@angular/core/testing';

import { PushnotifsService } from './pushnotifs.service';

describe('PushnotifsService', () => {
  let service: PushnotifsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PushnotifsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
