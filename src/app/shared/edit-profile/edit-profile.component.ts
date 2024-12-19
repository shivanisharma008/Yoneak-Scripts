import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserServiceService } from '../../api/api-services/user-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UpdateUserProfileRequestModel } from '../../api/api-modules/update-profile.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
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

    }
  }

  updateUserProfile() {
    const updateUserProfileRequestModel: UpdateUserProfileRequestModel = {
      userId: this.data._id,
      username: this.editProfileForm.controls.name.value ?? '',
      email: this.editProfileForm.controls.email.value ?? '',
      phoneNo: this.editProfileForm.controls.phone.value ?? '',
      role: this.data.role,
    }
    this.userService.updateUserProfile(updateUserProfileRequestModel).subscribe({
      next: (res) => {
        console.log(res);
        this._snackBar.open(res.message, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        if(res.status === 200) {
          this.dialogRef.close();
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


  onCancel(): void {
    this.dialogRef.close();
  }
}
