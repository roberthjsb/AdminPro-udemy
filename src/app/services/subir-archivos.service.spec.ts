import { TestBed } from '@angular/core/testing';

import { SubirArchivosService } from './subir-archivos.service';

describe('SubirArchivosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubirArchivosService = TestBed.get(SubirArchivosService);
    expect(service).toBeTruthy();
  });
});
