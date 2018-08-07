import { Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  Renderer2,
  ViewChild,
  AfterContentInit,
  SimpleChanges
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-resizer',
  templateUrl: './resizer.component.html',
  styleUrls: ['./resizer.component.scss']
})
export class ResizerComponent implements OnInit, OnChanges, AfterContentInit {
  @Input() resizableElement: any;
  @Output() removeResizable: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('overlay') overlay: any;
  @ViewChild('stylesBarPopover') stylesBarPopover: any;

  private _styles: any;

  mouseMoveEvent: Subscription;
  mouseUpEvent: Subscription;
  resizerOverlay: any;
  startPosition: any = {};

  constructor(
    private renderer: Renderer2
  ) { }

  get styles() {
    return this._styles;
  }

  set styles(styles) {
    this._styles = styles;
  }

  ngOnInit() {
    this.resizerOverlay = this.overlay.nativeElement;

    this.setStyles(this.resizableElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.firstChange) {
      this.setStyles(this.resizableElement);
    }
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.stylesBarPopover.show();
    }, 0);
  }

  // @HostListener('document:mousemove', ['$event'])
  onMouseMove(evt) {
    const { clientX, clientY, shiftKey } = evt;

    const rClientWidth = this.resizableElement.clientWidth;
    const rCLientHeight = this.resizableElement.clientHeight;
    const rClientX = this.resizableElement.x;
    const rClientY = this.resizableElement.y;

    const positionX = rClientWidth + (clientX - rClientWidth - rClientX);
    const positionY = rCLientHeight + (clientY - rCLientHeight - rClientY);

    const ratio = positionY / positionX;

    const posHeightCal = !!shiftKey
      ? (rCLientHeight / rClientWidth) * positionX : (positionX * ratio);

    const pos = {
      x: this.roundMaxVal(positionY / ratio),
      y: this.roundMaxVal(posHeightCal)
    };

    if (pos.x <= 100) {
      return this.stopResizing();
    }

    this.renderer.setStyle(this.resizableElement, 'width', `${pos.x}px`);
    this.renderer.setStyle(this.resizableElement, 'height', `${pos.y}px`);

    this.setStyles(this.resizableElement);
  }

  startResizing(evt) {
    const { target } = evt;
    const body = document.querySelector('body');

    this.mouseMoveEvent = fromEvent(body, 'mousemove')
      .subscribe(this.onMouseMove.bind(this));

    this.mouseUpEvent = fromEvent(document, 'mouseup')
      .subscribe(this.stopResizing.bind(this));
  }

  stopResizing() {
    this.mouseMoveEvent.unsubscribe();
    this.mouseUpEvent.unsubscribe();
  }

  setResizableStyle(styles) {
    Object.keys(styles)
      .map(key => ({ key, value: styles[key] }))
      .forEach(({ key, value }) => {
        this.renderer.setStyle(this.resizableElement, key, value);
    });

    this.setStyles(this.resizableElement);
  }

  trashResizable() {
    this.removeResizable.emit();
  }

  private roundMaxVal(val) {
    return Math.round(Math.max(0, val));
  }

  private setStyles(styles) {

    this.styles = !!styles ? {
      display: 'block',
      height: `${styles.height + 10}px`,
      width: `${styles.width + 10}px`,
      left: `${styles.offsetLeft + 5}px`,
      top: `${styles.offsetTop + 5}px`,
      x: styles.x, y: styles.y
    } : {
      display: 'none'
    };
  }

}
