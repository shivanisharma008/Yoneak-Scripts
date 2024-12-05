import { Component } from '@angular/core';
import { BlogsService } from '../../api/api-services/blogs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ApproveVideoLink } from '../../api/api-modules/approve-video-link.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-upload-links',
  templateUrl: './user-upload-links.component.html',
  styleUrl: './user-upload-links.component.scss'
})
export class UserUploadLinksComponent {
  videoLinks: any;
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
    this.getVideoLink()
  }


  getVideoLink() {
    this.blogService.getCreateVideoLink('', '', null).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.videoLinks = res.data

      }
    })
  }

  approveLink(link: any, isApproved: boolean): void {
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
              this.getVideoLink();
            }
          },
          error: (err: HttpErrorResponse) => {
            this._snackBar.open(err.statusText, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
          }
        });
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
              this.getVideoLink()
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


