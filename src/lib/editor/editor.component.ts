import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { of } from 'rxjs';
import { throttleTime, distinctUntilChanged } from 'rxjs/operators';

import { EditorService, UtilsService } from '../shared/services';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input() showCode: boolean;
  @Output() inputChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() blurChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() focusChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() setToolbarState: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('editorAreaEl') editorAreaEl: ElementRef;
  @ViewChild('resizer') resizer: ElementRef;

  resizableElement: any;
  blockToolbar = false;

  constructor(
    public _elementRef: ElementRef,
    public editor: EditorService,
    public utils: UtilsService
  ) { }

  get innerHTML() {
    return this.editorAreaEl.nativeElement.innerHTML;
  }

  get innerText() {
    return this.editorAreaEl.nativeElement.innerText;
  }

  set innerHTML(html) {
    this.editorAreaEl.nativeElement.innerHTML = html;
  }

  set innerText(text) {
    this.editorAreaEl.nativeElement.innerText = text;
  }

  ngOnInit() {}

  onEditorInput(evt) {
    this.inputChange.emit(evt.target);
  }

  onEditorFocus(evt): void {
    this.focusChange.emit(evt);
  }

  onEditorBlur(evt): void {
    this.editor.selection = this.utils.getSelection();
    this.editor.selectedText = this.utils.getSelectedText();
    this.blurChange.emit(evt);
  }

  onEditorClick(evt) {
    const { target } = evt;
    const { attributes } = target;

    const attrs = Object
      .keys(attributes)
      .map(key => attributes[key]);

    const isResizable = attrs
      .some(attr => /resizable/gmi.test(attr.name));

      if (!!isResizable) {
        this.updateResizer(target);
      } else {
        this.clearResizer();
      }
  }

  updateHTML({ target }) {
    of(target)
      .pipe(
        distinctUntilChanged(),
        throttleTime(1000)
      )
      .subscribe(({ value, innerText }) => {
        this.innerHTML = value;
        this.inputChange.emit({ innerHTML: value, innerText, value });
    });
  }

  updateResizer(element) {
    this.resizableElement = element;
    this.setToolbarState.emit({ state: true });
  }

  removeResizable() {
    this.resizableElement.remove();
    this.resizableElement = null;
    this.inputChange.emit({ innerHTML: this.innerHTML });
  }

  private clearResizer() {
    this.resizableElement = null;
    this.setToolbarState.emit({ state: false });
  }

}
