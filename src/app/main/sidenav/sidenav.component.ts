import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @Output() sidenavClose = new EventEmitter<void>(); // Event to notify parent to close sidenav
  userRole: number | null = null;

  constructor(private router: Router,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // Retrieve the user's role from localStorage or a service
    const userDetails = JSON.parse(localStorage.getItem('userDetails') ?? '{}');
    this.userRole = userDetails?.role ?? null; // Set user role, e.g., 1 or 2
  }

  closeSidenav() {
    this.sidenavClose.emit(); // Emit the close event
    console.log('Sidenav close emitted');
  }

  // logout() {
  //   // Clear local storage/session storage
  //   localStorage.clear();
  //   sessionStorage.clear();
  //   this.userRole = null

  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 500);

  //   this.router.navigate(['/user/blogs']);
  // }
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

}
