import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter<void>();
  isDropdownVisible = false;

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
    console.log('Sidenav toggle emitted');
  }
}
