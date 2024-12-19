import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDeatilsComponent } from './admin-deatils.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminDeatilsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path:'',component:AdminDeatilsComponent}])
  ]
})
export class AdminDeatilsModule { }
