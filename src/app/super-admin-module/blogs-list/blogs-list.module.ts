import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsListComponent } from './blogs-list.component';
import { RouterModule } from '@angular/router';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BlogsListComponent,
    BlogDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: BlogsListComponent },
      { path: 'details', component: BlogDetailsComponent }
    ])
  ]
})
export class BlogsListModule { }
