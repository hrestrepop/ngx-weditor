import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EditorService } from '../../shared/services/editor/editor.service';
import { UtilsService } from '../../shared/services/utils/utils.service';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent implements OnInit {
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

      const formData = this.selectionData.localName === 'img' ?  {
        link: this.selectionData.src,
      } : {};

      this.form.patchValue({ ...formData });
    }
  }

  handleSubmit() {
    const { link, title } = this.form.value;
    const { valid } = this.form;

    if (valid) {
      this.utils.restoreSelection(this.editor.selection);
      this.save.emit({ key: 'insertHTML', value: `<div class="image-wrapper">
          <img src="${link}" title="${title}" appResizableImage (update)="updateResizer($event)">
        </div>` });
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
      link: [ 'http://', Validators.required ],
      title: [ '' ],
    });
  }

}
