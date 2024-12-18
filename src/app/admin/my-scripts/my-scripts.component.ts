import { Component } from '@angular/core';
import { BlogsService } from '../../api/api-services/blogs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-scripts',
  templateUrl: './my-scripts.component.html',
  styleUrl: './my-scripts.component.scss'
})
export class MyScriptsComponent {
  blogsList: any;
  userId: any;
  isLoading!: boolean;

  constructor(
    private blogsService: BlogsService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    const userDetails = JSON.parse(localStorage.getItem('userDetails') ?? '{}');
    this.userId = userDetails?._id ?? null; // Set user role, e.g., 1 or 2
    this.getBlogsList()
  }

  stripHtmlTags(html: string): string {
    return html ? html.replace(/<[^>]*>/g, '') : '';
  }

  getBlogsList() {
    this.isLoading = true;
    this.blogsService.blogsList('', '', this.userId, null).subscribe({
      next: (res: any) => {
        // this.blogsList = res.data
        this.blogsList = res.data.map((blog: any) => ({
          ...blog,
          plainContent: this.stripHtmlTags(blog.content) // Add plain content
        }));
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

  edit(blogsList: any) {
    console.log(blogsList);

    this._router.navigate(['admin/add-scripts'], {
      state: { blogDetails: blogsList }
    });
  }

  route(blogId: string) {
    this._router.navigate(['admin/user-uploaded-links'], { queryParams: { blogId: blogId } });
  }

}
