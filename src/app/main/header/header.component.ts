import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter<void>();
  isDropdownVisible = false;
  userRole: number | null = null;

  constructor(private router: Router,private dialog: MatDialog) {}

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
    // Clear local storage/session storage
    localStorage.clear();
    sessionStorage.clear();
    this.userRole = null
    setTimeout(() => {
      window.location.reload();
    }, 500);

    // (Optional) Call API to invalidate the session on the server
    // this.authService.logout().subscribe(() => {
    //   this.router.navigate(['/login']);
    // });

    // Redirect to login page
    this.router.navigate(['/user/blogs']);
  }

  openProfileDialog() {
    this.dialog.open(ProfileComponent, {
      width: '600px', // Adjust width
      height: 'auto', // Auto height
      panelClass: 'custom-dialog-container', // Optional: for custom styling
    });
  }

  
}
