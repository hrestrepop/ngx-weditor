import { Component, OnInit, Output, ViewChild, EventEmitter, Input, ElementRef } from '@angular/core';
import { PopoverConfig } from 'ngx-bootstrap/popover';

import { UtilsService } from '../shared/services';

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
  @Input() innerText: string;
  @Input() disabledToolbar: boolean;
  @Output() apply: EventEmitter<object> = new EventEmitter<object>();
  @Output() showCode: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('imageTemplate') imageTemplate;
  @ViewChild('linkPopover') linkPopover;
  @ViewChild('videoTemplate') videoTemplate;

  constructor(
    public elementRef: ElementRef,
    public utils: UtilsService
  ) { }

  ngOnInit() {
    this.linkPopover.onShown
      .subscribe(val => {
        // console.log('shown ', val);
      });
  }

  get charactersLen(): number {
    return this.innerText ? this.innerText.length : 0;
  }

  applyStyle(style: object): void  {
    this.apply.emit(style);
  }

  showInnerCode() {
    this.showCode.emit(true);
  }

}
