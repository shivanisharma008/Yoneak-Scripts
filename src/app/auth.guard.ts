import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Inject Router service
  const router = inject(Router);

  // Retrieve user details from localStorage
  const userDetails = localStorage.getItem('userDetails');

  if (userDetails) {
    try {
      // Parse user details
      const parsedUserDetails = JSON.parse(userDetails);

      // Ensure parsed details contain a role
      if (parsedUserDetails && parsedUserDetails.role) {
        const requiredRole = route.data?.['role']; // Get required role from route data

        // Check if user role matches the required role
        if (requiredRole === undefined || parsedUserDetails.role === requiredRole) {
          return true; // Access granted
        } else {
          console.warn(
            `Access denied. Required role: ${requiredRole}, User role: ${parsedUserDetails.role}`
          );
          router.navigate(['/access-denied']); // Redirect to an access-denied page
          return false;
        }
      } else {
        console.error('User details do not contain a valid role.');
      }
    } catch (error) {
      console.error('Failed to parse user details:', error);
    }
  } else {
    console.warn('No user details found in localStorage.');
  }

  // Redirect to login if user details are missing or invalid
  router.navigate(['/login']);
  return false; // Access denied
};
