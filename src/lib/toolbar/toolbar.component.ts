import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { PopoverConfig } from 'ngx-bootstrap/popover';

import { EditorService } from '../shared/services/editor/editor.service';

export function getPopoverConfig(): PopoverConfig {
  return Object.assign(new PopoverConfig(), {
    placement: 'bottom',
    container: 'body',
    outsideClick: true
  });
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [{ provide: PopoverConfig, useFactory: getPopoverConfig }]
})
export class ToolbarComponent implements OnInit {
  @Output() apply: EventEmitter<object> = new EventEmitter<object>();
  @Output() showCode: EventEmitter<boolean> = new EventEmitter<any>();
  @ViewChild('imageTemplate') imageTemplate;
  @ViewChild('linkPopover') linkPopover;
  @ViewChild('videoTemplate') videoTemplate;

  private innerText: string;

  constructor(
    public editor: EditorService
  ) { }

  get disabledToolbar() {
    return this.editor.disabledToolbar;
  }

  ngOnInit() {
    this.editor.innerText
      .subscribe(text => this.innerText = text);
  }

  get charactersLen(): number {
    return this.innerText ? this.innerText.length : 0;
  }

  applyStyle(style: object): void  {
    this.apply.emit(style);
  }

  showInnerCode() {
    this.showCode.emit();
  }

}
