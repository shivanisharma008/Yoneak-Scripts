import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDeatilsComponent } from './admin-deatils.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminDeatilsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'',component:AdminDeatilsComponent}])
  ]
})
export class AdminDeatilsModule { }
