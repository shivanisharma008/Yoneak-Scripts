import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserServiceService } from '../../api/api-services/user-service.service';
import { ProfileDetailsRequestModel } from '../../api/api-modules/profile-details-request.model';


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
    private userService: UserServiceService
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
}
