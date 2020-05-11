import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { NgxWeditorComponent } from './ngx-weditor.component'
import { ToolbarComponent } from './toolbar/toolbar.component'
import { EditorComponent } from './editor/editor.component'

import { NgxWeditorService } from './ngx-weditor.service'
import { UtilsService } from './shared/services/utils/utils.service'
import { LinkFormComponent } from './toolbar/link-form/link-form.component'
import { VideoFormComponent } from './toolbar/video-form/video-form.component'
import { ImageFormComponent } from './toolbar/image-form/image-form.component'
import { PopoverComponent } from './toolbar/popover/popover.component'
import { ResizableImageDirective } from './shared/directives/resizable-image/resizable-image.directive'
import { ResizerComponent } from './editor/resizer/resizer.component'

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [
    NgxWeditorComponent,
    ToolbarComponent,
    EditorComponent,
    LinkFormComponent,
    VideoFormComponent,
    ImageFormComponent,
    PopoverComponent,
    ResizableImageDirective,
    ResizerComponent
  ],
  exports: [NgxWeditorComponent],
  providers: [NgxWeditorService, UtilsService]
})
export class NgxWeditorModule {}
