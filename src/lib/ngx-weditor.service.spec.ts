import { TestBed, inject } from '@angular/core/testing';

import { NgxWeditorService } from './ngx-weditor.service';

describe('NgxWeditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxWeditorService]
    });
  });

  it('should be created', inject([NgxWeditorService], (service: NgxWeditorService) => {
    expect(service).toBeTruthy();
  }));
});
