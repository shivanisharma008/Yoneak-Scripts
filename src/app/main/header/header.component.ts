import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter<void>();
  isDropdownVisible = false;
  userRole: number | null = null;

  constructor(private router: Router,private dialog: MatDialog,private location :Location,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Retrieve the user's role from localStorage or a service
    const userDetails = JSON.parse(localStorage.getItem('userDetails') ?? '{}');
    this.userRole = userDetails?.role ?? null; // Set user role, e.g., 1 or 2
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
    console.log('Sidenav toggle emitted');
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear local storage/session storage
        localStorage.clear();
        sessionStorage.clear();
        this.userRole = null;

        this.snackBar.open('You have been logged out successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        // Navigate to the desired page
        this.router.navigate(['/user/blogs']);

        // Optional: Reload the page
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    });
  }

  openProfileDialog() {
    this.dialog.open(ProfileComponent, {
      width: '600px', // Adjust width
      height: 'auto', // Auto height
      panelClass: 'custom-dialog-container', // Optional: for custom styling
    });
  }

  goBack(): void {
    console.log(this.location);
    this.location.back();
  }

  
}
