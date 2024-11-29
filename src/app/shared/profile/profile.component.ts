import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(
    public dialogRef: MatDialogRef<ProfileComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any, 
  ) {
  }
}
