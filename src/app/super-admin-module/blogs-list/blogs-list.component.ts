import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogsService } from '../../api/api-services/blogs.service';
import { ApproveBlogsRequestModel } from '../../api/api-modules/approve-blogs.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { debounceTime } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
declare var bootstrap: any


@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrl: './blogs-list.component.scss'
})
export class BlogsListComponent {
  blogsList: any
  isLoading!: boolean;
  search = new FormControl(null, Validators.required);
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  Math = Math;

  constructor(
    private blogsService: BlogsService,
    private _snackbar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getBlogsListPagination();

    this.search.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.getBlogsListPagination();
    })
  }

  ngAfterViewInit(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
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

  // getBlogsListPagination(categoryId: any, blogId: any, createdBy: any, isApproved: boolean | null, pageIndex: number | null, pageSize: number | null, searchString: string | null = this.search) {
  //   this.isLoading = true;
  //   this.blogsService.blogsListPagination(categoryId, blogId, createdBy, isApproved, pageIndex, pageSize, searchString).subscribe({
  //     next: (res: any) => {
  //       this.blogsList = res.data
  //       this.totalItems = res.count
  //       console.log(res);
  //       console.log(this.blogsList);
  //     },
  //     error: (err: any) => {
  //       console.error('Error fetching admin list:', err);
  //     },
  //     complete: () => {
  //       this.isLoading = false;
  //     }
  //   })
  // }

  getBlogsListPagination(categoryId: any = null, blogId: any = null, createdBy: any = null, isApproved: boolean | null = null, pageIndex: number | null = this.currentPage, pageSize: number | null = this.pageSize, searchString: string | null = this.search.value) {
    this.isLoading = true;
    this.blogsService.blogsListPagination(categoryId, blogId, createdBy, isApproved, pageIndex, pageSize, searchString).subscribe({
      next: (res: any) => {
        this.blogsList = res.data;
        this.totalItems = res.count;
        console.log(res);
        console.log(this.blogsList);
      },
      error: (err: any) => {
        console.error('Error fetching admin list:', err); // Handle error
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number): void {
    const maxPage = Math.ceil(this.totalItems / this.pageSize) - 1;
    if (page < 0 || page > maxPage) {
      return;
    }
    this.currentPage = page;
    this.getBlogsListPagination();
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
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
    });

  }

  approveBlog(blog: any, isApprove: boolean): void {
    const previousState = blog.approved; // Store the previous state
    blog.approved = isApprove; // Optimistically set the new state

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${isApprove ? 'approve' : 'disapprove'} this blog?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: isApprove ? 'Yes, Approve' : 'Yes, Disapprove',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const approveBlogsRequestModel: ApproveBlogsRequestModel = {
          blogId: blog._id,
          isApproved: isApprove
        };

        this.blogsService.approveBlogs(approveBlogsRequestModel).subscribe({
          next: (res: any) => {
            if (res.status === 200) {
              this._snackbar.open(res.message, 'Close', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'center'
              });

              this.getBlogsList('', '', '', null);
            } else {
              // Revert state on API failure
              blog.approved = previousState;
            }
          },
          error: (err: HttpErrorResponse) => {
            this._snackbar.open(err.statusText, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
            // Revert state on error
            blog.approved = previousState;
          }
        });
      } else {
        // Revert state if the user cancels the action
        blog.approved = previousState;
      }
    });
  }


}
