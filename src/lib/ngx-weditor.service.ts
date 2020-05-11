import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class NgxWeditorService {
  private ppatchedValue = null
  private pselection = null
  private pselectedText = null
  private pinnerHTML = new Subject<any>()
  private pinnerText = new Subject<any>()

  public disabledToolbar: false

  constructor() {}

  get innerHTML(): any {
    return this.pinnerHTML.asObservable()
  }

  set innerHTML(html) {
    this.pinnerHTML.next(html)
  }

  get innerText(): any {
    return this.pinnerText.asObservable()
  }

  set innerText(text) {
    this.pinnerText.next(text)
  }

  get selection(): any {
    return this.pselection
  }

  set selection(selection) {
    this.pselection = selection
  }

  get patchedValue(): any {
    return this.ppatchedValue
  }

  set patchedValue(value) {
    this.ppatchedValue = value
  }

  get selectedText(): any {
    return this.pselectedText
  }

  set selectedText(selectedText) {
    this.pselectedText = selectedText
  }

  execute(command: string, value: any = ''): void {
    document.execCommand(command, false, value)
  }

  blockToolbar({ state }) {
    this.disabledToolbar = state
  }
}
