import { Component } from '@angular/core';
import { BlogsService } from '../../api/api-services/blogs.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-cateogry',
  templateUrl: './cateogry.component.html',
  styleUrl: './cateogry.component.scss'
})
export class CateogryComponent {
  categoryList: any;
  isLoading!: boolean;

  search = new FormControl(null, Validators.required);
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  Math = Math;
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
    this.getCategoryListPagination()

    this.search.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.getCategoryListPagination();
    })
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

  getCategoryListPagination(categoryId: any = null, pageIndex: number | null = this.currentPage, pageSize: number | null = this.pageSize, searchString: string | null = this.search.value) {
    this.isLoading = true;
    this.blogsService.categoryListPagination(categoryId, pageIndex, pageSize, searchString).subscribe({
      next: (res: any) => {
        this.categoryList = res.data
        this.totalItems = res.count;
        console.log(res);
        console.log(this.categoryList);
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
    this.getCategoryListPagination();
  }

  openCreateCategoryModal() {
    console.log('Opening Create Category Modal');
  }

  editCategory(categoryDetails: any) {
    console.log(categoryDetails);

    this._router.navigate(['super-admin-module/add-category'], {
      state: { categoryDetails: categoryDetails }
    });
  }

  deleteCategory(id: any) {
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
        this.blogsService.deleteCategoryList(id).subscribe({
          next: (res: any) => {
            this._snackBar.open(res.message, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
            if (res.status === 200) {
              this.getCategoryListPagination();
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
    });
  }
}
