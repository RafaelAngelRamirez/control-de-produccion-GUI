import { TestBed } from '@angular/core/testing';

import { ProgramacionTransformacionService } from './programacion-transformacion.service';

describe('ProgramacionTransformacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgramacionTransformacionService = TestBed.inject(ProgramacionTransformacionService);
    expect(service).toBeTruthy();
  });
});
