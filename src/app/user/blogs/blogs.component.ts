import { trigger, transition, style, animate, state } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostBinding, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { BlogsService } from '../../api/api-services/blogs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UploadVideoComponent } from '../upload-video/upload-video.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateVisitedViewModel } from '../../api/api-modules/update-visited-view.model';

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
  popularBlogList: any;
  isLoading!: boolean;
  selectedCategory: string = '';
  maxDisplay = 4;
  showDropdown = false;

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
    this.getBlogsList('', '', '', true)
    this.getCategoryList()
    this.getPopularBlogs()
  }

  get displayedCategories() {
    return this.categoryList.slice(0, this.maxDisplay);
  }

  get hiddenCategories() {
    return this.categoryList.slice(this.maxDisplay);
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.showDropdown = false; // Close dropdown when a category is selected
    console.log('Selected Category:', categoryId);
    this.getBlogsList(categoryId, '', '', true);
    // Fetch blogs or perform other actions
  }



  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = './../../../../public/assests/images/blog_card_img2.jpg';
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

  isValidImage(imagePath: string): boolean {
    const validExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    const extension = imagePath.split('.').pop()?.toLowerCase();
    return validExtensions.includes(extension || '');
  }


  getBlogsList(categoryId: any, blogId: any, createdBy: any, isApproved: boolean) {
    this.isLoading = true;
    this.blogsService.blogsList(categoryId, blogId, createdBy, isApproved).subscribe({
      next: (res: any) => {
        this.blogsList = res.data
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

  getCategoryList() {
    this.blogsService.categoryList().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.categoryList = res.data
        console.log('Category' + res.data);
      }
    })
  }

  getPopularBlogs() {
    this.blogsService.popularBlogs().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.popularBlogList = res.data
        console.log(this.popularBlogList);
      }
    })
  }

  updatePopularBlogsView(blogId: any) {
    const updateVisitedViewModel: UpdateVisitedViewModel = {
      blogId: blogId
    }
    this.blogsService.popularBlogsView(updateVisitedViewModel).subscribe({
      next: (res: any) => {
        console.log(res);
        
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
