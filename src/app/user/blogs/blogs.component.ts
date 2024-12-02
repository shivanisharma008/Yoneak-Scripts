import { trigger, transition, style, animate, state } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostBinding, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { BlogsService } from '../../api/api-services/blogs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UploadVideoComponent } from '../upload-video/upload-video.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
  animations: [
    trigger('fadeSlide', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('500ms ease-in')
      ]),
      transition('* => void', [
        animate('500ms ease-out', style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class BlogsComponent {
  blogsList: any

  currentIndex = 0;
  categoryList: any;
  // blogsToShow: number = 6;
  // displayedBlogs: any[] = []; // Subset of blogs to display


  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: object,
    private blogsService: BlogsService,
    private _snackbar: MatSnackBar,
    private _router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getBlogsList('', '', '')
    this.getCategoryList()
  }

  // displayBlogs(): void {
  //   this.displayedBlogs = this.blogsList.slice(0, this.blogsToShow); // Start with 6 blogs
  // }

  // // Load more blogs
  // loadMore(): void {
  //   const currentLength = this.displayedBlogs.length;
  //   const nextBlogs = this.blogsList.slice(currentLength, currentLength + this.blogsToShow);
  //   this.displayedBlogs = [...this.displayedBlogs, ...nextBlogs];
  // }

  popularCard = [
    {
      img: 'assests/images/popular_img1.jpg',
      title: 'Best Wordpress Theme of 2018',
      date: '12-Nov-2024'
    },
    {
      img: 'assests/images/popular_img1.jpg',
      title: 'Best Wordpress Theme of 2018',
      date: '12-Nov-2024'
    },
    {
      img: 'assests/images/popular_img1.jpg',
      title: 'Best Wordpress Theme of 2018',
      date: '12-Nov-2024'
    },
    {
      img: 'assests/images/popular_img1.jpg',
      title: 'Best Wordpress Theme of 2018',
      date: '12-Nov-2024'
    },
    {
      img: 'assests/images/popular_img1.jpg',
      title: 'Best Wordpress Theme of 2018',
      date: '12-Nov-2024'
    },
  ]

  


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const upper_sec = this.elementRef.nativeElement.querySelectorAll('.blog-info');
      const other = this.elementRef.nativeElement.querySelectorAll('.blogs_card');
      const heading = this.elementRef.nativeElement.querySelector('.blogs_main_content');


      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
            }
          });
        }, { threshold: 0.5 });

        upper_sec.forEach((upper_sec: Element) => {
          observer.observe(upper_sec);
        });


        other.forEach((other: Element) => {
          observer.observe(other);
        });

        observer.observe(heading);
      }
    }
  }

  setDefaultImage(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = '/assests/images/blog_cat1.jpg';
  }

  getBlogsList(categoryId: any, blogId: any, createdBy: any) {
    this.blogsService.blogsList(categoryId, blogId, createdBy).subscribe({
      next: (res: any) => {
        this.blogsList = res.data
        console.log(res);
        console.log(this.blogsList);
      }
    })
  }

  getCategoryList() {
    this.blogsService.categoryList().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.categoryList = res.data
        console.log('Category' + res.data);
      }
    })
  }


  blogsDetails(blogId: any) {
    console.log(blogId);
    this._router.navigate(['user/blogs/blog-details'], {
      queryParams: {
        blogId
      }
    })
  }
}
