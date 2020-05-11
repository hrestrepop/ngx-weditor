import {
  Component,
  OnInit,
  ViewChild,
  forwardRef,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2
} from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'

import { ToolbarComponent } from './toolbar/toolbar.component'
import { EditorComponent } from './editor/editor.component'

import { NgxWeditorService } from './ngx-weditor.service'

@Component({
  selector: 'ngx-weditor',
  template: `
    <div class="ngx-weditor">
      <app-toolbar
        (apply)="applyStyle($event)"
        (showCode)="showInnerCode()"
        #toolbarEl
      >
      </app-toolbar>
      <app-editor
        [showCode]="showCode"
        (focusChange)="onEditorFocus($event)"
        (blurChange)="onEditorBlur($event)"
        (inputChange)="onEditorInput($event)"
        #editorEl
      >
      </app-editor>
    </div>
  `,
  styleUrls: ['./styles.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxWeditorComponent),
      multi: true
    }
  ]
})
export class NgxWeditorComponent implements ControlValueAccessor, OnInit {
  @Output() editorInput = new EventEmitter<any>()
  @Output() editorBlur = new EventEmitter<any>()
  @Output() editorFocus = new EventEmitter<any>()

  @ViewChild('toolbarEl') toolbarEl: ToolbarComponent
  @ViewChild('editorEl') editorEl: EditorComponent

  onChange: (params) => void
  onTouched: (params) => void

  disabled: boolean
  value: any

  innerHTML: string
  innerText: string

  showCode = false
  hideModals = true

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public editor: NgxWeditorService
  ) {}

  ngOnInit() {
    this.editor.innerHTML.subscribe((html) => {
      this.innerHTML = html
      if (html !== this.value) {
        this.editorInput.emit({ innerHTML: html })
        this.onChange(html)
      }
    })
  }

  writeValue(value: any): void {
    this.value = value
    this.editor.patchedValue = value

    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value)
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled

    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled
    )
  }

  applyStyle({ key, value }): void {
    this.editor.execute(key, value)
  }

  onEditorInput({ innerHTML, innerText }) {
    this.innerHTML = innerHTML
    this.innerText = innerText

    this.editorInput.emit({ innerHTML, innerText })

    this.onChange(this.innerHTML)
  }

  onEditorFocus(evt): void {
    this.editorFocus.emit(evt)
  }

  onEditorBlur(evt): void {
    this.editorBlur.emit(evt)
  }

  showInnerCode(): void {
    this.showCode = !this.showCode
    if (this.showCode) {
      this.editor.blockToolbar({ state: true })
    } else {
      this.editor.blockToolbar({ state: false })
    }
  }
}
