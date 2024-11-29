import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CateogryComponent } from './cateogry.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CateogryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'',component:CateogryComponent}])
  ]
})
export class CateogryModule { }
