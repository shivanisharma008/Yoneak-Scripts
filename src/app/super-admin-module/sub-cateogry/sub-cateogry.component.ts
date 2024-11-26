import { Component } from '@angular/core';

@Component({
  selector: 'app-sub-cateogry',
  templateUrl: './sub-cateogry.component.html',
  styleUrl: './sub-cateogry.component.scss'
})
export class SubCateogryComponent {
  categories = [
    { id: 1, name: 'Technology',subCategory:['AI'], description: 'All tech-related categories' },
    { id: 2, name: 'Health',subCategory:['AI'],  description: 'Health and wellness categories' },
    { id: 3, name: 'Education',subCategory:['AI'],  description: 'Educational topics and resources' }
  ];

  // Open Create Category Modal
  openCreateCategoryModal() {
    console.log('Opening Create Category Modal');
    // Logic to open modal goes here
  }

  
}
