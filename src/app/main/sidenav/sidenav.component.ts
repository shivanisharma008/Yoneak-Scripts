import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @Output() sidenavClose = new EventEmitter<void>(); // Event to notify parent to close sidenav
  userRole: number | null = null;

  constructor(private router: Router){}

  ngOnInit(): void {
    // Retrieve the user's role from localStorage or a service
    const userDetails = JSON.parse(localStorage.getItem('userDetails') ?? '{}');
    this.userRole = userDetails?.role ?? null; // Set user role, e.g., 1 or 2
  }
  
  closeSidenav() {
    this.sidenavClose.emit(); // Emit the close event
    console.log('Sidenav close emitted');
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
