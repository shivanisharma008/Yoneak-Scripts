import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @Output() sidenavClose = new EventEmitter<void>(); // Event to notify parent to close sidenav


  userRole: number | null = null;

  ngOnInit(): void {
    // Retrieve the user's role from localStorage or a service
    const userDetails = JSON.parse(localStorage.getItem('userDetails') ?? '{}');
    this.userRole = userDetails?.role ?? null; // Set user role, e.g., 1 or 2
  }
  
  closeSidenav() {
    this.sidenavClose.emit(); // Emit the close event
    console.log('Sidenav close emitted');
  }
}
