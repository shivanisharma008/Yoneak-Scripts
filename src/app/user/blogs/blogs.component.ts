import { Component } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {
  blogCards = [
    {
      image: 'assests/images/blog_card_img2.jpg',
      title: 'Title',
      date: '12-Dec-2024',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aliquam inventor offici nihil alias quae soluta explicabo, laboriosam tempora quam ut repudiandae porr corporis Corrupti quisquam atque soluta maxime facere?'
    },
    {
      image: 'assests/images/blog_card_img2.jpg',
      title: 'Title',
      date: '12-Dec-2024',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aliquam inventor offici nihil alias quae soluta explicabo, laboriosam tempora quam ut repudiandae porr corporis Corrupti quisquam atque soluta maxime facere?'
    },
    {
      image: 'assests/images/blog_card_img2.jpg',
      title: 'Title',
      date: '12-Dec-2024',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aliquam inventor offici nihil alias quae soluta explicabo, laboriosam tempora quam ut repudiandae porr corporis Corrupti quisquam atque soluta maxime facere?'
    },
    {
      image: 'assests/images/blog_card_img2.jpg',
      title: 'Title',
      date: '12-Dec-2024',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aliquam inventor offici nihil alias quae soluta explicabo, laboriosam tempora quam ut repudiandae porr corporis Corrupti quisquam atque soluta maxime facere?'
    },
    {
      image: 'assests/images/blog_card_img2.jpg',
      title: 'Title',
      date: '12-Dec-2024',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aliquam inventor offici nihil alias quae soluta explicabo, laboriosam tempora quam ut repudiandae porr corporis Corrupti quisquam atque soluta maxime facere?'
    },
    {
      image: 'assests/images/blog_card_img2.jpg',
      title: 'Title',
      date: '12-Dec-2024',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aliquam inventor offici nihil alias quae soluta explicabo, laboriosam tempora quam ut repudiandae porr corporis Corrupti quisquam atque soluta maxime facere?'
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
}
