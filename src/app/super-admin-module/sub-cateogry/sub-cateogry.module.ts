import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCateogryComponent } from './sub-cateogry.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SubCateogryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path:'',component:SubCateogryComponent}])
  ]
})
export class SubCateogryModule { }
