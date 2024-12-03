import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogsService } from '../../api/api-services/blogs.service';
import { ApproveBlogsRequestModel } from '../../api/api-modules/approve-blogs.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrl: './blogs-list.component.scss'
})
export class BlogsListComponent {
  blogsList: any
  isLoading!: boolean;

  constructor(
    private blogsService: BlogsService,
    private _snackbar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getBlogsList('', '', '', null)
  }


  getBlogsList(categoryId: any, blogId: any, createdBy: any, isApproved: boolean | null) {
    this.isLoading = true;
    this.blogsService.blogsList(categoryId, blogId, createdBy, isApproved).subscribe({
      next: (res: any) => {
        this.blogsList = res.data
        console.log(res);
        console.log(this.blogsList);
      },
      error: (err: any) => {
        console.error('Error fetching admin list:', err); // Handle error
      },
      complete: () => {
        this.isLoading = false; // Stop loading indicator when request completes
      }
    })
  }

  viewBlog(blogId: any) {
    console.log(blogId);
    this.router.navigate(['super-admin-module/blogs/details'], {
      queryParams: {
        blogId
      }
    })
  }

  deleteBlogs(id: any) {
    this.blogsService.deleteBlogs(id).subscribe({
      next: (res: any) => {
        this._snackbar.open(res.message, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        if (res.status === 200) {
          this.getBlogsList('', '', '', null)
        }
      }, error: (err: HttpErrorResponse) => {
        this._snackbar.open(err.statusText, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
      }
    })
  }

  // approveBlog(id: any) {

  // }

  approveBlog(blogId: any) {
    const approveBlogsRequestModel: ApproveBlogsRequestModel = {
      blogId: blogId
    }
    this.blogsService.approveBlogs(approveBlogsRequestModel).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this._snackbar.open(res.message, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });

          this.getBlogsList('', '', '', null)
        }
      }, error: (err: HttpErrorResponse) => {
        this._snackbar.open(err.statusText, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
      }
    })
  }

}
