import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { VideoFormComponent } from './video-form.component'

describe('VideoFormComponent', () => {
  let component: VideoFormComponent
  let fixture: ComponentFixture<VideoFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [VideoFormComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
