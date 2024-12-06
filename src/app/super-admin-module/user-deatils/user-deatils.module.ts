import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDeatilsComponent } from './user-deatils.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserDeatilsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path:'',component:UserDeatilsComponent}])
  ]
})
export class UserDeatilsModule { }
