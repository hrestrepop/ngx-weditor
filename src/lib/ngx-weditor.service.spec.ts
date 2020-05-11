import { TestBed } from '@angular/core/testing'

import { NgxWeditorService } from './ngx-weditor.service'

describe('NgxWeditorService', () => {
  let service: NgxWeditorService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(NgxWeditorService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
