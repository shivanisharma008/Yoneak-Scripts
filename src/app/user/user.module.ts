import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SeeOthersVideoComponent } from './see-others-video/see-others-video.component';


@NgModule({
  declarations: [
    UserComponent,
    UploadVideoComponent,
    SeeOthersVideoComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class UserModule { }
