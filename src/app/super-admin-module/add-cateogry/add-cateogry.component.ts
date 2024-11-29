import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogsService } from '../../api/api-services/blogs.service';
import { AddCategoryRequestModel } from '../../api/api-modules/add-category.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateCategoryRequestModel } from '../../api/api-modules/update-category.model';

@Component({
  selector: 'app-add-cateogry',
  templateUrl: './add-cateogry.component.html',
  styleUrl: './add-cateogry.component.scss'
})
export class AddCateogryComponent {
  categoryForm = new FormGroup({
    categoryName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })
  categoryDetails: any;
  isUpdate = false
  categoryId: any;


  constructor(
    private blogsService: BlogsService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categoryDetails = history.state.categoryDetails;
    console.log(this.categoryDetails);

    if(this.categoryDetails) {
      this.isUpdate = true
      this.categoryId = this.categoryDetails._id
      this.categoryForm.controls.categoryName.patchValue(this.categoryDetails.categoryName)
      this.categoryForm.controls.description.patchValue(this.categoryDetails.description)
    }
    

    // this.route.queryParams.subscribe((params) => {
    //   const details = params['categoryDetails'];
    //   if (details) {
    //     this.categoryDetails = JSON.parse(details);
    //   }
  
    //   console.log('Captured categoryDetails:', this.categoryDetails);
    // });
  }

  submitCategory() {
    const addCategoryRequestModel: AddCategoryRequestModel = {
      categoryName: this.categoryForm.controls.categoryName.value ?? '',
      description: this.categoryForm.controls.description.value ?? '',
    }
    this.blogsService.addCategory(addCategoryRequestModel).subscribe({
      next: (res) => {
        console.log(res);
        this._snackBar.open(res.message, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });

        if (res.status === 200) {
          this._router.navigate(['super-admin-module/category'])
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

  updateCategory() {
    const updateCategoryRequestModel: UpdateCategoryRequestModel = {
      categoryId: this.categoryId ?? '',
      categoryName: this.categoryForm.controls.categoryName.value ?? '',
      description: this.categoryForm.controls.description.value ?? ''
    }
    this.blogsService.updateCategory(updateCategoryRequestModel).subscribe({
      next: (res) => {
        this._snackBar.open(res.message, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        if (res.status === 200) {
          this._router.navigate(['super-admin-module/category'])
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
    this.categoryForm.reset()
  }
}
