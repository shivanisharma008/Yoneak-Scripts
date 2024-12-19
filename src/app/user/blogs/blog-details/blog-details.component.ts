import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '../../../api/api-services/blogs.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadVideoComponent } from '../../upload-video/upload-video.component';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent {
  blogId: any;
  blogsList: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogsService: BlogsService,
    private dialog: MatDialog,
    private router: Router

  ) { }

  ngOnInit() {
    this.blogId = this.activatedRoute.snapshot.queryParams['blogId']
    console.log(this.blogId);
    
    this.getBlogsList()
  }


  getBlogsList() {
    this.blogsService.blogsList('', this.blogId, '', true).subscribe({
      next: (res: any) => {
        this.blogsList = res.data
        console.log(res);
        console.log(this.blogsList);
      }
    })
  }

  isUserLoggedIn(): boolean {
    const userDetails = localStorage.getItem('userDetails');
    return userDetails !== null;
  }

  redirectToLogin() {
    const returnUrl = this.router.url;
    this.router.navigate(['/accounts/sign-in'], { queryParams: { returnUrl } });
  }

  redirectIfNotLoggedIn(targetRoute: string) {
    if (!this.isUserLoggedIn()) {
      this.redirectToLogin();
      return;
    }
    this.router.navigate([targetRoute]);
  }

  openProfileDialog() {
    if (!this.isUserLoggedIn()) {
      this.redirectToLogin();
      return;
    }
    this.dialog.open(UploadVideoComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: { blogId: this.blogId },
    });
  }

  openVideo() {
    if (!this.isUserLoggedIn()) {
      this.redirectToLogin();
      return;
    }
    this.router.navigate(['/user/others-video'], {
      queryParams: {
        blogId: this.blogId
      }
    });
  }

}
