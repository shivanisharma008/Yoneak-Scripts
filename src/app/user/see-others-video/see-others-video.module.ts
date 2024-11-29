import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeeOthersVideoComponent } from './see-others-video.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'',component:SeeOthersVideoComponent}])
  ]
})
export class SeeOthersVideoModule { }
