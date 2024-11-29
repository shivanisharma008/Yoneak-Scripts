import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCateogryComponent } from './sub-cateogry.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SubCateogryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'',component:SubCateogryComponent}])
  ]
})
export class SubCateogryModule { }
