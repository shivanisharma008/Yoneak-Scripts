import { trigger, transition, style, animate, state } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostBinding, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';

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
  blogs = [
    {
      id: 1,
      image: 'assets/blog1.jpg',
      title: 'The Olivier da Costa restaurant experience in Lisbon',
      author: 'Zhon Smith',
      category: 'Travel, Design, Nature',
      description: ' When it comes to creating is a website for your busin an attractive design will only get you far. With people increasingly using their tablets and smartphones and shop online,...'
    },
    {
      id: 2,
      image: 'assets/blog2.jpg',
      title: 'Exploring the wild landscapes of Patagonia',
      author: 'Jane Doe',
      category: 'Travel, Adventure',
      description: 'Patagonia is a region filled with breathtaking landscapes and rich culture that every traveler dreams of...'
    },
    {
      id: 3,
      image: 'assets/blog3.jpg',
      title: 'Top 5 tips for designing a modern website',
      author: 'John Doe',
      category: 'Design, Technology',
      description: 'Web design is a key factor in building a successful online presence. Here are 5 tips to stay ahead...'
    }
  ];

  currentIndex = 0;
  currentBlog = this.blogs[this.currentIndex];

  ngOnInit(): void {}

  // Navigate to the previous blog
  prevBlog(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.blogs.length) % this.blogs.length;
    this.currentBlog = this.blogs[this.currentIndex];
  }

  // Navigate to the next blog
  nextBlog(): void {
    this.currentIndex = (this.currentIndex + 1) % this.blogs.length;
    this.currentBlog = this.blogs[this.currentIndex];
  }
  blogCards = [
    {
      image: 'assests/images/blog_card_img2.jpg',
      title: 'Title',
      date: '12-Dec-2024',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aliquam inventor offici nihil alias quae soluta explicabo '
    },
    {
      image: 'assests/images/blog_card_img2.jpg',
      title: 'Title',
      date: '12-Dec-2024',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aliquam inventor offici nihil alias quae soluta explicabo?'
    },
    {
      image: 'assests/images/blog_card_img2.jpg',
      title: 'Title',
      date: '12-Dec-2024',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aliquam inventor offici nihil alias quae soluta explicabo?'
    },
    {
      image: 'assests/images/blog_card_img2.jpg',
      title: 'Title',
      date: '12-Dec-2024',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aliquam inventor offici nihil alias quae soluta explicabo?'
    },
    {
      image: 'assests/images/blog_card_img2.jpg',
      title: 'Title',
      date: '12-Dec-2024',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aliquam inventor offici nihil alias quae soluta explicabo?'
    },
    {
      image: 'assests/images/blog_card_img2.jpg',
      title: 'Title',
      date: '12-Dec-2024',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aliquam inventor offici nihil alias quae soluta explicabo?'
    },
  ]

  category = [
    {
      img: 'assests/images/blog_cat1.jpg',
      name:'Business'
    },
    {
      img: 'assests/images/blog_cat1.jpg',
      name:'Fashion'
    },
    {
      img: 'assests/images/blog_cat1.jpg',
      name:'Artist'
    },
    {
      img: 'assests/images/blog_cat1.jpg',
      name:'Media'
    },
  ]

  popularCard = [
    {
      img:'assests/images/popular_img1.jpg',
      title:'Best Wordpress Theme of 2018',
      date:'12-Nov-2024'
    },
    {
      img:'assests/images/popular_img1.jpg',
      title:'Best Wordpress Theme of 2018',
      date:'12-Nov-2024'
    },
    {
      img:'assests/images/popular_img1.jpg',
      title:'Best Wordpress Theme of 2018',
      date:'12-Nov-2024'
    },
    {
      img:'assests/images/popular_img1.jpg',
      title:'Best Wordpress Theme of 2018',
      date:'12-Nov-2024'
    },
    {
      img:'assests/images/popular_img1.jpg',
      title:'Best Wordpress Theme of 2018',
      date:'12-Nov-2024'
    },
  ]

  

  constructor(private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: object) { }

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
}
