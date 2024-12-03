import { Component } from '@angular/core';
import { BlogsService } from '../../api/api-services/blogs.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sub-cateogry',
  templateUrl: './sub-cateogry.component.html',
  styleUrl: './sub-cateogry.component.scss'
})
export class SubCateogryComponent {
  categories = [
    { id: 1, name: 'Technology', subCategory: ['AI'], description: 'All tech-related categories' },
    { id: 2, name: 'Health', subCategory: ['AI'], description: 'Health and wellness categories' },
    { id: 3, name: 'Education', subCategory: ['AI'], description: 'Educational topics and resources' }
  ];
  subCategoryList: any;
  isLoading!: boolean;


  constructor(
    private blogsService: BlogsService,
    private _router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getSubCategoryList()
  }

  getSubCategoryList() {
    this.isLoading = true;
    this.blogsService.subCategoryList('').subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.subCategoryList = res.data
        console.log('Sub-Category' + res.data);
      },
      error: (err: any) => {
        console.error('Error fetching admin list:', err); // Handle error
      },
      complete: () => {
        this.isLoading = false; // Stop loading indicator when request completes
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

  deleteSubCategory(id: any) {
    this.blogsService.deleteSubCategoryList(id).subscribe({
      next: (res: any) => {
        this._snackBar.open(res.message, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        if (res.status === 200) {
          this.getSubCategoryList()
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
