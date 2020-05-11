import { Component, DebugElement } from '@angular/core'
import { TestBed, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { ResizableImageDirective } from './resizable-image.directive'

@Component({
  template: `<img appResizableImage (update)="updateResizer($event)" />`
})
class TestComponent {
  updateResizer(evt) {
    return evt
  }
}

describe('ResizableImageDirective', () => {
  let component: TestComponent
  let fixture: ComponentFixture<TestComponent>
  let imageEl: DebugElement
  let directive: ResizableImageDirective

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ResizableImageDirective]
    })

    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance
    imageEl = fixture.debugElement.query(By.css('img'))

    directive = new ResizableImageDirective(imageEl)
  })

  it('should create an instance', () => {
    expect(directive).toBeTruthy()
  })

  it('should update positions on mousedown', () => {
    spyOn(component, 'updateResizer')

    imageEl.triggerEventHandler('mousedown', null)

    fixture.detectChanges()

    expect(component.updateResizer).toHaveBeenCalled()
  })
})
