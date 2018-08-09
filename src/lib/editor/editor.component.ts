import { Component, OnInit, OnDestroy, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { of } from 'rxjs';
import { throttleTime, distinctUntilChanged } from 'rxjs/operators';

import { EditorService, UtilsService } from '../shared/services';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  @Input() showCode: boolean;
  @Output() inputChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() blurChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() focusChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('editorAreaEl') editorAreaEl: ElementRef;
  @ViewChild('resizer') resizer: ElementRef;

  private changes: MutationObserver;

  innerHTML: any;
  resizableElement: any;
  blockToolbar = false;

  constructor(
    public editor: EditorService,
    public utils: UtilsService
  ) { }

  ngOnInit() {
    const editorArea = this.editorAreaEl.nativeElement;

    if (!!this.editor.patchedValue) {
      editorArea.innerHTML = this.editor.patchedValue;
      this.editor.innerHTML = editorArea.innerHTML;
      this.editor.innerText = editorArea.innerText;
    }

    this.innerHTML = editorArea.innerHTML;

    this.changes = new MutationObserver(
      (mutations: MutationRecord[]) => {
       this.editor.innerHTML = editorArea.innerHTML;
       this.editor.innerText = editorArea.innerText;
    });

    this.changes.observe(editorArea, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    });

    this.editor.innerHTML
      .subscribe(html => {
        if (!this.showCode) {
          this.innerHTML = html;
        }
      });
  }

  ngOnDestroy() {
    this.changes.disconnect();
  }

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
        this.editor.innerHTML = value;
        this.editorAreaEl.nativeElement.innerHTML = value;
        this.inputChange.emit({ innerHTML: value, innerText, value });
    });
  }

  updateResizer(element) {
    this.resizableElement = element;
    this.editor.blockToolbar({ state: true });
  }

  removeResizable() {
    this.resizableElement.remove();
    this.resizableElement = null;
  }

  private clearResizer() {
    this.resizableElement = null;
    this.editor.blockToolbar({ state: false });
  }

}
