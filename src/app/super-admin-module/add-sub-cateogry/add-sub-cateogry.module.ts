import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSubCateogryComponent } from './add-sub-cateogry.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddSubCateogryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'',component:AddSubCateogryComponent}]),
    ReactiveFormsModule
  ]
})
export class AddSubCateogryModule { }
