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

  constructor(
    private userService: UserServiceService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.getUserList()
  }

  getUserList() {
    this.userService.userList().subscribe({
      next: (res: any) => {
        console.log(res);
        this.userList = res.data
      }
    })
  }
}
