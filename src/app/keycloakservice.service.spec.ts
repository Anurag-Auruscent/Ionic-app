import { TestBed } from '@angular/core/testing';

import { KeycloakserviceService } from './keycloakservice.service';

describe('KeycloakserviceService', () => {
  let service: KeycloakserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
