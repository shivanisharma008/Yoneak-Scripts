import { Component } from '@angular/core';
import { UserServiceService } from '../../api/api-services/user-service.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
// import { AddBlogModel } from '../../../../build/dotnetapi';

@Component({
  selector: 'app-admin-deatils',
  templateUrl: './admin-deatils.component.html',
  styleUrl: './admin-deatils.component.scss'
})
export class AdminDeatilsComponent {
  adminList: any;
  isLoading!: boolean;
  search = new FormControl(null, Validators.required);
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  Math = Math;

  constructor(
    private userService: UserServiceService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.getAdminListPagination()

    this.search.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.getAdminListPagination();
    })
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

  getAdminListPagination(pageIndex: number | null = this.currentPage, pageSize: number | null = this.pageSize, searchString: string | null = this.search.value) {
    this.isLoading = true;
    this.userService.adminListPagination(pageIndex, pageSize, searchString).subscribe({
      next: (res: any) => {
        this.adminList = res.data
        this.totalItems = res.count;
        console.log(res);
        console.log(this.adminList);
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
    this.getAdminListPagination();
  }


}
