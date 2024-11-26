import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCateogryComponent } from './add-cateogry.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddCateogryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'',component:AddCateogryComponent}]),
    ReactiveFormsModule
  ]
})
export class AddCateogryModule { }
