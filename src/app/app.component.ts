import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  sidenavMode: 'side' | 'over' = 'side'; // Default mode
  sidenavOpened = true; // Default opened state
  isLogin = false
  constructor(private router: Router, private breakpointObserver: BreakpointObserver) {

  }
  currentPath: any;
  isSidenav: boolean = false
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.urlAfterRedirects; // Capture the current route
        console.log('Route Changed:', this.currentPath);
        // Additional logic on route change
        if (
          this.currentPath.includes('super-admin-module') ||
          this.currentPath.includes('admin')
        ) {
          this.isSidenav = true;
          this.isLogin = false
        } else if( !this.currentPath.includes('super-admin-module') &&
        !this.currentPath.includes('admin') && this.currentPath.includes('accounts')) {
          this.isSidenav = false
          this.isLogin = true

        }else{
          this.isLogin = false
        }
      }
    });

    this.breakpointObserver
      .observe(['(max-width: 1024px)', Breakpoints.Handset]) // Adjust max width here
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          // Tablet or mobile screen (<= 1024px)
          this.sidenavMode = 'over';
          this.sidenavOpened = false;
        } else {
          // Larger screens (> 1024px)
          this.sidenavMode = 'side';
          this.sidenavOpened = true;
        }
      });
  }





}
