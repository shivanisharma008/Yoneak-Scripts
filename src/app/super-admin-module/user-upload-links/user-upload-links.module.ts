import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUploadLinksComponent } from './user-upload-links.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserUploadLinksComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'',component:UserUploadLinksComponent}])
  ]
})
export class UserUploadLinksModule { }
