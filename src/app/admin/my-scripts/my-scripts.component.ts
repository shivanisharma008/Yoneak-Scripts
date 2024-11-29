import { Component } from '@angular/core';
import { BlogsService } from '../../api/api-services/blogs.service';

@Component({
  selector: 'app-my-scripts',
  templateUrl: './my-scripts.component.html',
  styleUrl: './my-scripts.component.scss'
})
export class MyScriptsComponent {
  blogsList: any;
  userId: any;

  constructor(
    private blogsService: BlogsService,
  ) { }

  ngOnInit(): void {
    const userDetails = JSON.parse(localStorage.getItem('userDetails') ?? '{}');
    this.userId = userDetails?._id ?? null; // Set user role, e.g., 1 or 2
    this.getBlogsList()
  }

  getBlogsList() {
    this.blogsService.blogsList('', '', this.userId).subscribe({
      next: (res: any) => {
        this.blogsList = res.data
        console.log(res);
        console.log(this.blogsList);
      }
    })
  }

}
