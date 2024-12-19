import { Component } from '@angular/core';
import { BlogsService } from '../../api/api-services/blogs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ApproveVideoLink } from '../../api/api-modules/approve-video-link.model';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-user-upload-links',
  templateUrl: './user-upload-links.component.html',
  styleUrl: './user-upload-links.component.scss'
})
export class UserUploadLinksComponent {
  isLoading!: boolean;
  videoLinks: any;
  search = new FormControl(null, Validators.required);
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  Math = Math;
  
  uploadedLinks = [
    {
      username: 'John Doe',
      url: 'https://example.com',
      uploadedAt: new Date(),
      status: 'Pending'
    },
    {
      username: 'Jane Smith',
      url: 'https://anotherexample.com',
      uploadedAt: new Date(),
      status: 'Pending'
    }
  ];

  constructor(private blogService: BlogsService, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getBlogsListPagination()

    this.search.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.getBlogsListPagination();
    })
  }


  getVideoLink() {
    this.blogService.getCreateVideoLink('', '','', null).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.videoLinks = res.data

      }
    })
  }

  getBlogsListPagination(creatorId: any = null, creatorVideoId: any = null,  blogId: any = null, isApproved: boolean | null = null, pageIndex: number | null = this.currentPage, pageSize: number | null = this.pageSize) {
    this.isLoading = true;
    this.blogService.getCreateVideoLinkPagination(creatorId, creatorVideoId, blogId, isApproved, pageIndex, pageSize).subscribe({
      next: (res: any) => {
        this.videoLinks = res.data
        this.totalItems = res.count;
        console.log(res);
        console.log(this.videoLinks);
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

  approveLink(link: any, isApproved: boolean): void {
    const previousState = link.isApproved; // Store the previous state
    link.isApproved = isApproved; // Optimistically set the new state

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${isApproved ? 'approve' : 'disapprove'} this link?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: isApproved ? 'Yes, Approve' : 'Yes, Disapprove',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const approveVideoLink: ApproveVideoLink = {
          creatorVideoId: link,
          isApproved: isApproved
        };
        this.blogService.approveVideoLinks(approveVideoLink).subscribe({
          next: (res: any) => {
            this._snackBar.open(res.message, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
            if (res.status === 200) {
              this.getBlogsListPagination();
            } else {
              link.isApproved = previousState;
            }
          },
          error: (err: HttpErrorResponse) => {
            this._snackBar.open(err.statusText, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
            link.isApproved = previousState;
          }
        });
      } else {
        // Revert state if the user cancels the action
        link.isApproved = previousState;
      }
    });
  }
  

  deleteVideoLink(id: any) {
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
        this.blogService.deleteVideoLink(id).subscribe({
          next: (res: any) => {
            this._snackBar.open(res.message, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
            if (res.status === 200) {
              this.getBlogsListPagination();
            }
          }, error: (err: HttpErrorResponse) => {
            this._snackBar.open(err.statusText, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
          }
        })
      }
    });
  }
}


