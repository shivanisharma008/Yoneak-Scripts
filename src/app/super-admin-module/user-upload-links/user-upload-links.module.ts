import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUploadLinksComponent } from './user-upload-links.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
