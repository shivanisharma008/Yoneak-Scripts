import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogsService } from '../../api/api-services/blogs.service';
import { AddCategoryRequestModel } from '../../api/api-modules/add-category.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(
    private blogsService: BlogsService,
    private _snackBar: MatSnackBar,
    private _router: Router,
  ) { }

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

        if(res.status === 200) {
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
