import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserServiceService } from '../../api/api-services/user-service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  editableData: any;

  editProfileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl({ value: '', disabled: true }),
    phone: new FormControl(''),
  })

  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    private userService: UserServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // Patch the data into the form
    if (this.data) {
      console.log('Data received:', this.data);

      this.editProfileForm.patchValue({
        name: this.data.username ?? '',
        email: this.data.email ?? '',
        phone: this.data.phoneNo ?? ''
      });
      console.log('Username:', this.data.username);
      console.log('Email:', this.data.email);
      console.log('PhoneNo:', this.data.phoneNo);

    }
  }




  onCancel(): void {
    this.dialogRef.close();
  }
}
