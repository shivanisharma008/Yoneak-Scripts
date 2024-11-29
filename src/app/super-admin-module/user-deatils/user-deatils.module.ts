import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDeatilsComponent } from './user-deatils.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserDeatilsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'',component:UserDeatilsComponent}])
  ]
})
export class UserDeatilsModule { }
