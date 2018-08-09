import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private _patchedValue = null;
  private _selection = null;
  private _selectedText = null;
  private _innerHTML = new Subject<any>();
  private _innerText = new Subject<any>();

  public disabledToolbar: false;

  constructor() { }

  get innerHTML(): any {
    return this._innerHTML.asObservable();
  }

  get innerText(): any {
    return this._innerText.asObservable();
  }

  get selection(): any {
    return this._selection;
  }

  get patchedValue(): any {
    return this._patchedValue;
  }

  get selectedText(): any {
    return this._selectedText;
  }

  set innerHTML(html) {
    this._innerHTML.next(html);
  }

  set innerText(text) {
    this._innerText.next(text);
  }

  set selection(selection) {
    this._selection = selection;
  }

  set patchedValue(value) {
    this._patchedValue = value;
  }

  set selectedText(selectedText) {
    this._selectedText = selectedText;
  }

  execute(command: string, value: any = null): void {
    document.execCommand(command, false, value);
  }

  blockToolbar({ state }) {
    this.disabledToolbar = state;
  }

}
