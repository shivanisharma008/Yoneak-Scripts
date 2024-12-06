import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CateogryComponent } from './cateogry.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CateogryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path:'',component:CateogryComponent}])
  ]
})
export class CateogryModule { }
