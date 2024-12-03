import { Component } from '@angular/core';
import { BlogsService } from '../../api/api-services/blogs.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cateogry',
  templateUrl: './cateogry.component.html',
  styleUrl: './cateogry.component.scss'
})
export class CateogryComponent {
  categoryList: any;
  isLoading!: boolean;
  // categories = [
  //   { id: 1, name: 'Technology', description: 'All tech-related categories' },
  //   { id: 2, name: 'Health', description: 'Health and wellness categories' },
  //   { id: 3, name: 'Education', description: 'Educational topics and resources' }
  // ];

  constructor(
    private blogsService: BlogsService,
    private _router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getCategoryList()
  }

  getCategoryList() {
    this.isLoading = true;
    this.blogsService.categoryList().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.categoryList = res.data
        console.log('Category' + res.data);
      },
      error: (err: any) => {
        console.error('Error fetching admin list:', err); // Handle error
      },
      complete: () => {
        this.isLoading = false; // Stop loading indicator when request completes
      }
    })
  }

  // Open Create Category Modal
  openCreateCategoryModal() {
    console.log('Opening Create Category Modal');
    // Logic to open modal goes here
  }

  // Edit Category
  editCategory(categoryDetails: any) {
    console.log(categoryDetails);

    this._router.navigate(['super-admin-module/add-category'], {
      state: { categoryDetails: categoryDetails }
    });
  }

  // Delete Category
  deleteCategory(id: any) {
    this.blogsService.deleteCategoryList(id).subscribe({
      next: (res: any) => {
        this._snackBar.open(res.message, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        if (res.status === 200) {
          this.getCategoryList()
        }
      }, error: (err: HttpErrorResponse) => {
        this._snackBar.open(err.statusText, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
      }
    })
  }
}
