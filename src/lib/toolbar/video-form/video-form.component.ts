import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EditorService } from '../../shared/services/editor/editor.service';
import { UtilsService } from '../../shared/services/utils/utils.service';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss']
})
export class VideoFormComponent implements OnInit {
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
  }

  handleSubmit() {
    const { link } = this.form.value;
    const { valid } = this.form;

    if (valid) {
      const isValidURL = this.verifyURL(link);

      if (isValidURL) {
        const urlObj = this.parseURL(link);
        const imageSrc = `https://img.youtube.com/vi/${urlObj.id}/0.jpg`;

        this.utils.restoreSelection(this.editor.selection);
        this.save.emit({ key: 'insertHTML', value: `<div class="image-wrapper">
            <img src="${imageSrc}" appResizableImage (update)="updateResizer($event)" data-video="${link}">
          </div>` });
        this.popoverRef.hide();
      }
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
      link: [ 'http://', Validators.required ]
    });
  }

  private verifyURL(url: string) {
    return /(youtube\.com\/watch\?v=\w+)+/.test(url);
  }

  private parseURL(url: string) {
    const splitted = url.split('v=');
    return {
      id: splitted[1]
    };
  }

}
