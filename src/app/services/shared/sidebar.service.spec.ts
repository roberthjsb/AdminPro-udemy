import { TestBed } from '@angular/core/testing';

import { SidebarService } from './shared.service';

describe('SidebarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SidebarService = TestBed.get(SidebarService);
    expect(service).toBeTruthy();
  });
});
