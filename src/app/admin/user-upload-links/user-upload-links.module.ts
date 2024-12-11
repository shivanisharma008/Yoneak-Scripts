import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUploadLinksComponent } from './user-upload-links.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserUploadLinksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path:'',component:UserUploadLinksComponent}])
  ]
})
export class UserUploadLinksModule { }
