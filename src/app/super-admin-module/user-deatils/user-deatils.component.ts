import { Component } from '@angular/core';
import { UserServiceService } from '../../api/api-services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-deatils',
  templateUrl: './user-deatils.component.html',
  styleUrl: './user-deatils.component.scss'
})
export class UserDeatilsComponent {
  userList: any[] = [];
  isLoading!: boolean;

  constructor(
    private userService: UserServiceService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.getUserList()
  }

  getUserList() {
    this.isLoading = true;
    this.userService.userList().subscribe({
      next: (res: any) => {
        console.log(res);
        this.userList = res.data
      },
      error: (err: any) => {
        console.error('Error fetching admin list:', err); // Handle error
      },
      complete: () => {
        this.isLoading = false; // Stop loading indicator when request completes
      }
    })
  }
}
