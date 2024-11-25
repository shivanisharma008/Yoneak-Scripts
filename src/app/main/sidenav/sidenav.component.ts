import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @Output() sidenavClose = new EventEmitter<void>(); // Event to notify parent to close sidenav

  closeSidenav() {
    this.sidenavClose.emit(); // Emit the close event
    console.log('Sidenav close emitted');
  }
}
