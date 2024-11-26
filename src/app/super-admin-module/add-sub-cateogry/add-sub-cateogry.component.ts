import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sub-cateogry',
  templateUrl: './add-sub-cateogry.component.html',
  styleUrl: './add-sub-cateogry.component.scss'
})
export class AddSubCateogryComponent {

  subCategoryForm = new FormGroup({
    category: new FormControl('', Validators.required),
    subCategoryName: new FormControl ('', Validators.required),
    subCategoryDescription: new FormControl ('', Validators.required)
  })


  categories = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Health' },
    { id: 3, name: 'Education' }
  ];
}
