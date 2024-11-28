import { Component } from '@angular/core';
import { BlogsService } from '../../api/api-services/blogs.service';

@Component({
  selector: 'app-cateogry',
  templateUrl: './cateogry.component.html',
  styleUrl: './cateogry.component.scss'
})
export class CateogryComponent {
  categoryList: any;
  // categories = [
  //   { id: 1, name: 'Technology', description: 'All tech-related categories' },
  //   { id: 2, name: 'Health', description: 'Health and wellness categories' },
  //   { id: 3, name: 'Education', description: 'Educational topics and resources' }
  // ];

  constructor(
    private blogsService: BlogsService,
  ) {}

  ngOnInit() {
    this.getCategoryList()
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
    // this.categories = this.categories.filter(category => category.id !== id);
  }
}
