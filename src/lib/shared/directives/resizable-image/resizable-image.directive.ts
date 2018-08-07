import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appResizableImage]'
})
export class ResizableImageDirective {
  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  public image: any;

  constructor(
    private el: ElementRef
  ) {
    this.image = this.el.nativeElement;
  }

  @HostListener('mousedown') onMouseDown() {
    this.update.emit(this.image);
  }

}
