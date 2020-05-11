import { Component, OnInit, Output, EventEmitter } from '@angular/core'

import { NgxWeditorService } from '../ngx-weditor.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() apply = new EventEmitter<object>()
  @Output() showCode = new EventEmitter<any>()

  showImageSettings = false

  private innerText: string

  constructor(public editor: NgxWeditorService) {}

  get disabledToolbar() {
    return this.editor.disabledToolbar
  }

  ngOnInit() {
    this.editor.innerText.subscribe((text) => (this.innerText = text))
  }

  get charactersLen(): number {
    return this.innerText ? this.innerText.length : 0
  }

  applyStyle(style: object): void {
    this.apply.emit(style)
  }

  showInnerCode() {
    this.showCode.emit()
  }
}
