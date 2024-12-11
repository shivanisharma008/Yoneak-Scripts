import { Component, Inject } from '@angular/core';
import { BlogsService } from '../../api/api-services/blogs.service';
import { CreateVideoLinkModel } from '../../api/api-modules/create-video-link.model';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrl: './upload-video.component.scss'
})
export class UploadVideoComponent {
  videoLink: string = ''; // Model for input field
  // videoLinks: string[] = []; // Array to store added video links
  userId: any;

  constructor(
    private blogService: BlogsService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UploadVideoComponent>
  ) {
    console.log(this.data.blogId);
    
  }

  ngOnInit() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails') ?? '{}');
    this.userId = userDetails?._id ?? null;
    console.log(this.userId);

  }

  addVideoLink() {
    if (this.videoLink) {
      const createVideoLinkModel: CreateVideoLinkModel = {
        embeddedYtLink: this.videoLink,
        creatorId: this.userId ?? '',
        blogId: this.data.blogId
      }
      this.blogService.createVideoLink(createVideoLinkModel).subscribe({
        next: (res) => {
          console.log(res);
          this._snackBar.open(res.message, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          if (res.status === 200) {
            this.videoLink = '';
            this.dialogRef.close();
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
  }

}
