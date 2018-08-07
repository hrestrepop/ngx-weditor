import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private _selection = null;
  private _selectedText = null;

  constructor() { }

  get selection() {
    return this._selection;
  }

  get selectedText() {
    return this._selectedText;
  }

  set selection(selection) {
    this._selection = selection;
  }

  set selectedText(selectedText) {
    this._selectedText = selectedText;
  }

  execute(command: string, value: any = null): void {
    document.execCommand(command, false, value);
  }

}
