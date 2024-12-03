import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '../../../api/api-services/blogs.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
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
    this.blogId = this.activatedRoute.snapshot.queryParams['blogId'];
    console.log('Blog ID:', this.blogId);
    this.getBlogsList();
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
}
