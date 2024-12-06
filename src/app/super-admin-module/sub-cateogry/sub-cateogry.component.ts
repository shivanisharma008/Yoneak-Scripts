import { Component } from '@angular/core';
import { BlogsService } from '../../api/api-services/blogs.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

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
  search = new FormControl(null, Validators.required);
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  Math = Math;


  constructor(
    private blogsService: BlogsService,
    private _router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getSubCategoryListPagination()

    this.search.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.getSubCategoryListPagination();
    })
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

  getSubCategoryListPagination(subcategoryId: any = null, categoryId: any = null, pageIndex: number | null = this.currentPage, pageSize: number | null = this.pageSize, searchString: string | null = this.search.value) {
    this.isLoading = true;
    this.blogsService.subCategoryListPagination(subcategoryId, categoryId, pageIndex, pageSize, searchString).subscribe({
      next: (res: any) => {
        this.subCategoryList = res.data
        this.totalItems = res.count;
        console.log(res);
        console.log(this.subCategoryList);
      },
      error: (err: any) => {
        console.error('Error fetching admin list:', err); // Handle error
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number): void {
    const maxPage = Math.ceil(this.totalItems / this.pageSize) - 1;
    if (page < 0 || page > maxPage) {
      return;
    }
    this.currentPage = page;
    this.getSubCategoryListPagination();
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogsService.deleteSubCategoryList(id).subscribe({
          next: (res: any) => {
            this._snackBar.open(res.message, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
            if (res.status === 200) {
              this.getSubCategoryList();
            }
          },
          error: (err: HttpErrorResponse) => {
            this._snackBar.open(err.statusText, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
          }
        });
      }
    }); // This closes the .then() block
  }

}





