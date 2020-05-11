import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { NgxWeditorComponent } from './ngx-weditor.component'

describe('NgxWeditorComponent', () => {
  let component: NgxWeditorComponent
  let fixture: ComponentFixture<NgxWeditorComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxWeditorComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxWeditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
