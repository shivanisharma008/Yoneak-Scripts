import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsListComponent } from './blogs-list.component';
import { RouterModule } from '@angular/router';
import { BlogDetailsComponent } from './blog-details/blog-details.component';



@NgModule({
  declarations: [
    BlogsListComponent,
    BlogDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: BlogsListComponent },
      { path: 'details', component: BlogDetailsComponent }
    ])
  ]
})
export class BlogsListModule { }
