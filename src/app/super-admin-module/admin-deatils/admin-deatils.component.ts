import { Component } from '@angular/core';
import { UserServiceService } from '../../api/api-services/user-service.service';
import { Router } from '@angular/router';
// import { AddBlogModel } from '../../../../build/dotnetapi';

@Component({
  selector: 'app-admin-deatils',
  templateUrl: './admin-deatils.component.html',
  styleUrl: './admin-deatils.component.scss'
})
export class AdminDeatilsComponent {
  adminList: any;
  isLoading!: boolean;
  constructor(
    private userService: UserServiceService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.getAdminList()
  }

  getAdminList() {
    this.isLoading = true;
    this.userService.adminList().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.adminList = res.data
        console.log('admin' + res.data);
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
