import { Component } from '@angular/core';

@Component({
  selector: 'app-cateogry',
  templateUrl: './cateogry.component.html',
  styleUrl: './cateogry.component.scss'
})
export class CateogryComponent {
  categories = [
    { id: 1, name: 'Technology', description: 'All tech-related categories' },
    { id: 2, name: 'Health', description: 'Health and wellness categories' },
    { id: 3, name: 'Education', description: 'Educational topics and resources' }
  ];

  // Open Create Category Modal
  openCreateCategoryModal() {
    console.log('Opening Create Category Modal');
    // Logic to open modal goes here
  }

  // Edit Category
  editCategory(category: any) {
    console.log('Editing Category:', category);
    // Logic to edit the category goes here
  }

  // Delete Category
  deleteCategory(id: number) {
    console.log('Deleting Category with ID:', id);
    this.categories = this.categories.filter(category => category.id !== id);
  }
}
