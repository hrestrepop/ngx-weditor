import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { LinkFormComponent } from './link-form.component'

describe('LinkFormComponent', () => {
  let component: LinkFormComponent
  let fixture: ComponentFixture<LinkFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LinkFormComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
