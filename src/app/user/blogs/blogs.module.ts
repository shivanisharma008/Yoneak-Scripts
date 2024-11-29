import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { RouterModule } from '@angular/router';
import { BlogDetailsComponent } from './blog-details/blog-details.component';



@NgModule({
  declarations: [
    BlogsComponent,
    BlogDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'',component:BlogsComponent} , {path:'blog-details',component:BlogDetailsComponent}]),
  ]
})
export class BlogsModule { }
