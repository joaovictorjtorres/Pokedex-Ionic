import { TestBed } from '@angular/core/testing';

import { PokefavService } from './pokefav.service';

describe('PokefavService', () => {
  let service: PokefavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokefavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
