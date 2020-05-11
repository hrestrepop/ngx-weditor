import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { ImageFormComponent } from './image-form.component'

describe('ImageFormComponent', () => {
  let component: ImageFormComponent
  let fixture: ComponentFixture<ImageFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ImageFormComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
