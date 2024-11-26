import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-cateogry',
  templateUrl: './add-cateogry.component.html',
  styleUrl: './add-cateogry.component.scss'
})
export class AddCateogryComponent {
  categoryForm = new  FormGroup ({
    category : new FormControl('',Validators.required),
    desc : new FormControl('',Validators.required),
  })
}
