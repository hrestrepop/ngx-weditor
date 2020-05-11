import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() {}

  getSelection(): any {
    if (window.getSelection) {
      const sel = window.getSelection()
      if (sel.getRangeAt && sel.rangeCount) {
        return sel.getRangeAt(0)
      }
    } else if (document.getSelection && document.createRange) {
      return document.createRange()
    }

    return null
  }

  getSelectedText() {
    return window.getSelection().toString()
  }

  restoreSelection(range): boolean {
    if (range) {
      if (window.getSelection) {
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
        return true
      } else if (document.getSelection && range.select) {
        range.select()
        return true
      }
    } else {
      return false
    }
  }
}
