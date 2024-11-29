import { Component } from '@angular/core';
import { BlogsService } from '../../api/api-services/blogs.service';
import { Router } from '@angular/router';

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
  subCategoryList: any;


  constructor(
    private blogsService: BlogsService,
    private _router: Router,
  ) {}

  ngOnInit() {
    this.getSubCategoryList()
  }

  getSubCategoryList() {
    this.blogsService.subCategoryList('').subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.subCategoryList = res.data
        console.log('Sub-Category' + res.data);
      }
    })
  }

  editCategory(subCategoryDetails: any) {
    console.log(subCategoryDetails);
    
    this._router.navigate(['super-admin-module/add-sub-category'], {
      state: { subCategoryDetails: subCategoryDetails }
    });
  }

  
  // Open Create Category Modal
  openCreateCategoryModal() {
    console.log('Opening Create Category Modal');
    // Logic to open modal goes here
  }

  
}
