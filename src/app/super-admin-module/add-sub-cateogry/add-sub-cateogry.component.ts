import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogsService } from '../../api/api-services/blogs.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AddSubCategoryRequestModel } from '../../api/api-modules/add-subCategory.model';
import { UpdateSubCategoryRequestModel } from '../../api/api-modules/update-sub-category.model';

@Component({
  selector: 'app-add-sub-cateogry',
  templateUrl: './add-sub-cateogry.component.html',
  styleUrl: './add-sub-cateogry.component.scss'
})
export class AddSubCateogryComponent {

  subCategoryForm = new FormGroup({
    category: new FormControl('', Validators.required),
    subCategoryName: new FormControl('', Validators.required),
    subCategoryDescription: new FormControl('', Validators.required)
  })
  categoryList: any;
  subCategoryDetails: any;
  isUpdate = false;
  subCategoryId: any;

  constructor(
    private blogsService: BlogsService,
    private _snackBar: MatSnackBar,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.getCategoryList()
    this.subCategoryDetails = history.state.subCategoryDetails;
    console.log(this.subCategoryDetails);

    if (this.subCategoryDetails) {
      this.isUpdate = true
      this.subCategoryId = this.subCategoryDetails._id
      this.subCategoryForm.controls.category.patchValue(this.subCategoryDetails.categoryId)
      this.subCategoryForm.controls.subCategoryName.patchValue(this.subCategoryDetails.subcategoryName)
      this.subCategoryForm.controls.subCategoryDescription.patchValue(this.subCategoryDetails.description)
    }
  }



  categories = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Health' },
    { id: 3, name: 'Education' }
  ];


  getCategoryList() {
    this.blogsService.categoryList().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.categoryList = res.data
        console.log('Category' + res.data);
      }
    })
  }



  submitSubCategory() {
    const addSubCategoryRequestModel: AddSubCategoryRequestModel = {
      categoryId: this.subCategoryForm.controls.category.value ?? '',
      subcategoryName: this.subCategoryForm.controls.subCategoryName.value ?? '',
      description: this.subCategoryForm.controls.subCategoryDescription.value ?? '',
    }
    this.blogsService.addSubCategory(addSubCategoryRequestModel).subscribe({
      next: (res) => {
        console.log(res);
        this._snackBar.open(res.message, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });

        if (res.status === 200) {
          this._router.navigate(['super-admin-module/sub-category'])
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

  updateSubCategory() {
    const updateSubCategoryRequestModel: UpdateSubCategoryRequestModel = {
      subcategoryId: this.subCategoryId ?? '',
      categoryId: this.subCategoryForm.controls.category.value ?? '',
      subcategoryName: this.subCategoryForm.controls.subCategoryName.value ?? '',
      description: this.subCategoryForm.controls.subCategoryDescription.value ?? '',
    }
    this.blogsService.updateSubCategory(updateSubCategoryRequestModel).subscribe({
      next: (res) => {
        console.log(res);
        this._snackBar.open(res.message, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });

        if (res.status === 200) {
          this._router.navigate(['super-admin-module/sub-category'])
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

  clear() {
    this.subCategoryForm.reset()
  }
}
