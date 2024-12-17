import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserServiceService } from '../../api/api-services/user-service.service';
import { ProfileDetailsRequestModel } from '../../api/api-modules/profile-details-request.model';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userId: any;
  userDetails: any;

  constructor(
    public dialogRef: MatDialogRef<ProfileComponent>,
    private userService: UserServiceService,
    private dialog: MatDialog
    // @Inject(MAT_DIALOG_DATA) public data: any, 
  ) {
  }

  ngOnInit() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails') ?? '{}');
    this.userId = userDetails?._id
    console.log(this.userId);


    this.getProfileDetails()
  }


  getProfileDetails() {
    const profileDetailsRequestModel: ProfileDetailsRequestModel = {
      userId: this.userId ?? '',
    }
    this.userService.profileDetails(profileDetailsRequestModel).subscribe({
      next: (res: any) => {
        console.log(res);

        this.userDetails = res.data
      }
    })
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '500px',
      height:'400px',
      data: this.userDetails // Pass userDetails to the dialog
    });

    dialogRef.afterClosed().subscribe((updatedData) => {
      if (updatedData) {
        this.userDetails = updatedData; // Update userDetails after editing
      }
    });
  }
}
