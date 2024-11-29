import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../../../api/api-services/blogs.service';

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
  ) { }

  ngOnInit() {
    this.blogId = this.activatedRoute.snapshot.queryParams['blogId']
    console.log(this.blogId);
    
    this.getBlogsList()
  }


  getBlogsList() {
    this.blogsService.blogsList('', this.blogId, '').subscribe({
      next: (res: any) => {
        this.blogsList = res.data
        console.log(res);
        console.log(this.blogsList);
      }
    })
  }

}
