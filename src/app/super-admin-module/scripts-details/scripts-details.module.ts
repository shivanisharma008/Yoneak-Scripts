import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptsDetailsComponent } from './scripts-details.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ScriptsDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'',component:ScriptsDetailsComponent}])
  ]
})
export class ScriptsDetailsModule { }
