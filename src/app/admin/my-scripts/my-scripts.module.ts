import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyScriptsComponent } from './my-scripts.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MyScriptsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'',component:MyScriptsComponent}])
  ]
})
export class MyScriptsModule { }
