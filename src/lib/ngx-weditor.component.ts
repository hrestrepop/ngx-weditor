import { Component, OnInit, ViewChild, forwardRef, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { EditorService } from './shared/services/editor/editor.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { EditorComponent } from './editor/editor.component';

@Component({
  selector: 'app-ngx-weditor',
  templateUrl: './ngx-weditor.component.html',
  styleUrls: ['./ngx-weditor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxWeditorComponent),
      multi: true
    }
  ]
})
export class NgxWeditorComponent implements ControlValueAccessor, OnInit {
  @Output() input: EventEmitter<any> = new EventEmitter<any>();
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('toolbarEl') toolbarEl: ToolbarComponent;
  @ViewChild('editorEl') editorEl: EditorComponent;

  _onChange: Function;
  _onTouched: Function;

  disabled: boolean;
  value: any;

  innerHTML: string;
  innerText: string;

  showCode = false;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    public editor: EditorService
  ) { }

  ngOnInit() {
    this.editor.innerHTML
      .subscribe(html => {
        this.innerHTML = html;
        if (html !== this.value) {
          this.input.emit({ innerHTML: html });
          this._onChange(html);
        }
      });
  }

  writeValue(value: any): void {
    this.value = value;
    this.editor.patchedValue = value;
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  applyStyle({ key, value }): void {
    this.editor.execute(key, value);
  }

  onEditorInput({ innerHTML, innerText }) {
    this.innerHTML = innerHTML;
    this.innerText = innerText;
    this.input.emit({ innerHTML, innerText });
    this._onChange(this.innerHTML);
  }

  onEditorFocus(evt): void {
    this.focus.emit(evt);
  }

  onEditorBlur(evt): void {
    this.blur.emit(evt);
  }

  showInnerCode(): void {
    this.showCode = !this.showCode;
    if (this.showCode) {
      this.editor.blockToolbar({ state: true });
    } else {
      this.editor.blockToolbar({ state: false });
    }
  }

}
