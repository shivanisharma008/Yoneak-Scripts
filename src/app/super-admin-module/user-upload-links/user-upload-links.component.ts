import { Component } from '@angular/core';
import { BlogsService } from '../../api/api-services/blogs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ApproveVideoLink } from '../../api/api-modules/approve-video-link.model';

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
    this.blogService.getCreateVideoLink('', '', false).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.videoLinks = res.data

      }
    })
  }

  approveLink(link: any): void {
    const approveVideoLink: ApproveVideoLink = {
      creatorVideoId: link
    }
    this.blogService.approveVideoLinks(approveVideoLink).subscribe({
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

  rejectLink(link: any): void {
    link.status = 'Rejected';
    alert(`Link rejected: ${link.url}`);
  }
}
