import { Component } from '@angular/core';
import { BlogsService } from '../../api/api-services/blogs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApproveBlogsRequestModel } from '../../api/api-modules/approve-blogs.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-scripts-details',
  templateUrl: './scripts-details.component.html',
  styleUrl: './scripts-details.component.scss'
})
export class ScriptsDetailsComponent {
  blogsList: any;

  constructor(
    private blogsService: BlogsService,
    private _snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getBlogsList('', '', '', true)
  }

  getBlogsList(categoryId: any, blogId: any, createdBy: any, isApproved: any) {
    this.blogsService.blogsList(categoryId, blogId, createdBy, isApproved).subscribe({
      next: (res: any) => {
        this.blogsList = res.data
        console.log(res);
        console.log(this.blogsList);
      }
    })
  }

  approveBlogs(blogId: any, isApproved: boolean) {
    const approveBlogsRequestModel: ApproveBlogsRequestModel = {
      blogId: blogId,
      isApproved: isApproved
    }
    this.blogsService.approveBlogs(approveBlogsRequestModel).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this._snackbar.open(res.message, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });

          this.getBlogsList('', '', '', true)
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
