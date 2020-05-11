import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core'
import { Subject, Subscription, fromEvent } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit, OnDestroy {
  @ViewChild('popover') popover: ElementRef

  showSubject = new Subject<boolean>()
  showSubs = new Subscription()

  show = false
  active = false

  ngOnInit() {
    this.showSubject.asObservable().subscribe((show) => {
      this.show = show
    })

    this.showSubs = fromEvent(document, 'click')
      .pipe(distinctUntilChanged())
      .subscribe((event) => {
        const clickedInside = this.popover.nativeElement.contains(event.target)

        if (this.active && !clickedInside) {
          this.show = false
        }

        this.active = this.show
      })
  }

  ngOnDestroy() {
    this.showSubs.unsubscribe()
  }

  hide() {
    this.showSubject.next(false)
  }

  toggle() {
    this.showSubject.next(!this.show)
  }
}
