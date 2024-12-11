import { Component } from '@angular/core';
import { UserServiceService } from '../../api/api-services/user-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-user-deatils',
  templateUrl: './user-deatils.component.html',
  styleUrl: './user-deatils.component.scss'
})
export class UserDeatilsComponent {
  userList: any[] = [];
  isLoading!: boolean;

  search = new FormControl(null, Validators.required);
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  Math = Math;

  constructor(
    private userService: UserServiceService,
    private _router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getUserListPagination()

    this.search.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.getUserListPagination();
    })
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

  getUserListPagination(pageIndex = this.currentPage, pageSize = this.pageSize, searchString = this.search.value) {
    this.isLoading = true;
    this.userService.userListPagination(pageIndex, pageSize, searchString).subscribe({
      next: (res: any) => {
        this.userList = res.data
        this.totalItems = res.count;
        console.log(res);
        console.log(this.userList);
      },
      error: (err: any) => {
        console.error('Error fetching admin list:', err); // Handle error
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number): void {
    const maxPage = Math.ceil(this.totalItems / this.pageSize) - 1;
    if (page < 0 || page > maxPage) {
      return;
    }
    this.currentPage = page;
    this.getUserListPagination();
  }

  
  deleteUser(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: (res: any) => {
            this._snackBar.open(res.message, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
            if (res.status === 200) {
              this.getUserListPagination();
            }
          },
          error: (err: HttpErrorResponse) => {
            this._snackBar.open(err.statusText, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
          }
        });
      }
    });
  }
}
