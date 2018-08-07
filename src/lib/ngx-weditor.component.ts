import { Component, OnInit, ViewChild, forwardRef, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { EditorService } from './shared/services';
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

  editorArea: any;
  innerHTML: string;
  innerText: string;

  showCode = false;
  disabledToolbar = false;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    public editor: EditorService
  ) { }

  ngOnInit() {
    this.editorArea = this.editorEl.editorAreaEl;

    this.innerText = this.editorEl.innerText;
    this.innerHTML = this.editorEl.innerHTML;
  }

  writeValue(value: any): void {
    this.value = value;
    this.editorEl.innerHTML = value;
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

  showInnerCode(evt): void {
    this.showCode = !this.showCode;
  }

  setToolbarState({ state }) {
    this.disabledToolbar = state;
  }

}
