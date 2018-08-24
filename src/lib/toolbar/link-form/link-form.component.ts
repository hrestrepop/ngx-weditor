import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EditorService } from '../../shared/services/editor/editor.service';
import { UtilsService } from '../../shared/services/utils/utils.service';

@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.scss']
})
export class LinkFormComponent implements OnInit {
  @Input() popoverRef: any;
  @Output() save: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  hasSelectedText = false;
  selectionData: any = {};

  constructor(
    private fb: FormBuilder,
    public utils: UtilsService,
    public editor: EditorService
  ) { }

  ngOnInit() {
    this.hasSelectedText = !!this.editor.selectedText;
    this.buildForm();

    this.selectionData = this.editor.selection ?
      this.editor.selection.endContainer.parentNode : {};

    if (this.hasSelectedText) {

      const formData = this.selectionData.localName === 'a' ?  {
        link: this.selectionData.href,
        target: this.getTarget(this.selectionData.target),
        text: this.selectionData.text
      } : {
        text: this.editor.selectedText
      };

      this.form.patchValue({ ...formData });
    }
  }

  handleSubmit() {
    const { text, link, target } = this.form.value;
    const { valid } = this.form;
    const targetValue = target ? '_blank' : '_self';
    const textValue = !!text ? text : this.hasSelectedText ? this.editor.selectedText : link;

    if (valid) {
      this.utils.restoreSelection(this.editor.selection);
      this.save.emit({ key: 'insertHTML', value: `<a href="${link}" target="${targetValue}">${textValue}</a>` });
      this.popoverRef.hide();
    } else {
      // this.feedback.error = `All fields are required!`;
    }
  }


  resetForm() {
    if (this.form) {
      this.form.reset();
      this.buildForm();
    }
  }

  private onError(err) {
    console.log('error ', err);
  }

  private onDone() {
    this.resetForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      text: [ '' ],
      link: [ 'http://', Validators.required ],
      target: [ false ]
    });
  }

  private getTarget(target) {
    return target === '_self' ? false : true;
  }

}
