import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter<void>();
  isDropdownVisible = false;

  constructor(private router: Router) {}

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

    // (Optional) Call API to invalidate the session on the server
    // this.authService.logout().subscribe(() => {
    //   this.router.navigate(['/login']);
    // });

    // Redirect to login page
    this.router.navigate(['accounts/sign-in']);
  }
}
