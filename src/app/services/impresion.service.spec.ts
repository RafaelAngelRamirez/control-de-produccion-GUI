import { TestBed } from '@angular/core/testing';

import { ImpresionService } from './impresion.service';

describe('ImpresionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImpresionService = TestBed.inject(ImpresionService);
    expect(service).toBeTruthy();
  });
});
