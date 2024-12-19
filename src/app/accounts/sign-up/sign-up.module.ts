import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild([{path:'',component:SignUpComponent}]),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SignUpModule { }
